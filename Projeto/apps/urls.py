from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

# concentrar todos os views nesta pasta box, listar abaixo
urlpatterns = [
    path('', views.home, name = 'home'),
    path('accounts/profile/', views.profile, name='profile'),
    path('cadastro/', views.cadastro, name="cadastro"),
    path('cadastrar_espaco/', views.cadastrar_espaco, name='cadastrar_espaco'),
    path('detalhes/<int:espaco_id>/', views.detalhes, name='detalhes'),
    path('favoritos/', views.lista_favoritos, name='favoritos'),
    path('favoritar/<int:espaco_id>', views.favoritar, name='favoritar'),
    path('listar_espacos/', views.listar_espacos, name='listar_espacos'),
    path('login/', auth_views.LoginView.as_view(template_name='apps/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('meus_espacos/', views.meus_espacos, name='meus_espacos'),
    path('minhas_reservas/', views.minhas_reservas, name='minhas_reservas'),
    path('reservar_espaco/<int:espaco_id>', views.criar_reserva, name='reservar_espaco'),
    path('filtrar_espacos_por_cidade/', views.filtrar_espacos_por_cidade, name='filtrar_espacos_por_cidade'),
    path('pagamento_reserva/<int:reserva_id>/', views.pagamento_reserva, name='pagamento_reserva'),
]