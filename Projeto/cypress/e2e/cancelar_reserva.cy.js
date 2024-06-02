describe('scrum 31', () => {
    it('Cancelar reserva', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.get('#entrar').click();
        cy.wait(1000);
        cy.get('.forget').click();
        cy.get('#username').type("rosa");
        cy.get('#name').type('rosa');
        cy.get(':nth-child(5) > #email').type('rosa@123.com');
        cy.get('#password').type('123');
        cy.wait(1000);
        cy.get('.btn_login').click();
        cy.wait(500);
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Apartamento luxo');
        cy.get('#descricao').type('Um amplo apartamento luxuoso.');
        cy.get('#preco_por_noite').type('1500');
        cy.get('#endereco').type('Rua do ano, 200');
        cy.get('#cidade').type('Fortaleza');
        cy.get('#estado').type('Ceará');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('5');
        cy.get('#numero_de_banheiros').type('7');
        cy.get('#numero_de_hospedes').type('12');
        cy.get('.container > form > .btn').click();
        cy.wait(1000);
        cy.get('#sair').click();
        cy.wait(2000);
        cy.get('#entrar').click();
        cy.wait(1000);
        cy.get('.forget').click();
        cy.get('#username').type("rosy");
        cy.get('#name').type('rosy');
        cy.get(':nth-child(5) > #email').type('rosy@123.com');
        cy.get('#password').type('123');
        cy.wait(1000);
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
        cy.get('.card-body > form > .btn').click();
        cy.wait(3000);
        cy.get('row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3').should('not.exist');
    })
    
})