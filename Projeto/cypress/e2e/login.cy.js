describe('test Login', () => {
    it('Login com sucesso', () => {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get(':nth-child(4) > input').type('b')
        cy.get(':nth-child(5) > input').type('123')
        cy.get('.btn_login').click()
    })
})
