// cypress/e2e/avaliacao.cy.js

describe('Testa a Avaliação de uma Reserva', () => {
    const reservaIdDebito = 1;
    const reservaIdCredito = 2;
    const checkInDate = '2024-08-30';
    const checkOutDate = '2024-09-01';
  
    it('Debito', () => {
      cy.visit('/');
      cy.get('[href="/minhas_reservas/"]').click();
      cy.get('.forget').click();
      cy.get('#username').type('pedro');
      cy.get('#name').type('pedro');
      cy.get(':nth-child(5) > #email').type('pedro@123.com');
      cy.get('#password').type('123');
      cy.wait(3000);
      cy.get('.btn_login').click();
      cy.get('[aria-current="page"]').click();
      cy.get('#nome').type('Chácara das Flores');
      cy.get('#descricao').type('Localizada no coração da natureza, esta chácara encanta com seus jardins floridos e áreas de lazer ao ar livre, ideal para casamentos e eventos ao ar livre.');
      cy.get('#preco_por_noite').type('150,00');
      cy.get('#endereco').type('Estrada das Flores, 456');
      cy.get('#cidade').type('Campinas');
      cy.get('#estado').type('São Paulo');
      cy.get('#pais').type('Brasil');
      cy.get('#numero_de_quartos').type('4');
      cy.get('#numero_de_banheiros').type('3');
      cy.get('#numero_de_hospedes').type('8');
      cy.wait(3000);
      cy.get('.container > form > .btn').click();
      cy.get('#sair').click();
      cy.get('[href="/minhas_reservas/"]').click();
      cy.wait(3000);
      cy.get('.forget').click();
      cy.get('#username').type('ricardo');
      cy.get('#name').type('ricardo');
      cy.get(':nth-child(5) > #email').type('ricardo@123.com');
      cy.get('#password').type('123');
      cy.get('.btn_login').click();
      cy.get('#visualizar_detalhes').click();
      cy.get(':nth-child(8) > .btn').click();      
      cy.get('#hospede_nome').type('ricardo');
      cy.get('#cpf').type('188.510.226-28');
      cy.get('#data_check_in').type(checkInDate); 
      cy.get('#data_check_out').type(checkOutDate);
      cy.get('#numero_de_hospedes').type('1');
      cy.wait(3000);
      cy.get('.btn_login').click();
      cy.get('#pills-debito-tab').click();
      cy.get('#pills-debito > :nth-child(2) > #numero_cartao').type('1243254910112345');
      cy.get(':nth-child(3) > #data_validade').type('02/25');
      cy.get(':nth-child(4) > #cvv').type('123');
      cy.wait(3000);
      cy.get('#pills-debito > #botao_reservar').click();
      cy.get('.active').click();
      cy.get('.col').should('exist');
  
      // Atualizar a reserva para datas passadas e realizar a avaliação
      cy.updateReservationDates(reservaIdDebito, '2023-01-01', '2023-01-02');
      cy.visit(`/reservas/${reservaIdDebito}`);
      cy.get('button.avaliar').click();
      cy.get('input[name="rating"]').type('5');
      cy.get('textarea[name="comment"]').type('Ótimo espaço!');
      cy.get('button.submit').click();
      cy.contains('Avaliação enviada com sucesso');
    });
  
    it('Credito', () => {
      cy.visit('/');
      cy.get('[href="/minhas_reservas/"]').click();
      cy.get('.forget').click();
      cy.get('#username').type('lara');
      cy.get('#name').type('lara');
      cy.get(':nth-child(5) > #email').type('lara@123.com');
      cy.get('#password').type('123');
      cy.get('.btn_login').click();
      cy.get('[aria-current="page"]').click();
      cy.get('#nome').type('Apartamento Central');
      cy.get('#descricao').type('Apartamento no centro da Moderno e sofisticado apartamento no centro da cidade, ideal para estadias urbanas com acesso fácil às principais atrações e negócios locais.');
      cy.get('#preco_por_noite').type('100,00');
      cy.get('#endereco').type('Av. Gen. Monteiro de Barros, 638');
      cy.get('#cidade').type('Guarujá');
      cy.get('#estado').type('Rio de Janeiro');
      cy.get('#pais').type('Brasil');
      cy.get('#numero_de_quartos').type('2');
      cy.get('#numero_de_banheiros').type('1');
      cy.get('#numero_de_hospedes').type('4');
      cy.get('.container > form > .btn').click();
      cy.get('#sair').click();
      cy.get('[href="/minhas_reservas/"]').click();
      cy.get('.forget').click();
      cy.get('#username').type('lua');
      cy.get('#name').type('lua');
      cy.get(':nth-child(5) > #email').type('lua@123.com');
      cy.get('#password').type('123');
      cy.get('.btn_login').click();
      cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
      cy.get(':nth-child(8) > .btn').click();
      cy.get('#hospede_nome').type('lua');
      cy.get('#cpf').type('188.510.226-28');
      cy.get('#data_check_in').type(checkInDate); 
      cy.get('#data_check_out').type(checkOutDate);
      cy.get('#numero_de_hospedes').type('1');
      cy.wait(3000);
      cy.get('.btn_login').click();
      cy.get('#pills-credito-tab').click();
      cy.get('.payment-form > :nth-child(2) > #numero_cartao').type('1243254910112345');
      cy.get(':nth-child(1) > #data_validade').type('02/25');
      cy.get(':nth-child(2) > #cvv').type('123');
      cy.wait(3000);
      cy.get('.payment-form > #botao_reservar').click();
      cy.get('.active').click();
      cy.get('.col').should('exist');
  
      // Atualizar a reserva para datas passadas e realizar a avaliação
      cy.updateReservationDates(reservaIdCredito, '2023-01-01', '2023-01-02');
      cy.visit(`/reservas/${reservaIdCredito}`);
      cy.get('button.avaliar').click();
      cy.get('input[name="rating"]').type('5');
      cy.get('textarea[name="comment"]').type('Excelente apartamento!');
      cy.get('button.submit').click();
      cy.contains('Avaliação enviada com sucesso');
    });
  });
  