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
        return render(request, 'reservar_espaco.html', {'espaco': espaco})

def visualizar_reservas(request):
    reservas = Reserva.objects.all()
    return render(request, 'apps/visualizar_reservas.html', {'reservas': reservas})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

