from django.shortcuts import render, redirect, get_object_or_404
from .models import *

def home(request):
    return render(request, 'apps/home.html')

def detalhes(request):
    return render(request, 'apps/detalhes.html')

def visualizar_reservas(request):
    reservas = Reserva.objects.all()
    return render(request, 'apps/visualizar_reservas.html', {'reservas': reservas})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

