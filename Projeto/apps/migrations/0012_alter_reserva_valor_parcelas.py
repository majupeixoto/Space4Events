# Generated by Django 5.0.4 on 2024-05-19 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0011_reserva_comentario_avaliacao_alter_reserva_avaliacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reserva',
            name='valor_parcelas',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
