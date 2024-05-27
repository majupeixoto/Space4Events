describe('scrum 31', () => {
    it('Filtrar data', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.get('#entrar').click();
        cy.wait(1000);
        cy.get('.forget').click();
        cy.get('#username').type("beta");
        cy.get('#name').type('beta');
        cy.get(':nth-child(5) > #email').type('beta@123.com');
        cy.get('#password').type('123');
        cy.wait(1000);
        cy.get('.btn_login').click();
        cy.wait(500);
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa campo');
        cy.get('#descricao').type('Casa no campo com um vasto jardim calmo e bela vista para as colinas.');
        cy.get('#preco_por_noite').type('750');
        cy.get('#endereco').type('Rua das colinas, 100');
        cy.get('#cidade').type('Bonito');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('4');
        cy.get('#numero_de_banheiros').type('5');
        cy.get('#numero_de_hospedes').type('10');
        cy.get('.container > form > .btn').click();
        cy.wait(1000);
        cy.get('#sair').click();
        cy.wait(2000);
        cy.get('#entrar').click();
        cy.wait(1000);
        cy.get('.forget').click();
        cy.get('#username').type("beto");
        cy.get('#name').type('beto');
        cy.get(':nth-child(5) > #email').type('beto@123.com');
        cy.get('#password').type('123');
        cy.wait(1000);
        cy.get('.btn_login').click();
        cy.wait(1000);
        cy.get('#checkin_date').type('2025-07-20')
        cy.get('#checkout_date').type('2025-07-23');
        cy.get(':nth-child(2) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.get('.col').should('exist')
    })

    it('Filtrar data teste 2', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.btn_login').click();
        cy.get(':nth-child(4) > input').type('beto');
        cy.get(':nth-child(5) > input').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.wait(1000);
        cy.get('#visualizar_detalhes').click();
        cy.wait(1000);
        cy.get(':nth-child(8) > .btn').click();
        cy.get('#data_check_in').type('2025-07-20');
        cy.get('#data_check_out').type('2025-07-23');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('.btn_login').click();
        cy.get('#pills-debito > :nth-child(2) > #cpf').type('111.222.333-44');
        cy.get('#numero_cartao_debito').type('1243254910112345');
        cy.get('#data_validade_debito').type('02/25');
        cy.get('#cvv_debito').type('123');
        cy.get('#pills-debito > #botao_reservar').click();
        cy.wait(3000);
        cy.get('.fa-solid').click();
        cy.get('#checkin_date').type('2025-07-20')
        cy.get('#checkout_date').type('2025-07-23');
        cy.get(':nth-child(2) > .search-container > .input-group > .input-group-append > .btn').click();
        cy.get('.col').should('not.exist')
    })
    
    
})