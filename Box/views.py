from django.http import HttpResponse
from django.shortcuts import render

from .models import *

def home(request):
    return render(request, 'home.html')

def detalhes(request):
    return render(request, 'detalhes.html')