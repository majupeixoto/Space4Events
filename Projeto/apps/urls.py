from django.urls import path
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('cadastro/', views.cadastro, name="cadastro"),
    path('cadastrar_espaco/', views.cadastrar_espaco, name='cadastrar_espaco'),
    path('detalhes/<int:espaco_id>/', views.detalhes, name='detalhes'),
    path('favoritos/', views.lista_favoritos, name='favoritos'),
    path('favoritar/<int:espaco_id>', views.favoritar, name='favoritar'),
    path('listar_espacos/', views.listar_espacos, name='listar_espacos'),
    path('login/', views.login_view, name='login'),
    path('login/', views.logout, name='logout'),
    path('meus_espacos/', views.meus_espacos, name='meus_espacos'),
    path('minhas_reservas/', views.minhas_reservas, name='minhas_reservas'),
]