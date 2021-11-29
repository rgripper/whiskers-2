/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.intercept('/companies', { fixture: 'companies.json' })
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  const getSearchInput = () => cy.get('input[placeholder="Type company name..."]')
  const getSearchResultsContainer = () => cy.get('[data-testid="search-results"]')

  it('doesnt search with less than 3 characters', () => {
    getSearchInput().type('Zo');
    cy.contains('Type at least 3 characters.').should('exist')
  })

  it('searches by company name', () => {
    const searchText = 'Zoo'
    getSearchInput().type(searchText);

    getSearchResultsContainer()
      .get('[data-testid="company-name"]')
      .should((companyName) => expect(companyName).to.contain(searchText))
  })
})
