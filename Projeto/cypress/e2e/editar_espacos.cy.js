describe('editar espaco', () => {
    it('Editar espaço com sucesso', () => {
        cy.visit('/');
        cy.get('[href="/meus_espacos/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('marilu');
        cy.get('#name').type('marilu');
        cy.get(':nth-child(5) > #email').type('marilu@123.com');
        cy.get('#password').type('123');
        cy.wait(3000);
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Hotel Casas Amarelas');
        cy.get('#descricao').type('Casas amarela confortáveis na praia, ideal para casais em viagens românticas ou famílias pequenas.');
        cy.get('#preco_por_noite').type('500');
        cy.get('#endereco').type('Praia dos Caranguejos');
        cy.get('#cidade').type('Fernando de Noronha');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('2');
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('#foto_principal').attachFile('imgs/casas_amarelas.jpg');
        cy.get('.container > form > .btn').click();
        cy.wait(3000);
    })
})