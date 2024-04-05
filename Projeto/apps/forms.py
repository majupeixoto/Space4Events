from django import forms
from .models import Reserva, Espaco

class ReservaForm(forms.ModelForm):
    class Meta:
        model = Reserva
        fields = ['espaco_nome', 'hospede_nome', 'data_check_in', 'data_check_out', 'numero_de_hospedes']

    def clean(self):
        cleaned_data = super().clean()
        espaco_nome = cleaned_data.get('espaco_nome')
        data_check_in = cleaned_data.get('data_check_in')
        data_check_out = cleaned_data.get('data_check_out')

        # Verificar se o espaço existe no banco de dados
        if not Espaco.objects.filter(nome=espaco_nome).exists():
            raise forms.ValidationError("O espaço selecionado não existe.")

        # Verificar se o espaço já está reservado para as datas especificadas
        if Reserva.objects.filter(espaco_nome=espaco_nome, data_check_in__lte=data_check_out, data_check_out__gte=data_check_in).exists():
            raise forms.ValidationError("O espaço selecionado já está reservado para as datas especificadas.")

        return cleaned_data
