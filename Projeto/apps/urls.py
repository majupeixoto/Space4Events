from django.urls import path
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('cadastrar_espaco/', views.cadastrar_espaco, name='cadastrar_espaco'),
    path('detalhes/', views.detalhes, name='detalhes'),
    path('favoritos/', views.favoritos, name='favoritos'),
    path('listar_espacos/', views.listar_espacos, name='listar_espacos'),
    path('login/', views.login_view, name='login'),
    path('meus_espacos/', views.meus_espacos, name='meus_espacos'),
    path('visualizar_reservas/', views.visualizar_reservas, name='visualizar_reservas'),
]