from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Espaco(models.Model):
    proprietario_nome = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    preco_por_noite = models.DecimalField(max_digits=10, decimal_places=2)
    endereco = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    numero_de_quartos = models.PositiveIntegerField(default=1)
    numero_de_banheiros = models.PositiveIntegerField(default=1)
    numero_de_hospedes = models.PositiveIntegerField(default=1)
    foto_principal = models.ImageField(upload_to='fotos/', null=True, blank=True)

    def __str__(self):
        return self.nome

class Reserva(models.Model):
    espaco_proprietario_nome = models.CharField(max_length=100)
    espaco_nome = models.CharField(max_length=100)
    hospede_nome = models.CharField(max_length=100)
    data_check_in = models.DateField()
    data_check_out = models.DateField()
    numero_de_hospedes = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Reserva de {self.espaco_nome} por {self.hospede_nome}"
