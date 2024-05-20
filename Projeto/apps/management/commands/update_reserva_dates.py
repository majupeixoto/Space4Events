# apps/management/commands/update_reserva_dates.py

from django.core.management.base import BaseCommand
from apps.models import Reserva  # Adjust the import according to your app structure

class Command(BaseCommand):
    help = 'Update the check-in and check-out dates of a reserva'

    def add_arguments(self, parser):
        parser.add_argument('reserva_id', type=int, help='The ID of the reserva to update')
        parser.add_argument('check_in', type=str, help='The new check-in date (YYYY-MM-DD)')
        parser.add_argument('check_out', type=str, help='The new check-out date (YYYY-MM-DD)')

    def handle(self, *args, **kwargs):
        reserva_id = kwargs['reserva_id']
        check_in = kwargs['check_in']
        check_out = kwargs['check_out']

        try:
            reserva = Reserva.objects.get(id=reserva_id)
            reserva.data_check_in = check_in
            reserva.data_check_out = check_out
            reserva.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully updated reserva {reserva_id} check-in to {check_in} and check-out to {check_out}'))
        except Reserva.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'Reserva with id {reserva_id} does not exist'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))
