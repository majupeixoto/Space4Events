from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, AnonymousUser

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

# @login_required
def cadastrar_espaco(request):
    if request.method == 'POST':
        proprietario_nome = request.POST['proprietario_nome']
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

        return redirect('detalhes_espaco', espaco_id=novo_espaco.id)
    else:
        return render(request, 'apps/cadastrar_espaco.html')

def criar_reserva(request, espaco_id):
    if request.method == 'POST':
        hospede_nome = request.POST.get('hospede_nome')
        data_check_in = request.POST.get('data_check_in')
        data_check_out = request.POST.get('data_check_out')
        numero_de_hospedes = int(request.POST.get('numero_de_hospedes'))

        # Verificação - espaço existe?
        try:
            espaco = Espaco.objects.get(id=espaco_id)
        except Espaco.DoesNotExist:
            return HttpResponse("Espaço não encontrado")

        # Verificação - espaço comporta o número de pessoas?
        if espaco.numero_de_hospedes < numero_de_hospedes:
            return HttpResponse("Número de hóspedes excede a capacidade do espaço")

        # Verificação - espaço disponível e não reservado por outro usuário?
        reservas_conflitantes = Reserva.objects.filter(
            espaco_nome=espaco.nome,
            data_check_in__lte=data_check_out,
            data_check_out__gte=data_check_in
        )

        if reservas_conflitantes.exists():
            return HttpResponse("Espaço já reservado para as datas solicitadas!")

        # Criar a reserva
        reserva = Reserva(espaco_proprietario_nome=espaco.proprietario_nome, espaco_nome=espaco.nome, hospede_nome=hospede_nome, data_check_in=data_check_in, data_check_out=data_check_out, numero_de_hospedes=numero_de_hospedes)
        reserva.save()
        
        return redirect('detalhes_espaco', espaco_id=espaco_id)
    else:
        espaco = Espaco.objects.get(id=espaco_id)
        return render(request, 'apps/reservar_espaco.html', {'espaco': espaco})

def detalhes(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    detalhes_do_espaco = espaco.detalhes()
    return render(request, 'apps/detalhes.html', {'detalhes_do_espaco': detalhes_do_espaco})

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser

@login_required
def favoritar(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    
    if request.user.is_authenticated:
        favorito, created = Favorito.objects.get_or_create(usuario=request.user, espaco=espaco)
        if not created:
            favorito.delete() # Remove o favorito se existir
        return redirect('lista_favoritos')
    else:
        favoritos = Favorito.objects.filter(usuario=request.user)
        return render(request, 'apps/favoritos.html', {'favoritos': favoritos})

# @login_required
def desfavoritar(request, espaco_id):
    espaco = get_object_or_404(Espaco, id=espaco_id)
    
    if request.user.is_authenticated:
        favorito = Favorito.objects.filter(usuario=request.user, espaco=espaco).first()
        if favorito:
            favorito.delete()  # Remove o favorito se existir
        return redirect('lista_favoritos')
    else:
        # Temporário
        return render(request, 'apps/favoritos.html')

# @login_required
def lista_favoritos(request):
    if request.user.is_authenticated:
        favoritos = Favorito.objects.filter(usuario=request.user)
        return render(request, 'apps/favoritos.html', {'favoritos': favoritos})
    else:
        # Temporário
        favoritos = None
    return render(request, 'apps/favoritos.html', {'favoritos': favoritos})

# @login_required
def home(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/home.html', {'espacos': espacos})

def listar_espacos(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/listar_espacos.html', {'espacos': espacos})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            request.session["usuario"] = username
            return redirect(home)
        else:
            return render(request, 'apps/login.html', {"erro": "Usuário não encontrado"})
    return render(request, 'apps/login.html')

def logout(request):
    logout(request)
    if "usuario" in request.session:
        del request.session["usuario"]
    return redirect(home)

from django.shortcuts import render, redirect
from django.contrib.auth.models import AnonymousUser
from .models import Espaco, Reserva

# @login_required
def meus_espacos(request):
    if request.user.is_authenticated:
        espacos = Espaco.objects.filter(proprietario_nome=request.user.username)
        return render(request, 'apps/meus_espacos.html', {'espacos': espacos})
    else: # TEMPORÁRIO:
        return render(request, 'apps/meus_espacos.html')

# @login_required
def minhas_reservas(request):
    if request.user.is_authenticated:
        reservas = Reserva.objects.filter(proprietario_nome=request.user.username)
        return render(request, 'apps/minhas_reservas.html', {'reservas': reservas})
    else:
        # TEMPORÁRIO: 
        return render(request, 'apps/minhas_reservas.html')


def selecionar_espaco_para_reserva(request):
    espacos = Espaco.objects.all()
    return render(request, 'selecionar_espaco_para_reserva.html', {'espacos': espacos})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

