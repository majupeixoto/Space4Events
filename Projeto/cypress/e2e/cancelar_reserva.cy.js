describe('scrum 31', () => {
    it('Cancelar reserva', () => {
        cy.visit('/');
        cy.wait(500);
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type("rosa");
        cy.get('#name').type('rosa');
        cy.get(':nth-child(5) > #email').type('rosa@123.com');
        cy.get('#password').type('123');
        cy.wait(500);
        cy.get('.btn_login').click();
        cy.wait(500);

    })
})