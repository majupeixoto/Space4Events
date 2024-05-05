// ESSE TESTE VALIDA FAVORITAR, DESFAVORITAR E LISTAR OS FAVORITADOS

describe('test favoritar', () => {
    it('Favoritado com sucesso', () => {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get(':nth-child(4) > input').type('b')
        cy.get(':nth-child(5) > input').type('123')
        cy.get('.btn_login').click()
        cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click()
        cy.get('#favoritar').click()
        cy.get('[href="/favoritos/"]').click()
        cy.get('.corpo > .row > :nth-child(2)').should('exist')
    })
    it('Desfavoritar com sucesso', ()=> {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get(':nth-child(4) > input').type('b')
        cy.get(':nth-child(5) > input').type('123')
        cy.get('.btn_login').click()
        cy.get('[href="/favoritos/"]').click()
        cy.get(':nth-child(2) > .card > .card-body > .btn').click()
        cy.get('#desfavoritar').click()
        cy.get('[href="/favoritos/"]').click()
        cy.get('.corpo > .row > :nth-child(2)').should('not.exist')
    })
})