from django.shortcuts import render, redirect, get_object_or_404
from .models import Espaco, Reserva, Favorito
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.urls import reverse
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
def criar_reserva(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    if request.method == 'POST':
        hospede_nome = request.POST.get('hospede_nome')
        data_check_in = request.POST.get('data_check_in')
        data_check_out = request.POST.get('data_check_out')
        numero_de_hospedes = int(request.POST.get('numero_de_hospedes'))

        if datetime.strptime(data_check_in, '%Y-%m-%d') < datetime.today() or datetime.strptime(data_check_out, '%Y-%m-%d') < datetime.today():
            return HttpResponse("As datas selecionadas devem ser futuras.", status=400)

        if datetime.strptime(data_check_in, '%Y-%m-%d') >= datetime.strptime(data_check_out, '%Y-%m-%d'):
            return HttpResponse("A data de check-in deve ser anterior à data de check-out.", status=400)

        if numero_de_hospedes <= 0:
            return HttpResponse("O número de hóspedes deve ser maior que zero.", status=400)

        if espaco.numero_de_hospedes < numero_de_hospedes:
            return HttpResponse("Número de hóspedes excede a capacidade do espaço", status=400)

        reservas_conflitantes = Reserva.objects.filter(
            espaco=espaco,
            data_check_in__lte=data_check_out,
            data_check_out__gte=data_check_in
        )

        if reservas_conflitantes.exists():
            return HttpResponse("Espaço já reservado para as datas solicitadas!", status=400)

        else:
            request.session['reserva_details'] = {
                'espaco_id': espaco_id,
                'hospede_nome': hospede_nome,
                'data_check_in': data_check_in,
                'data_check_out': data_check_out,
                'numero_de_hospedes': numero_de_hospedes
            }
        
        return redirect('pagamento_reserva')
    
    else:
        espaco = get_object_or_404(Espaco, id=espaco_id)
        return render(request, 'apps/reservar_espaco.html', {'espaco': espaco})

@login_required
def pagamento_reserva(request):
    if request.method == 'POST':
        # Recupera os detalhes da reserva da sessão
        reserva_details = request.session.get('reserva_details')

        if reserva_details:
            espaco_id = reserva_details['espaco_id']
            hospede_nome = reserva_details['hospede_nome']
            data_check_in = reserva_details['data_check_in']
            data_check_out = reserva_details['data_check_out']
            numero_de_hospedes = reserva_details['numero_de_hospedes']

            numero_cartao = request.POST.get('numero_cartao')
            data_validade = request.POST.get('data_validade')
            cvv = request.POST.get('cvv')

            if numero_cartao and data_validade and cvv:
                espaco = get_object_or_404(Espaco, id=espaco_id)
                reserva = Reserva.objects.create(
                    espaco_proprietario_nome=espaco.proprietario_nome,
                    espaco_nome=espaco.nome,
                    hospede_nome=hospede_nome,
                    data_check_in=data_check_in,
                    data_check_out=data_check_out,
                    numero_de_hospedes=numero_de_hospedes,
                    espaco=espaco
                )
                # Limpa os detalhes da reserva da sessão
                del request.session['reserva_details']

                # Redireciona para a página de sucesso
                return redirect('minhas_reservas')
        else:
            # Se os detalhes da reserva não estiverem na sessão, redirecione para uma página de erro
            return HttpResponse("Detalhes da reserva não encontrados na sessão.")
    else:
        # Se a solicitação não for do tipo POST, redirecione para uma página de erro.
        return render(request, 'apps/pagamento_reserva.html')

def detalhes(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    detalhes_do_espaco = espaco.detalhes()
    return render(request, 'apps/detalhes.html', {'espaco': espaco, 'detalhes_do_espaco': detalhes_do_espaco})


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

def home(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/home.html', {'espacos': espacos})

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

def profile(request):
    return redirect('home')

#def selecionar_espaco_para_reserva(request):
    espacos = Espaco.objects.all()
    return render(request, 'selecionar_espaco_para_reserva.html', {'espacos': espacos})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

def filtrar_espacos_por_cidade(request):
    cidade_query = request.GET.get('cidade')
    espacos = Espaco.objects.filter(cidade__iexact=cidade_query) if cidade_query else None
    return render(request, 'apps/home.html', {'espacos': espacos})

def filtrar_espacos_por_data(request):
    data_query = request.GET.get('data')
    data = datetime.datetime.strptime(data_query, '%Y-%m-%d').date() if data_query else None

    if not data:
        return render(request, 'apps/home.html', {'erro': 'Data inválida'})

    espacos_disponiveis = Espaco.objects.exclude(
        reserva__data_check_in__lte=data,
        reserva__data_check_out__gte=data
    )

    return render(request, 'apps/home.html', {'espacos': espacos_disponiveis})



# def pagamento_reserva(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    
    if request.method == 'POST' or request.method == 'GET':
        usuario = request.user

        numero_cartao = request.POST.get('numero_cartao')
        data_validade = request.POST.get('data_validade')
        cvv = request.POST.get('cvv')

        if len(numero_cartao) >= 12 and '/' in data_validade and len(cvv) == 3:
            # Lógica de pagamento simulado
            messages.success(request, "Pagamento do sinal efetuado com sucesso!")
            return render(request, 'apps/pagamento_reserva.html')
        else:
            messages.error(request, "Falha no pagamento. Verifique os detalhes do seu cartão.")
            return render(request, 'apps/pagamento_reserva.html', {'espaco': espaco})
    else:
        # Se a solicitação não for do tipo POST, redirecione para uma página de erro.
        return HttpResponse("Método de requisição inválido.")

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