describe('excluir espaco', () => {
    it('excluir_desistir', () => {
        cy.visit('/');
        cy.get('#entrar');
        cy.get(':nth-child(4) > input').type('b');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('[href="/meus_espacos/"]');
        cy.get('.btn-danger');
        cy.get('.btn-secondary');
    })
    it('excluir_definitivo', () => {
        cy.visit('/');
        cy.get('#entrar');
        cy.get(':nth-child(4) > input').type('b');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('[href="/meus_espacos/"]');
        cy.get('.btn-danger');
        cy.get('.btn-danger');
    })
})