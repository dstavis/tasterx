describe('prescription form', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3000/')
  })
  it('lets the user search for a show by name and displays show info when submitted', () => {
    cy.get("input").type("game of thrones").next().click()
    cy.wait(200)
    cy.get("p").first().contains("Game of Thrones")
  })

  it('lets the user write a message to the patient', () => {
    cy.get("textarea").first().type("message for patient")
    cy.get("textarea").first().should("have.value", "message for patient")
  })

  it('lets the user write a message to the patient', () => {
    cy.get("form").first().submit()
    
  })
})