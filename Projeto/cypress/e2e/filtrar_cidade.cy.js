describe('Teste de filtrar por cidade', () => {
    it('filtrar com espaço na cidade', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('rob');
        cy.get('#name').type('rob');
        cy.get(':nth-child(5) > #email').type('rob@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
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
        cy.get('#foto_principal').attachFile('imgs/casa_fernando_de_noranha.jpg');
        cy.wait(3000);
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get(':nth-child(1) > .search-container > .input-group > .form-control').type('João Pessoa');
        cy.wait(3000);
        cy.get(':nth-child(1) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.wait(3000);
        cy.get(':nth-child(1) > .card > .card-body > .d-flex > .btn-group > .btn').click();
        cy.get('.row > :nth-child(2) > :nth-child(4)').invoke('text').should("match", /João Pessoa/);
    })

    it('filtrar sem espaço na cidade', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('roberto');
        cy.get('#name').type('roberto');
        cy.get(':nth-child(5) > #email').type('roberto@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get(':nth-child(1) > .search-container > .input-group > .form-control').type('Recife');
        cy.wait(3000);
        cy.get(':nth-child(1) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.wait(3000);
        cy.get('row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3').should('not.exist');
    })
    

})