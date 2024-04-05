from django.urls import path
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('detalhes/', views.detalhes, name='detalhes'),
    path('visualizar_reservas/', views.visualizar_reservas, name='visualizar_reservas'),
    # path('nome_da_historia/', views.nome_da_historia, name="nome_da_historia"),
]