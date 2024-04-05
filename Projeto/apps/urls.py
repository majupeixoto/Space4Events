from django.urls import path
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('cadastrar_espaco/', views.cadastrar_espaco, name='cadastrar_espaco'),
    path('detalhes/', views.detalhes, name='detalhes'),
    path('favoritos/', views.favoritos, name='favoritos'),
    path('visualizar_reservas/', views.visualizar_reservas, name='visualizar_reservas'),
    path('listar_espacos/', views.listar_espacos, name='listar_espacos'),
    path('meus_espacos/', views.meus_espacos, name='meus_espacos'),
    path('reservar_espaco/<int:espaco_id>/', views.reservar_espaco, name='reservar_espaco'), 
    path('selecionar_espaco_para_reserva/', views.selecionar_espaco_para_reserva, name='selecionar_espaco_para_reserva'),

    # path('nome_da_historia/', views.nome_da_historia, name="nome_da_historia"),
]