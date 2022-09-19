import gameOfThrones from '../fixtures/tvmaze.json';

describe('Error handling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should provide error message when show is not found', () => {
    cy.intercept('GET', 'https://api.tvmaze.com/singlesearch/shows?q=fhfhfhf', {statusCode: 404})
      .get('.search-input')
      .type('fhfhfhf')
      .get('.search-button')
      .click();

    cy.get('.error-message')
      .contains('Error: Sorry, looks like we can\'t find this show');
  });

  it('Should provide error message when prescription can not be posted', () => {
    cy.intercept('POST', 'https://tasterx-api.herokuapp.com/prescriptions/', {statusCode: 500})
      .intercept('GET', 'https://www.tvmaze.com/shows/82/game-of-thrones', gameOfThrones)
      .get('.search-input')
      .type('game of thrones')
      .get('.search-button')
      .click()
      .get('.text-area')
      .type('Heck this aint gunna work.')
      .get('.signature-input')
      .type('Dr. Poo')
      .get('.submit-button')
      .click();

    cy.get('.error-message')
      .contains('Error: Sorry, there was an error posting your information.');
  });
    
  it('Should navigate to prescription not found page if no prescription is found', () => {
    cy.intercept('GET', 'https://tasterx-api.herokuapp.com/prescriptions/1000', {status: 404})
      .visit('http://localhost:3000/prescription/1000');
        
    cy.get('.message')
      .contains('Oops... the requested prescription is not on file. Check the URL or contact your taste physician.')
      .get('.make-new-script')
      .click()
      .location('pathname').should('eq', '/');
  });

  it('Should have 404 page for "garbage" URL', () => {
    cy.visit('http://localhost:3000/gramcracker')
      .get('.not-found-message')
      .contains('404: Not found')
      .get('.make-new-script')
      .click()
      .location('pathname').should('eq', '/');
  });
  
});
