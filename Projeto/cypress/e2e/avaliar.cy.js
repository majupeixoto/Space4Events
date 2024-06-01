// cypress/e2e/avaliacao.cy.js

// Tutorial para realizar o teste:
// 1º. Verificar qual o id da reserva no banco de dados
// Caso o id seja "n", reservaId deve ser "n + 1"
// 2º. Alterar a linha 72 para ter o mesmo id que reservaId

const reservaId = 57;

const checkInDate = '2024-08-30';
const checkOutDate = '2024-09-01';

const newCheckIn = '2023-08-30';
const newCheckOut = '2023-09-01';

describe('Testa a Avaliação de uma Reserva', () => {

    it('Debito', () => {
      cy.visit('/');
      cy.get('[href="/minhas_reservas/"]').click();
      cy.get('.forget').click();
      cy.get('#username').type('carlos');
      cy.get('#name').type('carlos');
      cy.get(':nth-child(5) > #email').type('carlos@123.com');
      cy.get('#password').type('123');
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
      cy.get('.container > form > .btn').click();
      cy.get('#sair').click();
      cy.get('[href="/minhas_reservas/"]').click();
      cy.get('.forget').click();
      cy.get('#username').type('carolina');
      cy.get('#name').type('carolina');
      cy.get(':nth-child(5) > #email').type('carolina@123.com');
      cy.get('#password').type('123');
      cy.get('.btn_login').click();
      cy.get('#visualizar_detalhes').click();
      cy.get(':nth-child(8) > .btn').click();      
      cy.get('#data_check_in').type(checkInDate); 
      cy.get('#data_check_out').type(checkOutDate);
      cy.get('#numero_de_hospedes').type('1');
      cy.get('.btn_login').click();
      cy.get('#pills-debito-tab').click();
      cy.get('#pills-debito > :nth-child(2) > #cpf').type('188.510.226-28');
      cy.get('#numero_cartao_debito').type('1243254910112345');
      cy.get('#data_validade_debito').type('02/25');
      cy.get('#cvv_debito').type('123');
      cy.get('#pills-debito > #botao_reservar').click();
      cy.get('.active').click();
  
      cy.request('POST', '/api/update-reservation-dates/', {
        reserva_id: reservaId,
        new_check_in: newCheckIn,
        new_check_out: newCheckOut
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
    });

    cy.reload();

    cy.get('[href="/avaliar_reserva/57/"]').click();
    cy.get('[data-avaliacao="4"]').click(); // para alterar quantas estrelas da avaliação
    cy.get('#comentario_avaliacao').type('Overall, my experience with the reservation platform was positive. The system is intuitive and user-friendly, making it easy to manage reservations and property listings. With some minor improvements in wait times, UI feedback, and error handling, the platform could offer an even better user experience.');
    cy.get('#avaliar').click();
    cy.get('.fa-solid').click();
    cy.get('#visualizar_detalhes').click();
    cy.get('.rating').should('have.attr', 'data-rating', '4');

    });
  
   
  });
  
