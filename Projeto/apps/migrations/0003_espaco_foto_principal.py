# Generated by Django 5.0.4 on 2024-04-05 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0002_detalhes'),
    ]

    operations = [
        migrations.AddField(
            model_name='espaco',
            name='foto_principal',
            field=models.ImageField(blank=True, null=True, upload_to='fotos/'),
        ),
    ]