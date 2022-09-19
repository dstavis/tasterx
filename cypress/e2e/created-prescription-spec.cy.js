const tvmazeSearchStub = JSON.stringify({
  "id": 82,
  "name": "Game of Thrones",
  "officialSite": "http://www.hbo.com/game-of-thrones",
  "image": {
    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg",
    "original": "https://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg"
  }
});

const ourAPIStub = JSON.stringify({
  "prescription": {
    "id": "1",
    "showID": "82",
    "message": "message for patient"
  }
});

describe('Prescription component', () => {
  beforeEach(()=>{
    cy.intercept('https://tasterx-api.herokuapp.com/prescriptions/1', ourAPIStub);
    cy.intercept('https://api.tvmaze.com/shows/82', tvmazeSearchStub);
  });
  
  it('loads the page', () => {
    cy.visit('http://localhost:3000/prescription/1');
    cy.wait(200);
  });

  it('shows a created prescription', () => {
    cy.url().should('include', '/prescription/1');
    cy.get('.script-container').contains('Official TV show website');
    cy.get('[class*=script-show-name]').contains('Game of Thrones');
    cy.get('a').should('have.attr', 'href');
    cy.get('[class*=show-link]').should('have.attr', 'href', 'http://www.hbo.com/game-of-thrones');
    cy.get('[class*=poster-img]').should('have.attr', 'src', 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg');
    cy.get('[class*=bottom-container]').contains('message for patient');
  });

  it('should allow user to go back to main by clicking on the TasteRx logo', () => {
    cy.get('[alt="title logo"]').click();
    cy.url().should('not.include', '/prescription/1');
  });

  it('should allow user to go back to main by clicking write a new prescription', () => {
    cy.visit('http://localhost:3000/prescription/1');
    cy.wait(200);
    cy.url().should('include', '/prescription/1');
    cy.get('.script-container').contains('Official TV show website');
    cy.get('[class*=script-show-name]').contains('Game of Thrones');
    cy.get('a').should('have.attr', 'href');
    cy.get('[class*=show-link]').should('have.attr', 'href', 'http://www.hbo.com/game-of-thrones');
    cy.get('[class*=poster-img]').should('have.attr', 'src', 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg');
    cy.get('[class*=bottom-container]').contains('message for patient');
    cy.get('[class*=make-new-script]').click();
    cy.url().should('not.include', '/prescription/1');
  });
  
});