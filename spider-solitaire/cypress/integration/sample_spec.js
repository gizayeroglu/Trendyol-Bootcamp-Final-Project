describe('Home page tests', () => {

    it('should header with the text Reversed Spider Solitaire', () => {
        cy.visit('https://spider-solitaire-gizay-eroglu.herokuapp.com/')
        .url().should('contain', 'spider-solitaire');

        cy.contains('Reversed Spider Solitaire');
    })

    it('should redirect to game page when the play game card div clicked', () => {

        cy.get('.play-game-card').click()
        cy.location('pathname').should('equal', '/play');

    })
})

describe('Game page tests', () => {

    it('should have score and time text on the top of the page', () => {

        cy.contains('Score');
        cy.contains('Time');
    })

    it('should redirect to home page when the home button clicked', () => {

        cy.get('.go-back-button').click({ force: true })
        cy.location('pathname').should('equal', '/');
    })
})

