describe('Teste de Cadastro', () => {
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
    it('Editar Perfil', () => {
        cy.visit('/');
        cy.get('.ms-auto > .nav-link').click()
        cy.get('.forget').click()
        cy.get('.login > :nth-child(3)').type('Marcos')
        cy.get('.login > :nth-child(4)').type('Marcos Lima')
        cy.get('.login > :nth-child(5)').type('marcos@gmail.com')
        cy.get('.login > :nth-child(6)').type('123')
        cy.get('.btn_login').click()
        cy.get('.ms-auto > a.nav-link').click();
        cy.get('.btn-primary').click();
        cy.get('#first_name').clear();
        cy.get('#first_name').type('Novo');
        cy.get('#last_name').clear();
        cy.get('#last_name').type('Nome');
        cy.get('#email').clear();
        cy.get('#email').type('marcos2@gmail.com');
        cy.get('#senha_atual').type('123');
        cy.get('#nova_senha').type('1234');
        cy.get('#nova_senha_confirmacao').type('1234');
        cy.get('#editar').click();
        cy.get('p').should('contain.html', '<strong>Nome:</strong> Novo Nome');
    })
})