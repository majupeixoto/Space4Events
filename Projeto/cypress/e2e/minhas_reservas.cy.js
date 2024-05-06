it('Cancelamento de Reserva', () => {
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
    cy.get(':nth-child(7) > .btn').click()
    cy.get('#hospede_nome').type('lua');
    cy.get('#cpf').type('188.509.226-28');
    cy.get('#data_check_in').type('2024-08-30'); 
    cy.get('#data_check_out').type('2024-09-01');
    cy.get('#numero_de_hospedes').type('1');
    cy.get('.btn_login').click();
    cy.get('#pills-credito-tab').click();
    cy.get('.payment-form > :nth-child(2) > #numero_cartao').type('1243254910112345');
    cy.get(':nth-child(1) > #data_validade').type('02/25');
    cy.get(':nth-child(2) > #cvv').type('123');
    cy.get('.payment-form > #botao_reservar').click();   
})

it('Reserva ainda por vir', () => {
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
    cy.get(':nth-child(7) > .btn').click()
    cy.get('#hospede_nome').type('lua');
    cy.get('#cpf').type('188.509.226-28');
    cy.get('#data_check_in').type('2024-08-30'); 
    cy.get('#data_check_out').type('2024-09-01');
    cy.get('#numero_de_hospedes').type('1');
    cy.get('.btn_login').click();
    cy.get('#pills-credito-tab').click();
    cy.get('.payment-form > :nth-child(2) > #numero_cartao').type('1243254910112345');
    cy.get(':nth-child(1) > #data_validade').type('02/25');
    cy.get(':nth-child(2) > #cvv').type('123');
    cy.get('.payment-form > #botao_reservar').click();
})

    