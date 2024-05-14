from django.shortcuts import render, redirect, get_object_or_404
from .models import Espaco, Reserva, Favorito
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.urls import reverse
import datetime
from datetime import datetime

def cadastro(request):
    if request.method == 'POST':
        username = request.POST['username']
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']
        
        if User.objects.filter(username=username).exists():
            return render(request, 'apps/cadastro.html', {"erro": "Usuário já existe"})
        elif User.objects.filter(email=email).exists():
            return render(request, 'apps/cadastro.html', {"erro": "Email já cadastrado"})

        user = User.objects.create_user(username=username, password=password, email=email, first_name=name)
        login(request, user)
        request.session["usuario"] = username
        return redirect(home)
        
    return render(request, 'apps/cadastro.html')

@login_required
def cadastrar_espaco(request):
    if request.method == 'POST':
        proprietario_nome = request.POST.get('proprietario_nome', request.user.username)
        nome = request.POST['nome']
        descricao = request.POST['descricao']
        preco_por_noite = request.POST['preco_por_noite']
        endereco = request.POST['endereco']
        cidade = request.POST['cidade']
        estado = request.POST['estado']
        pais = request.POST['pais']
        numero_de_quartos = request.POST['numero_de_quartos']
        numero_de_banheiros = request.POST['numero_de_banheiros']
        numero_de_hospedes = request.POST['numero_de_hospedes']
        foto_principal = request.FILES.get('foto_principal', None)

        novo_espaco = Espaco(
            proprietario_nome=proprietario_nome,
            nome=nome,
            descricao=descricao,
            preco_por_noite=preco_por_noite,
            endereco=endereco,
            cidade=cidade,
            estado=estado,
            pais=pais,
            numero_de_quartos=numero_de_quartos,
            numero_de_banheiros=numero_de_banheiros,
            numero_de_hospedes=numero_de_hospedes,
            foto_principal=foto_principal
        )
        novo_espaco.save()

        return redirect('detalhes', espaco_id=novo_espaco.id)
    else:
        return render(request, 'apps/cadastrar_espaco.html')

@login_required
def cancelar_reserva(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)

    if request.method == 'POST':
        usuario = request.user
        reserva = Reserva.objects.filter(hospede_nome=usuario, espaco_id=espaco_id).first()
        if not reserva:
            return render(request, 'detalhes', {'erro': 'Você não reservou esse espaço'})
        else:
            reserva.delete()
            messages.success(request, 'Reserva cancelada com sucesso.')
            return redirect('minhas_reservas')
    return redirect('detalhes', espaco_id=espaco_id)

@login_required
def criar_reserva(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    if request.method == 'POST':
        hospede_nome = request.POST.get('hospede_nome')
        data_check_in = request.POST.get('data_check_in')
        data_check_out = request.POST.get('data_check_out')
        numero_de_hospedes = int(request.POST.get('numero_de_hospedes'))

        if not data_check_in or not data_check_out:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'Por favor, preencha as datas de check-in e check-out.'})

        try:
            data_check_in = datetime.strptime(data_check_in, '%Y-%m-%d').date()
            data_check_out = datetime.strptime(data_check_out, '%Y-%m-%d').date()
        except ValueError:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'Formato de data inválido. Use o formato dd-mm-aaaa.'})

        today_date = datetime.today().date()
        if data_check_in < today_date or data_check_out < today_date:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'As datas selecionadas devem ser futuras.'})

        if data_check_in >= data_check_out:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'A data de check-in deve ser anterior à data de check-out.'})

        if numero_de_hospedes <= 0:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'O número de hóspedes deve ser maior que zero.'})

        if espaco.numero_de_hospedes < numero_de_hospedes:
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'Número de hóspedes excede a capacidade do espaço'})

        reservas_conflitantes = Reserva.objects.filter(
            espaco=espaco,
            data_check_in__lte=data_check_out,
            data_check_out__gte=data_check_in
        )

        if reservas_conflitantes.exists():
            return render(request, 'apps/reservar_espaco.html', {'espaco': espaco, 'error_message': 'Espaço já reservado para as datas solicitadas!'})

        request.session['reserva_details'] = {
            'espaco_id': espaco_id,
            'hospede_nome': hospede_nome,
            'data_check_in': data_check_in.strftime('%Y-%m-%d'),
            'data_check_out': data_check_out.strftime('%Y-%m-%d'),
            'numero_de_hospedes': numero_de_hospedes
        }
        
        return redirect('pagamento_reserva')
    
    else:
        return render(request, 'apps/reservar_espaco.html', {'espaco': espaco})

