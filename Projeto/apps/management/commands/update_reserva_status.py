# apps/management/commands/update_reserva_status.py

from django.core.management.base import BaseCommand
from apps.models import Reserva  # Adjust the import according to your app structure

class Command(BaseCommand):
    help = 'Update the status of a reserva'

    def add_arguments(self, parser):
        parser.add_argument('reserva_id', type=int, help='The ID of the reserva to update')
        parser.add_argument('status', type=str, help='The new status of the reserva')

    def handle(self, *args, **kwargs):
        reserva_id = kwargs['reserva_id']
        status = kwargs['status']

        try:
            reserva = Reserva.objects.get(id=reserva_id)
            reserva.status = status
            reserva.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully updated reserva {reserva_id} to status "{status}"'))
        except Reserva.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'Reserva with id {reserva_id} does not exist'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))
