describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('MyTestSuite', () => {
  it('Verify Title of the page!', () => {

    cy.visit('localhost:4200')
    cy.title().should('eq', 'Social Hub');
  })
})

describe('MyTestSuite', () => {
  it('Verify Title of the page!', () => {

    cy.visit('localhost:4200');
    cy.get('div.mat-toolbar-row');
    // cy.click('user-name');
    // // cy.click('mat-button-wrapper');
    // cy.title().should('eq', 'Social Hub');
  })
})
