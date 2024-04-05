from django.contrib import admin
from django.urls import path, include

from . import views

# concentrar todos os views nesta pasta box
urlpatterns = [
    path('', views.home, name = 'home'),
    path('detalhes/', views.detalhes, name='detalhes'),
]