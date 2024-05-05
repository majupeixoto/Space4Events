it('Cancelamento de Reserva', () => {
    cy.visit('/');
    cy.get('[href="/minhas_reservas/"]').click();
    cy.get(':nth-child(4) > input').type('lua');
    cy.get(':nth-child(5) > input').type('123');
    cy.get('.btn_login').click();
    cy.get('#logo').click();
    cy.get(':nth-child(4) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
    cy.get(':nth-child(8) > .btn').click();
    cy.get('#hospede_nome').type('lua');
    cy.get('#cpf').type('66666666666')
    cy.get('#data_check_in').type('2024-05-05'); 
    cy.get('#data_check_out').type('2024-05-06');
    cy.get('#numero_de_hospedes').type('1');
    cy.get('.btn_login').click();
    cy.get('#numero_cartao').type('909090909090');
    cy.get('#data_validade').type('03/30');
    cy.get('#cvv').type('030');
    cy.get('.btn_login').click();
    cy.get('#cancelar').click();
})

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
        cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > .btn').click();
        cy.get(':nth-child(8) > .btn').click()
        cy.get('#hospede_nome').type('lua');
        cy.get('#data_check_in').type('2024-04-30'); 
        cy.get('#data_check_out').type('2024-05-01');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();
        cy.get('#numero_cartao').type('1243254');
        cy.get('#data_validade').type('02/05');
        cy.get('#cvv').type('123');
        cy.get('.btn_login').click();

    })

    it('Reserva em andamento', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get(':nth-child(4) > input').type('lua');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get('#logo').click();
        cy.get('[href="/detalhes/3/"]').click();
        cy.get(':nth-child(17) > .btn').click();
        cy.get('#hospede_nome').type('lua');
        cy.get('#data_check_in').type('2024-05-02'); 
        cy.get('#data_check_out').type('2024-05-02');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();
        cy.get('#numero_cartao').type('909090909090');
        cy.get('#data_validade').type('03/30');
        cy.get('#cvv').type('030');
        cy.get('.btn_login').click();

    })

    it('Reserva ainda por vir', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get(':nth-child(4) > input').type('lua');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get('#logo').click();
        cy.get('[href="/detalhes/3/"]').click();
        cy.get(':nth-child(17) > .btn').click();
        cy.get('#hospede_nome').type('lua');
        cy.get('#data_check_in').type('2024-09-03'); 
        cy.get('#data_check_out').type('2024-10-02');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();
        cy.get('#numero_cartao').type('909090909090');
        cy.get('#data_validade').type('03/30');
        cy.get('#cvv').type('030');
        cy.get('.btn_login').click();
    })
})
