// ESSE TESTE VALIDA FAVORITAR, DESFAVORITAR E LISTAR OS FAVORITADOS

describe('Teste de Favoritar', () => {
    it('Favoritado com sucesso', () => {
        cy.visit('/');
        cy.get('[href="/favoritos/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('Alice');
        cy.get('#name').type('Maria Alice');
        cy.get(':nth-child(5) > #email').type('alice@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Chalé Floresta');
        cy.get('#descricao').type('Localizado no alto de um relevo. Perfeito para momentos românticos com seu par ou famílias nucleares.');
        cy.get('#preco_por_noite').type('800');
        cy.get('#endereco').type('Estrada Alto Relevo, 58');
        cy.get('#cidade').type('Bonito');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('2');
        cy.get('#numero_de_banheiros').type('1');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('#foto_principal').attachFile('imgs/chale_Floresta.jpg');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/favoritos/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('madoka');
        cy.get('#name').type('Madoka Magica');
        cy.get(':nth-child(5) > #email').type('madoka@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(1) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get('#favoritar').click();
        cy.get('[href="/favoritos/"]').click();
        cy.get('.col').should('exist');
    })
    it('Desfavoritar com sucesso', ()=> {
        cy.visit('/');
        cy.get('[href="/favoritos/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('Leticia');
        cy.get('#name').type('Leticia Maria');
        cy.get(':nth-child(5) > #email').type('leticia@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get('[aria-current="page"]').click();
        cy.get('#nome').type('Apartamento José');
        cy.get('#descricao').type('Localizado no centro da cidade de Bonito, confortável e elegante.');
        cy.get('#preco_por_noite').type('800');
        cy.get('#endereco').type('Estrada do Girassol, 58');
        cy.get('#cidade').type('Bonito');
        cy.get('#estado').type('Pernambuco');
        cy.get('#pais').type('Brasil');
        cy.get('#numero_de_quartos').type('2');
        cy.get('#numero_de_banheiros').type('1');
        cy.get('#numero_de_hospedes').type('4');
        cy.get('#foto_principal').attachFile('imgs/apartamento_jose.jpg');
        cy.get('.container > form > .btn').click();
        cy.get('#sair').click();
        cy.get('[href="/favoritos/"]').click();
        cy.get('.forget').click();
        cy.get('#username').type('Sueli');
        cy.get('#name').type('Sueli Magalhães');
        cy.get(':nth-child(5) > #email').type('sueli@123.com');
        cy.get('#password').type('123');
        cy.get('.btn_login').click();
        cy.get(':nth-child(2) > .card > .card-body > .d-flex > .btn-group > #visualizar_detalhes').click();
        cy.get('#favoritar').click();
        cy.get('[href="/favoritos/"]').click();
        cy.get('#desfavoritar').click();
        cy.get('[href="/favoritos/"]').click();
        cy.get('.corpo > .row > :nth-child(0)').should('not.exist');
    })
})