def detalhes(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    detalhes_do_espaco = espaco.detalhes()

    # Verifica se o espaço é favorito para o usuário autenticado
    if request.user.is_authenticated:
        espaco_favorito = Favorito.objects.filter(usuario=request.user, espaco=espaco).exists()
    else:
        espaco_favorito = False

    return render(request, 'apps/detalhes.html', {'espaco': espaco, 'detalhes_do_espaco': detalhes_do_espaco, 'espaco_favorito': espaco_favorito, 'proprietario_nome': espaco.proprietario_nome})

@login_required
def editar_conta(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        senha_atual = request.POST.get('senha_atual')
        nova_senha = request.POST.get('nova_senha')
        nova_senha_confirmacao = request.POST.get('nova_senha_confirmacao')

        user = request.user
        user.first_name = first_name
        user.last_name = last_name
        user.email = email

        if senha_atual and nova_senha and nova_senha_confirmacao:
            if user.check_password(senha_atual):
                if nova_senha == nova_senha_confirmacao:
                    user.set_password(nova_senha)
                    update_session_auth_hash(request, user)
                else:
                    messages.error(request, 'A nova senha e a confirmação da nova senha não coincidem.')
            else:
                messages.error(request, 'A senha atual está incorreta.')

        user.save()
        messages.success(request, 'Sua conta foi atualizada com sucesso!')
        return redirect('editar_conta')
    return render(request, 'apps/editar_conta.html')

def editar_espaco(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)

    if request.method == 'POST':
        # Obtém os dados do formulário POST
        nome = request.POST.get('nome')
        descricao = request.POST.get('descricao')
        preco_por_noite = request.POST.get('preco_por_noite')
        endereco = request.POST.get('endereco')
        cidade = request.POST.get('cidade')
        estado = request.POST.get('estado')
        pais = request.POST.get('pais')
        numero_de_quartos = request.POST.get('numero_de_quartos')
        numero_de_banheiros = request.POST.get('numero_de_banheiros')
        numero_de_hospedes = request.POST.get('numero_de_hospedes')
        foto_principal = request.FILES.get('foto_principal')

        # Atualiza os dados do espaço chamando o método atualizar_dados
        espaco.atualizar_dados(nome, descricao, preco_por_noite, endereco, cidade, estado, pais,
                            numero_de_quartos, numero_de_banheiros, numero_de_hospedes, foto_principal)

        # Redireciona para a página de detalhes do espaço
        return redirect('detalhes', espaco_id=espaco.id)
    else:
        # Renderiza o formulário de edição com os dados atuais do espaço
        return render(request, 'apps/editar_espaco.html', {'espaco': espaco})

@login_required
def excluir_conta(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        messages.success(request, 'Sua conta foi excluída com sucesso!')
        return redirect('home')
    return render(request, 'apps/excluir_conta_confirmacao.html')

def espacos_proprietario(request, proprietario_nome):
    espacos = Espaco.objects.filter(proprietario_nome=proprietario_nome)
    return render(request, 'apps/espacos_proprietario.html', {'espacos': espacos, 'proprietario_nome': proprietario_nome})

@login_required
def excluir_espaco(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    
    if request.method == "POST":
        espaco.delete()
        messages.success(request, "Espaço excluído com sucesso!")
        return redirect('meus_espacos')
    
    return render(request, 'apps/excluir_espaco_confirmacao.html', {'espaco': espaco})

@login_required
def favoritar(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    
    if request.method == 'POST' or request.method == 'GET':
        usuario = request.user
        
        favorito_existente = Favorito.objects.filter(usuario=usuario, espaco=espaco).exists()
        
        if not favorito_existente:
            Favorito.objects.create(usuario=usuario, espaco=espaco)
            messages.success(request, 'Espaço favoritado com sucesso!')
            return HttpResponseRedirect(reverse('detalhes', args=[espaco_id]))
        else:
            favorito = Favorito.objects.filter(usuario=usuario, espaco=espaco).first()
            favorito.delete()  # Remove o favorito se existir
            messages.success(request, 'Espaço removido dos favoritos.')
            return HttpResponseRedirect(reverse('detalhes', args=[espaco_id]))
        
    return HttpResponseRedirect(reverse('detalhes', args=[espaco_id]))

def filtrar_espacos_por_cidade(request):
    cidade_query = request.GET.get('cidade')
    espacos = Espaco.objects.filter(cidade__iexact=cidade_query) if cidade_query else None
    return render(request, 'apps/home.html', {'espacos': espacos})

def filtrar_espacos_por_data(request):
    checkin_date = request.GET.get('checkin_date')
    checkout_date = request.GET.get('checkout_date')

    if checkin_date and checkout_date:
        try:
            checkin_date = datetime.strptime(checkin_date, '%Y-%m-%d').date()
            checkout_date = datetime.strptime(checkout_date, '%Y-%m-%d').date()
        except ValueError:
            return render(request, 'apps/home.html', {'erro': 'Formato de data inválido'})

        if checkin_date >= checkout_date:
            return render(request, 'apps/home.html', {'erro': 'A data de check-in deve ser anterior à data de check-out.'})

        espacos_disponiveis = Espaco.objects.exclude(
            reserva__data_check_in__lte=checkout_date,
            reserva__data_check_out__gte=checkin_date
        ).distinct()
        
        return render(request, 'apps/home.html', {'espacos': espacos_disponiveis})
    else:
        return render(request, 'apps/home.html', {'erro': 'Por favor, forneça ambas as datas de check-in e check-out.'})

def home(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/home.html', {'espacos': espacos})

@login_required
def lista_favoritos(request):
    if request.user.is_authenticated:
        favoritos = Favorito.objects.filter(usuario=request.user)
        return render(request, 'apps/favoritos.html', {'favoritos': favoritos})
    else:
        return redirect('login')

def listar_espacos(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/listar_espacos.html', {'espacos': espacos})

def login_view(request):
    next_url = request.GET.get('next', '')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(next_url or 'home')
        else:
            return render(request, 'apps/login.html', {"erro": "Usuário não encontrado"})
    return render(request, 'apps/login.html', {'next': next_url})

def logout(request):
    logout(request)
    if "usuario" in request.session:
        del request.session["usuario"]
    return redirect(home)

@login_required
def meus_espacos(request):
    if request.user.is_authenticated:
        usuario = request.user
        espacos = Espaco.objects.filter(proprietario_nome=usuario)
        return render(request, 'apps/meus_espacos.html', {'espacos': espacos})
    else:
        return redirect('login')

@login_required
def minhas_reservas(request):
    if request.user.is_anonymous:
        return redirect('login')
    else:
        usuario = request.user
        reservas = Reserva.objects.filter(hospede_nome=usuario)
        return render(request, 'apps/minhas_reservas.html', {'reservas': reservas})

@login_required
def pagamento_reserva(request):
    reserva_details = request.session.get('reserva_details')
    if reserva_details:
        espaco_id = reserva_details['espaco_id']
        espaco = get_object_or_404(Espaco, id=espaco_id)
        preco_por_noite = espaco.preco_por_noite

        # Calcula a quantidade de dias entre check-in e check-out
        data_check_in = datetime.strptime(reserva_details['data_check_in'], '%Y-%m-%d')
        data_check_out = datetime.strptime(reserva_details['data_check_out'], '%Y-%m-%d')
        numero_de_dias = (data_check_out - data_check_in).days

        # Calcula o valor total a ser pago
        valor_total = preco_por_noite * numero_de_dias

        # Calcula o número máximo de parcelas permitido com base no valor total
        max_parcelas = min(18, max(1, int(valor_total / 100)))

        # Define a parcela com base no número máximo de parcelas permitido
        parcela = request.POST.get('parcela')
        if parcela in range(1, max_parcelas + 1):
            parcela_selecionada = parcela
        else:
            parcela_selecionada = 1

    if request.method == 'POST':
        if reserva_details:
            hospede_nome = reserva_details['hospede_nome']
            data_check_in = reserva_details['data_check_in']
            data_check_out = reserva_details['data_check_out']
            numero_de_hospedes = reserva_details['numero_de_hospedes']

            numero_cartao = request.POST.get('numero_cartao')
            data_validade = request.POST.get('data_validade')
            cvv = request.POST.get('cvv')
            parcela = request.POST.get('parcela')
            valor_parcelas = valor_total / parcela_selecionada

            if parcela is None:
                parcela = 1

            if numero_cartao and data_validade and cvv:
                reserva = Reserva.objects.create(
                    espaco_proprietario_nome=espaco.proprietario_nome,
                    espaco_nome=espaco.nome,
                    hospede_nome=hospede_nome,
                    data_check_in=data_check_in,
                    data_check_out=data_check_out,
                    numero_de_hospedes=numero_de_hospedes,
                    valor_total=valor_total,
                    parcela=parcela,
                    valor_parcelas=valor_parcelas,
                    espaco=espaco,
                )
                del request.session['reserva_details']
                return redirect('minhas_reservas')
        else:
            return HttpResponse("Detalhes da reserva não encontrados na sessão.")

    return render(request, 'apps/pagamento_reserva.html', {'valor_total': valor_total, 'max_parcelas': range(1, max_parcelas + 1), 'parcela_selecionada': parcela_selecionada})

def profile(request):
    return redirect('home')

"""@login_required
def avaliar_reserva(request, reserva_id):
    reserva = get_object_or_404(Reserva, id=reserva_id)

    # Verifica se a reserva pertence ao usuário autenticado
    if reserva.hospede_nome != request.user.username:
        return HttpResponse("Você não tem permissão para avaliar esta reserva.")
    
    # Verifica se a reserva está no estado correto para ser avaliada
    if reserva.status != "Reserva terminada":
        return HttpResponse("Esta reserva não está terminada.")

    if request.method == 'POST':
        avaliacao = request.POST.get('avaliacao')  # Verifique se o nome do campo no formulário HTML é 'avaliacao'
        reserva.avaliacao = avaliacao
        reserva.save()
        messages.success(request, 'Avaliação enviada com sucesso!')
        return redirect('minhas_reservas')

    return render(request, 'apps/avaliar_reserva.html', {'reserva': reserva})"""
