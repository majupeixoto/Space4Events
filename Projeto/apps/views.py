from django.shortcuts import render, redirect, get_object_or_404
from .models import *

def home(request):
    return render(request, 'apps/home.html')

def detalhes(request):
    return render(request, 'apps/detalhes.html')

def visualizar_reservas(request):
    return render(request, 'apps/visualizar_reservas.html')

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

