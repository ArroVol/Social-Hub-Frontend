describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('MyTestSuite', () => {
  it('Verify Title of the page!', () => {

    cy.visit('localhost:4200')
    cy.title().should('eq', '');
  })
})
