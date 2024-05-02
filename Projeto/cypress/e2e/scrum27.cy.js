describe('scrum 27', () => {
    it('filtrar joao pessoa', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('rob');
        cy.get('#name').type('rob');
        cy.get(':nth-child(5) > #email').type('rob@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('p > a').click();
        cy.get(':nth-child(4) > input').type('rob');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa da Praia');
        cy.get('#descricao').type('Uma casa ampla à beira mar, ótima opção para curtir o veraneio com a família.');
        cy.get('#preco_por_noite').type('540');
        cy.get('#endereco').type('Rua treze, 113');
        cy.get('#cidade').type('João Pessoa');
        cy.get('#estado').type('Paraíba');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('3');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('9');
        cy.get('.container > form > .btn').click();
        cy.get('#logo > .fa-solid').click();
        cy.get(':nth-child(1) > .search-container > .input-group > .form-control').type('João Pessoa');
        cy.get(':nth-child(1) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.get(':nth-child(1) > .card > .card-body > .d-flex > .btn-group > .btn').click();
        cy.get('.address').invoke('text').should("match", /João Pessoa/);
    })

    it('filtrar recife', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.btn_login').click();
        cy.get(':nth-child(4) > input').type('rob');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(1) > .search-container > .input-group > .form-control').type('Recife');
        cy.get(':nth-child(1) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.get('row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3').should('not.exist');
    })
    

})