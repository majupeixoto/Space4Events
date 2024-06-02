from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Espaco)
admin.site.register(Favorito)
admin.site.register(Reserva)

from .models import Carrossel

@admin.register(Carrossel)
class CarrosselAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'imagem')
    search_fields = ('descricao',)