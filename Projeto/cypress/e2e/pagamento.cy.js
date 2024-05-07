describe('pagamento reserva', () => {
    it('pagamento com sucesso', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('thi');
        cy.get('#name').type('thi');
        cy.get(':nth-child(5) > #email').type('thi@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
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
        cy.wait(3000);
        cy.get('.container > form > .btn').click();
        cy.get('#logo > .fa-solid').click();
        cy.get('#sair').click();
        cy.get('#entrar').click();
        cy.get('.forget').click();
        cy.get('#username').type('ana');
        cy.get('#name').type('ana');
        cy.get(':nth-child(5) > #email').type('ana@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#visualizar_detalhes').click();
        cy.get(':nth-child(7) > .btn').click();
        cy.get('#hospede_nome').type('ana');
        cy.get('#cpf').type('111.222.333-44');
        cy.get('#data_check_in').type('2024-09-21');
        cy.get('#data_check_out').type('2024-09-24');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('#additional_info').type('Um casal e 2 filhos');
        cy.wait(3000);
        cy.get('.btn_login').click();

        cy.get('#pills-debito > :nth-child(2) > #numero_cartao').type('1111111111111111');
        cy.get(':nth-child(3) > #data_validade').type('0928');
        cy.get(':nth-child(4) > #cvv').type('111');
        cy.wait(3000);
        cy.get('#pills-debito > #botao_reservar').click();
    
        cy.get('.col').should('exist')
    })

})