describe('Testes E2E para atualização de datas de reserva', () => {
    it('Deve atualizar as datas de check-in e check-out de uma reserva', () => {
        // Supondo que você já tenha uma reserva criada com ID 1
        const reservaId = 10;
        const newCheckIn = '2023-12-01';
        const newCheckOut = '2023-12-10';

        cy.request('POST', '/api/update-reservation-dates/', {
            reserva_id: reservaId,
            new_check_in: newCheckIn,
            new_check_out: newCheckOut
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('success');
        });

        // Verifique se as datas foram atualizadas corretamente
        cy.request(`/api/reservations/${reservaId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data_check_in).to.eq(newCheckIn);
            expect(response.body.data_check_out).to.eq(newCheckOut);
        });
    });
});