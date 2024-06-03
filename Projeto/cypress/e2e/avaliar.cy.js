// cypress/e2e/avaliacao.cy.js

// Tutorial para realizar o teste:
// 1º. Verificar qual o id da reserva no banco de dados
// Caso o id seja "n", reservaId deve ser "n + 1"
// 2º. Alterar a linha 72 para ter o mesmo id que reservaId

const reservaId = 75;
const reservaId_2 = reservaId + 1;
const reservaId_3 = reservaId + 2;

const checkInDate = '2024-08-30';
const checkOutDate = '2024-09-01';

const newCheckIn = '2023-08-30';
const newCheckOut = '2023-09-01';

describe('Testa a Avaliação de uma Reserva', () => {

    it('Avaliar normalmente: avaliação + comentário', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('carlos');
        cy.get('#name').type('carlos');
        cy.get(':nth-child(5) > #email').type('carlos@123.com');
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
        cy.get('#foto_principal').attachFile('imgs/casa_das_flores.jpg');
        cy.wait(3000);
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('carolina');
        cy.get('#name').type('carolina');
        cy.get(':nth-child(5) > #email').type('carolina@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();      
        cy.get('#data_check_in').type(checkInDate); 
        cy.get('#data_check_out').type(checkOutDate);
        cy.get('#numero_de_hospedes').type('1');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#pills-debito-tab').click();
        cy.get('#pills-debito > :nth-child(2) > #cpf').type('188.510.226-28');
        cy.get('#numero_cartao_debito').type('1243254910112345');
        cy.get('#data_validade_debito').type('02/25');
        cy.get('#cvv_debito').type('123');
        cy.wait(3000);
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
    
        cy.get('[href="/avaliar_reserva/75/"]').click();
        cy.get('[data-avaliacao="4"]').click(); // para alterar quantas estrelas da avaliação
        cy.get('#comentario_avaliacao').type('Minha experiência na Chácara das Flores foi verdadeiramente especial. A casa é encantadora, com uma atmosfera acolhedora e rústica. A localização cercada por natureza proporcionou momentos de paz e tranquilidade. A equipe foi muito atenciosa e prestativa, garantindo que tudo estivesse perfeito durante a nossa estadia. Recomendo a todos que desejam uma escapada relaxante e autêntica');
        cy.wait(3000);
        cy.get('#avaliar').click();
        cy.get('.fa-solid').click();
        cy.get('#visualizar_detalhes').click();
        cy.get('.rating').should('have.attr', 'data-rating', '4');
    });

    it('Editar Avaliação Existente', () => {
        cy.visit('/');
        cy.get('#entrar').click();
        cy.get(':nth-child(4) > input').type('carolina');
        cy.get(':nth-child(5) > input').type('123');
        cy.get('.btn_login').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('[href="/avaliar_reserva/75/"]').click();
        cy.get('[data-avaliacao="1"]').click(); // para alterar quantas estrelas da avaliação
        cy.get('#comentario_avaliacao').type('O D I E I !');
        cy.get('#avaliar').click();
        cy.get('.fa-solid').click();
        cy.get('#visualizar_detalhes').click();
        cy.get('.rating').should('have.attr', 'data-rating', '1');
    });

    it('Avaliar apenas com avaliação', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('jonas');
        cy.get('#name').type('jonas');
        cy.get(':nth-child(5) > #email').type('jonas@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Apartamento Central');
        cy.get('#descricao').type('Apartamento no centro da Moderno e sofisticado apartamento no centro da cidade, ideal para estadias urbanas com acesso fácil às principais atrações e negócios locais.');
        cy.get('#preco_por_noite').type('100,00');
        cy.get('#endereco').type('Av. Gen. Monteiro de Barros, 638');
        cy.get('#cidade').type('Guarujá');
        cy.get('#estado').type('Rio de Janeiro');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('4');
        cy.get('#numero_de_banheiros').type('3');
        cy.get('#numero_de_hospedes').type('8');
        cy.get('#foto_principal').attachFile('imgs/apartamento_central.jpg');
        cy.wait(3000);
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('ines');
        cy.get('#name').type('ines');
        cy.get(':nth-child(5) > #email').type('ines@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();      
        cy.get('#data_check_in').type(checkInDate); 
        cy.get('#data_check_out').type(checkOutDate);
        cy.get('#numero_de_hospedes').type('1');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#pills-debito-tab').click();
        cy.get('#pills-debito > :nth-child(2) > #cpf').type('188.510.226-28');
        cy.get('#numero_cartao_debito').type('1243254910112345');
        cy.get('#data_validade_debito').type('02/25');
        cy.get('#cvv_debito').type('123');
        cy.wait(3000);
        cy.get('#pills-debito > #botao_reservar').click();
        cy.get('.active').click();
    
        cy.request('POST', '/api/update-reservation-dates/', {
            reserva_id: reservaId_2,
            new_check_in: newCheckIn,
            new_check_out: newCheckOut
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('success');
        });
    
        cy.reload();
    
        cy.get('[href="/avaliar_reserva/76/"]').click();
        cy.get('[data-avaliacao="5"]').click(); // para alterar quantas estrelas da avaliação
        cy.wait(3000);
        cy.get('#avaliar').click();
        cy.get('.fa-solid').click();
        cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get('.rating').should('have.attr', 'data-rating', '5');
    });



    it('Tentar avaliar apenas com comentário', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('josue');
        cy.get('#name').type('josue');
        cy.get(':nth-child(5) > #email').type('josue@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa Muro Alto');
        cy.get('#descricao').type('Localizado na beira da praia em Muro Alto. Perfeito para famílias grandes e grupos de amigos.');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Estrada das Rochas, 465');
        cy.get('#cidade').type('Muro Alto');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('4');
        cy.get('#numero_de_banheiros').type('3');
        cy.get('#numero_de_hospedes').type('8');
        cy.get('#foto_principal').attachFile('imgs/casa_muro_alto.jpg');
        cy.wait(3000);
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('janaina');
        cy.get('#name').type('janaina');
        cy.get(':nth-child(5) > #email').type('janaina@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get(':nth-child(3) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get(':nth-child(8) > .btn').click();      
        cy.get('#data_check_in').type(checkInDate); 
        cy.get('#data_check_out').type(checkOutDate);
        cy.get('#numero_de_hospedes').type('1');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('#pills-debito-tab').click();
        cy.get('#pills-debito > :nth-child(2) > #cpf').type('188.510.226-28');
        cy.get('#numero_cartao_debito').type('1243254910112345');
        cy.get('#data_validade_debito').type('02/25');
        cy.get('#cvv_debito').type('123');
        cy.get('#pills-debito > #botao_reservar').click();
        cy.get('.active').click();
    
        cy.request('POST', '/api/update-reservation-dates/', {
            reserva_id: reservaId_3,
            new_check_in: newCheckIn,
            new_check_out: newCheckOut
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('success');
        });
    
        cy.reload();
    
        cy.get('[href="/avaliar_reserva/77/"]').click();
        cy.get('#comentario_avaliacao').type('Minha estadia na Casa Porto de Galinhas foi simplesmente maravilhosa! A casa é encantadora, com uma vista deslumbrante para o mar. Os quartos são espaçosos e bem decorados, proporcionando conforto e relaxamento');
        cy.wait(3000);
        cy.get('#avaliar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, selecione uma avaliação.');
        });
    });
});