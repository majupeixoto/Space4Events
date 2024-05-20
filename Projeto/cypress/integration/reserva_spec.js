describe('Reserva Status Update', () => {
    it('should update reserva status to "reserva terminada"', () => {
      const reservaId = 1;  // Replace with the actual reserva ID
  
      cy.updateReservaStatus(reservaId, 'reserva terminada');
  
      // Additional assertions or actions after updating the status
    });
  });
  