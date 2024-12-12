/*
describe('FirmaEc-IESS', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost');
        login();
        logout();
    });

    function login(){
        cy.get('#username').type('ivan');
        cy.get('#password').type('ivan');
        cy.get('#kc-login').click(); 
    }

    function logout(){
        cy.get('.col-12 > .p-link').click();
        cy.get('.p-confirm-dialog-accept').click();
    };

    it('Iniciar Sesion', ()=>{
    });

    it('Entrar a menu',()=>{
        cy.get('.ng-trigger > .ng-tns-c183498709-2 > .p-ripple').click();
    })

    it('Proceso de FirmaEC-IESS', () => {
        Cypress._.times(10, () => { 
            cy.get('.ng-trigger > .ng-tns-c183498709-2 > .p-ripple').click();
            cy.get('#cedula').type('1719929321');
            cy.get('.p-fileupload-choose').click();
            cy.get('input[type="file"]').selectFile('cypress/fixtures/documento_prueba.pdf', { force: true });
        });
    });
    
});
*/