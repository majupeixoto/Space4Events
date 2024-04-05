from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from django.http import HttpResponse
from datetime import datetime

def home(request):
    return render(request, 'apps/home.html')

def detalhes(request):
    return render(request, 'apps/detalhes.html')

def listar_espacos(request):
    espacos = Espaco.objects.all()
    return render(request, 'apps/listar_espacos.html', {'espacos': espacos})

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

def visualizar_reservas(request):
    reservas = Reserva.objects.all()
    return render(request, 'apps/visualizar_reservas.html', {'reservas': reservas})

def selecionar_espaco_para_reserva(request):
    espacos = Espaco.objects.all()
    return render(request, 'selecionar_espaco_para_reserva.html', {'espacos': espacos})

def meus_espacos(request):
    # SUPONDO proprietário específico
    espacos = Espaco.objects.filter(proprietario_nome='João da Silva')
    # Substituir pelo método adequado para obter os espaços do proprietário atualmente autenticado
    # espacos = Espaco.objects.filter(proprietario_nome=request.user.username)
    return render(request, 'apps/meus_espacos.html', {'espacos': espacos})

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

def favoritos(request):
    # Supondo que já há uma maneira de obter os favoritos do usuário atual
    # Substituir pelo método adequado para obter os favoritos do usuário autenticado
    favoritos = Favorito.objects.filter(usuario=request.user)
    return render(request, 'favoritos.html', {'favoritos': favoritos})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

