describe('test cadastro', () => {
    it('Cadastro com sucesso', () => {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get('.forget').click()
        cy.get('.login > :nth-child(3)').type('malu')
        cy.get('.login > :nth-child(4)').type('Maria Luiza')
        cy.get('.login > :nth-child(5)').type('malu@gmail.com')
        cy.get('.login > :nth-child(6)').type('123')
        cy.get('.btn_login').click()
        cy.url().should('include', '')
    })
    it('Login com sucesso', () => {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get(':nth-child(4) > input').type('malu')
        cy.get(':nth-child(5) > input').type('123')
        cy.get('.btn_login').click()
        // cy.url().should('include', '')
    })
    it('Editar perfil', () => {
        cy.get('.ms-auto > a.nav-link')
        cy.get('.btn-primary')
        cy.get('#last_name').type('Novo')
    })
})