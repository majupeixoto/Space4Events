describe('Reserva Datas Update', () => {
  it('should update reserva check-in and check-out dates', () => {
    const reservaId = 1;  // Substitua pelo ID real da reserva
    const newCheckIn = '2024-06-01';  // Nova data de check-in
    const newCheckOut = '2024-06-05';  // Nova data de check-out

    cy.updateReservaDates(reservaId, newCheckIn, newCheckOut);

    // Asserts ou outras ações adicionais após a atualização das datas
  });
});
