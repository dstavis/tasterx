const tvmazeSearchStub = JSON.stringify({
  "id": 82,
  "name": "Game of Thrones",
  "officialSite": "http://www.hbo.com/game-of-thrones",
  "image": {
    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg",
    "original": "https://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg"
  }
})

const ourStub = JSON.stringify({
  "prescription": {
    "id": "1",
    "show_id": "82",
    "message": "wow"
  }
})

const tvmazeIndividualStub = tvmazeSearchStub

beforeEach(()=>{
  cy.intercept("https://api.tvmaze.com/singlesearch/shows?q=game+of+thrones", tvmazeSearchStub)
  cy.intercept("POST", "https://tasterx.herokuapp.com/prescriptions/", ourStub)
  cy.intercept("https://api.tvmaze.com/shows/82", tvmazeIndividualStub)

})

describe('prescription form', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3000/')
  })
  it('lets the user search for a show by name and displays show info when submitted', () => {
    cy.get("input").type("game of thrones").next().click()
    cy.wait(200)
    cy.get("p.show-name").first().contains("Game of Thrones")
  })

  it('lets the user write a message to the patient', () => {
    cy.get("textarea").first().type("message for patient")
    cy.get("textarea").first().should("have.value", "message for patient")
  })

  it('redirects to the correct page when submitted', () => {
    cy.get(".submit-button").first().click()
    cy.url().should("include", "/prescription/1")
  })
})