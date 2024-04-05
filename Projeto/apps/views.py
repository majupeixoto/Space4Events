from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import ReservaForm

def home(request):
    return render(request, 'apps/home.html')

def detalhes(request):
    return render(request, 'apps/detalhes.html')

def criar_reserva(request):
    if request.method == 'POST':
        form = ReservaForm(request.POST)
        if form.is_valid():
            form.save()
            # Redireciona para uma página de sucesso - FALTA FAZER ESSA PÁGINA
            return redirect('pagina_de_sucesso')
    else:
        form = ReservaForm()
    return render(request, 'apps/criar_reserva.html', {'form': form})


def visualizar_reservas(request):
    reservas = Reserva.objects.all()
    return render(request, 'apps/visualizar_reservas.html', {'reservas': reservas})

# def nome_da_historia(request):
    # return render(request, 'apps/nome_da_historia.html')

