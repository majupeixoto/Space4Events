from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# lembrando: SEMPRE que modificar ou acrescentar uma models a gnt tem q fazer os comandos:
# python manage.py makemigrations
# e em seguida:
# python manage.py migrate
# python manage.py runserver

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
    sinal_reserva = models.DecimalField(max_digits=6, decimal_places=2, default=0)

    @classmethod
    def meus_espacos(cls, proprietario_nome):
        return cls.objects.filter(proprietario_nome=proprietario_nome)

    def detalhes(self):
        return {
            'nome': self.nome,
            'descricao': self.descricao,
            'preco_por_noite': self.preco_por_noite,
            'endereco': self.endereco,
            'cidade': self.cidade,
            'estado': self.estado,
            'pais': self.pais,
            'numero_de_quartos': self.numero_de_quartos,
            'numero_de_banheiros': self.numero_de_banheiros,
            'numero_de_hospedes': self.numero_de_hospedes,
            'sinal_reserva': self.sinal_reserva,
            'foto_principal': self.foto_principal.url if self.foto_principal else None
        }

    def __str__(self):
        return self.nome
class Favorito(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    espaco = models.ForeignKey(Espaco, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.usuario.username} - {self.espaco.nome}'
class Reserva(models.Model):
    espaco_proprietario_nome = models.CharField(max_length=100)
    espaco_nome = models.CharField(max_length=100, default='Nome do Espaço Padrão')
    hospede_nome = models.CharField(max_length=100)
    data_check_in = models.DateField()
    data_check_out = models.DateField()
    numero_de_hospedes = models.PositiveIntegerField(default=1)
    espaco = models.ForeignKey(Espaco, on_delete=models.PROTECT)

    @classmethod
    def minhas_reservas(cls, hospede_nome):
        return cls.objects.filter(hospede_nome=hospede_nome)

    def __str__(self):
        return f"Reserva de {self.espaco_nome} por {self.hospede_nome}"

