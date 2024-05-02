describe('minhas_reservas', () => {
    it('Reserva terminada', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('lua');
        cy.get('#name').type('lua');
        cy.get(':nth-child(5) > #email').type('lua@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('p > a').click();
        cy.get(':nth-child(4) > input').type('lua');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(1) > .card > .card-body > .d-flex > .btn-group > .btn').click();
        cy.get(':nth-child(17) > .btn').click();
        cy.get('#hospede_nome').type('lua');
        cy.get('#data_check_in').type('31-11-2023');
        cy.get('#data_check_out').type('02-12-2024');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();


    })

    it('Reserva em andamento', () => {
        //steps do cenario2
    })

    it('Reserva ainda por vir', () => {
        //steps do cenario3
    })
})