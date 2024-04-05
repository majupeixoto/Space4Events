from django.urls import path
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('detalhes/', views.detalhes, name='detalhes'),
    path('favoritos/', views.favoritos, name='favoritos'),
    path('meus_espacos/', views.meus_espacos, name='meus_espacos'),
    path('visualizar_reservas/', views.visualizar_reservas, name='visualizar_reservas'),
    path('listar_espacos/', views.listar_espacos, name='listar_espacos'),
    path('cadastrar_espacos/', views.cadastrar_espaco, name='cadastrar_espacos'),

    # path('nome_da_historia/', views.nome_da_historia, name="nome_da_historia"),
]