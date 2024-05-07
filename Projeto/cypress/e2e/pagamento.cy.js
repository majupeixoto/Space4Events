describe('scrum 27', () => {
    it('filtrar joao pessoa', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('thi');
        cy.get('#name').type('thi');
        cy.get(':nth-child(5) > #email').type('thi@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Red House');
        cy.get('#descricao').type('Casa com otima área de lazer.');
        cy.get('#preco_por_noite').type('360');
        cy.get('#endereco').type('Rua quinze, 113');
        cy.get('#cidade').type('Salvador');
        cy.get('#estado').type('Bahia');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('3');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('9');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('ana');
        cy.get('#name').type('ana');
        cy.get(':nth-child(5) > #email').type('ana@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('#visualizar_detalhes').click();
        cy.get(':nth-child(7) > .btn').click();
        
        //cy.get('.row > :nth-child(2) > :nth-child(3)').invoke('text').should("match", /João Pessoa/);
    })

   
    

})