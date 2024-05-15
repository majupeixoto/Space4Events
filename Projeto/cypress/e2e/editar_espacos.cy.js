describe('editar espaco', () => {
    it('Cadastrar espaço', () => {
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
        cy.get('[href="/meus_espacos/"]').click();
        cy.get('.col').should('exist');
    })
    it('Editar espaço', () => {
        cy.visit('/');
        cy.get('[href="/meus_espacos/"]').click();
        cy.get(':nth-child(4) > input').type('marilu')
        cy.get(':nth-child(5) > input').type('123')
        cy.get('.btn_login').click()
        cy.get('[href="/meus_espacos/"]').click();
        cy.get('.btn-outline-primary').click();
        cy.get('#nome').clear();
        cy.get('#nome').type('Casa Tradicional');
        cy.get('#descricao').clear();
        cy.get('#descricao').type('Casa tradicional estilo colônial.');
        cy.get('#preco_por_noite').clear();
        cy.get('#preco_por_noite').type('600');
        cy.get('#endereco').clear();
        cy.get('#endereco').type('Rua das Oliveiras, 78');
        cy.get('#cidade').clear();
        cy.get('#cidade').type('Lisboa');
        cy.get('#estado').clear();
        cy.get('#estado').type('Area Metropolitana de Lisboa');
        cy.get('#pais').clear();
        cy.get('#pais').type('Portugal');
        cy.get('#numero_de_quartos').clear();
        cy.get('#numero_de_quartos').type('4');
        cy.get('#numero_de_banheiros').clear();
        cy.get('#numero_de_banheiros').type('2');
        cy.get('#numero_de_hospedes').clear();
        cy.get('#numero_de_hospedes').type('6');
        cy.get('#foto_principal').attachFile('imgs/casa_portugal.jpg');
        cy.get('[enctype="multipart/form-data"] > .btn').click();
        cy.wait(3000);
        cy.get('[href="/meus_espacos/"]').click();
        cy.get('.col').should('exist');
    })
})