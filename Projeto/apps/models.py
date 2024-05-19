from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

# lembrando: SEMPRE que modificar ou acrescentar uma models a gnt tem q fazer os comandos:
# python 
#   manage.py makemigrations
# e em seguida:
# python 
#   manage.py migrate
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
            'foto_principal_url': self.foto_principal.url if self.foto_principal else None
        }
    
    def atualizar_dados(self, nome, descricao, preco_por_noite, endereco, cidade, estado, pais,
                        numero_de_quartos, numero_de_banheiros, numero_de_hospedes, foto_principal):
        # Atualiza os campos do objeto Espaco
        self.nome = nome
        self.descricao = descricao
        self.preco_por_noite = preco_por_noite
        self.endereco = endereco
        self.cidade = cidade
        self.estado = estado
        self.pais = pais
        self.numero_de_quartos = numero_de_quartos
        self.numero_de_banheiros = numero_de_banheiros
        self.numero_de_hospedes = numero_de_hospedes
        self.foto_principal = foto_principal

        # Salva as alterações no banco de dados
        self.save()

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
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    parcela = models.IntegerField(null=True, blank=True)
    valor_parcelas = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    espaco = models.ForeignKey(Espaco, on_delete=models.PROTECT)
    avaliacao = models.IntegerField(blank=True, null=True)
    comentario_avaliacao = models.TextField(blank=True, null=True)

    @property
    def status(self):
        hoje = timezone.now().date()
        if self.data_check_out < hoje:
            return "Reserva terminada"
        elif self.data_check_in <= hoje <= self.data_check_out:
            return "Reserva em andamento"
        else:
            return "Reserva ainda por vir"

    @classmethod
    def minhas_reservas(cls, hospede_nome):
        return cls.objects.filter(hospede_nome=hospede_nome)

    @classmethod
    def avaliacoes_por_espaco(cls, espaco_id):
        return cls.objects.filter(espaco_id=espaco_id).exclude(avaliacao__isnull=True)

    def __str__(self):
        return f"Reserva de {self.espaco_nome} por {self.hospede_nome}"



