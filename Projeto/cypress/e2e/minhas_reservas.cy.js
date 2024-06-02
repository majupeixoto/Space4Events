describe('Reservar espaços', () =>{
    it('Debito', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('pedro');
        cy.get('#name').type('Pedro Paulo');
        cy.get(':nth-child(5) > #email').type('pedro@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa Porto de Galinhas');
        cy.get('#descricao').type('Localizado na beira da praia em Porto de galinhas. Perfeito para famílias grandes e grupos de amigos.');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Estrada das Conchas, 465');
        cy.get('#cidade').type('Porto de Galinhas');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('6');
        cy.get('#numero_de_banheiros').type('4');
        cy.get('#numero_de_hospedes').type('15');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('ricardo');
        cy.get('#name').type('Ricardo Montes');
        cy.get(':nth-child(5) > #email').type('ricardo@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('#visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();
        cy.get('#data_check_in').type('2024-08-30'); 
        cy.get('#data_check_out').type('2024-09-01');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();
        cy.get('#pills-debito-tab').click();
        cy.get('#pills-debito > :nth-child(2) > #cpf').type('188.510.226-28');
        cy.get('#numero_cartao_debito').type('1243254910112345');
        cy.get('#data_validade_debito').type('02/25');
        cy.get('#cvv_debito').type('123');
        cy.get('#pills-debito > #botao_reservar').click();
        cy.get('.active').click();
        cy.get('.col').should('exist')
    
    })
    it('Credito', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('lara');
        cy.get('#name').type('Larissa Silva');
        cy.get(':nth-child(5) > #email').type('lara@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Apartamento Edifício Maria');
        cy.get('#descricao').type('O Edifício Maria oferece um apartamento encantador no terceiro andar, com 2 quartos, 1 banheiro, sala de estar espaçosa e cozinha equipada. Ideal para pequenas famílias ou jovens profissionais, o apartamento dispõe de janelas amplas que proporcionam boa iluminação natural e uma vista agradável da cidade. Localizado em uma área tranquila e de fácil acesso aos principais pontos da cidade, é perfeito para quem busca conforto e conveniência.');
        cy.get('#preco_por_noite').type('300');
        cy.get('#endereco').type('Rua das Florestas, 756');
        cy.get('#cidade').type('Recife');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('2');
        cy.get('#numero_de_banheiros').type('1');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('lua');
        cy.get('#name').type('Luana Albuquerque');
        cy.get(':nth-child(5) > #email').type('lua@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(3) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();
        cy.get('#data_check_in').type('2024-08-30'); 
        cy.get('#data_check_out').type('2024-09-01');
        cy.get('#numero_de_hospedes').type('1');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#pills-credito-tab').click();
        cy.get('.payment-form > :nth-child(2) > #cpf').type('188.510.226-28')
        cy.get('#numero_cartao_credito').type('1243254910112345');
        cy.get('#data_validade_credito').type('02/25');
        cy.get('#cvv_credito').type('123');
        cy.get('#parcela').select('3');
        cy.wait(3000);
        cy.get('.payment-form > #botao_reservar').click();
        cy.get('.active').click();
        cy.get('.col').should('exist')
    })
    
    
    it('Cancelamento de Reserva', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('leo');
        cy.get('#name').type('Leonardo Lopes');
        cy.get(':nth-child(5) > #email').type('leo@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa no lago');
        cy.get('#descricao').type('Esta charmosa casa à beira do lago oferece 3 quartos, 2 banheiros, uma sala de estar acolhedora com lareira e uma cozinha moderna. Com um grande quintal e um deck com vista para o lago, é o refúgio perfeito para quem ama a natureza e tranquilidade. A casa é ideal para famílias ou casais que desejam desfrutar de atividades ao ar livre como pesca, caminhadas e piqueniques. Localizada em uma área serena, oferece uma escapada relaxante do agito da cidade.');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Rua das Águas Claras, 123');
        cy.get('#cidade').type('Bonito');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('3');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('6');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('mari');
        cy.get('#name').type('Mariana Medeiros');
        cy.get(':nth-child(5) > #email').type('mari@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(4) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();
        cy.get('#data_check_in').type('2024-08-30'); 
        cy.get('#data_check_out').type('2024-09-01');
        cy.get('#numero_de_hospedes').type('1');
        cy.get('.btn_login').click();
        cy.get('#pills-credito-tab').click();
        cy.get('.payment-form > :nth-child(2) > #cpf').type('188.510.226-28')
        cy.get('#numero_cartao_credito').type('1243254910112345');
        cy.get('#data_validade_credito').type('02/25');
        cy.get('#cvv_credito').type('123');
        cy.get('#parcela').select('2');
        cy.wait(3000);
        cy.get('.payment-form > #botao_reservar').click();
        cy.get('.active').click();
        cy.get('.card-body > form > .btn').click();
        cy.get('.col').should('not.exist')
    })
})