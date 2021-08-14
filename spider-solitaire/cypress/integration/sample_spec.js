describe('home page tests', () => {

    it('should page have header text', () => {
        cy.visit('https://spider-solitaire-gizay-eroglu.herokuapp.com');

        cy.contains('Reversed Spider Solitaire');
    })
})
