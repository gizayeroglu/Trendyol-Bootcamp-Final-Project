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

    it('should have game outputs on the top of the page which includes time, score, home, highest score, undo last move and restart', () => {
        cy.contains('Score');
        cy.contains('Time');
        cy.contains('Highest Score');
        cy.contains('Home');
        cy.contains('Undo Last Move');
        cy.contains('Restart');
    })

    it('should have visible game area container which display style is grid', () => {
       cy.get('.game-area-container')
       .should('be.visible')
       .should('have.css', 'display')
       .and('match', /grid/); 
    });

    it('should have visible card holder which display style is flex', () => {
       cy.get('.game-area-container').children().first()
       .should('be.visible')
       .should('have.css', 'display')
       .and('match', /flex/);
    });

    it('should have visible last card of the holder and the last card have background color because it should be a card-front', () => {
       cy.get('.game-area-container').children().first().children().last()
       .should('be.visible')
       .should('have.css', 'background-color')
    });

    it('should have visible first card of the holder and first card have background URL because it should be a card-back', () => {
       cy.get('.game-area-container').children().first().children().first()
       .should('be.visible')
       .should('have.css', 'background')
       .and('match', /url()/);
    });

    it('should have game area top containers at the top which display style is flex', () => {
       cy.get('.game-area-top-containers')
       .should('be.visible')
       .should('have.css', 'display')
       .and('match', /flex/);
    });

    it('should have card distributor as the last child of the game-area-top-containers and display style should be grid', () => {
       cy.get('.game-area-top-containers').children().last()
       .should('be.visible')
       .should('have.css', 'display')
       .and('match', /grid/);
    });

    it('should redirect to home page when the home button clicked', () => {
        cy.get('.go-back-button').click({ force: true })
        cy.location('pathname').should('equal', '/');
    })
})

