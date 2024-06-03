describe('excluir espaco', () => {
    it('excluir_desistir', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('Yzara');
        cy.get('#name').type('Yzara');
        cy.get(':nth-child(5) > #email').type('yzara@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Apartamento Boa Viagem');
        cy.get('#descricao').type('Situado a 30 metros da Praia da Boa Viagem. Oferece piscina ao ar livre e Wi-Fi gratuito. Próximo ao Shopping Center Guararapes e ao Consulado dos EUA. Possui TV a cabo e ar-condicionado');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Rua Boa viagem, 123');
        cy.get('#cidade').type('Recife');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('3');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('6');
        cy.get('#foto_principal').attachFile('imgs/apartamento_boa_viagem.jpg');
        cy.get('.container > form > .btn').click();
        cy.get('.payment-form > #botao_reservar').click();
        cy.get('.active').click();
        cy.get('.card-body > form > .btn').click();
        cy.get('.col').should('not.exist')
    })
    it('excluir_definitivo', () => {
        cy.visit('/');
        cy.get('[href="/minhas_reservas/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('Laura');
        cy.get('#name').type('Laura');
        cy.get(':nth-child(5) > #email').type('laura@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Casa Fernando de Noronha');
        cy.get('#descricao').type('Esta charmosa casa à beira do mar oferece 3 quartos, 2 banheiros, uma sala de estar acolhedora com lareira e uma cozinha moderna. Com um grande quintal e um deck com vista para o mar, é o refúgio perfeito para quem ama a natureza e tranquilidade. A casa é ideal para famílias ou casais que desejam desfrutar de atividades ao ar livre como pesca, caminhadas e piqueniques. Localizada em uma área serena, oferece uma escapada relaxante do agito da cidade.');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Rua das lagoas, 123');
        cy.get('#cidade').type('Fernando de Norannha');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('3');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('6');
        cy.get('#foto_principal').attachFile('imgs/casa_fernando_de_noranha.jpg');
        cy.get('.container > form > .btn').click();
        cy.get('.payment-form > #botao_reservar').click();
        cy.get('.active').click();
        cy.get('.card-body > form > .btn').click();
        cy.get('.col').should('not.exist')
    })
})