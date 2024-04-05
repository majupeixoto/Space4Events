from django.shortcuts import render, redirect, get_object_or_404
from .models import *

def home(request):
    return render(request, 'box/home.html')

def detalhes(request):
    return render(request, 'box/detalhes.html')

