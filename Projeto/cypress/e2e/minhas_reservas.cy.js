describe('minhas_reservas', () => {
    it('Reserva terminada', () => {
        cy.visit('/');
        cy.get('.login').click()
    })

    it('Reserva em andamento', () => {
        //steps do cenario2
    })

    it('Reserva ainda por vir', () => {
        //steps do cenario3
    })
})