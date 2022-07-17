/// <reference types="cypress" />

describe('When clicking on a country card', () => {
  const countryName = 'Belgium';
  const countryCode = 'BEL';
  const borderCountryCode = 'FRA';
  const borderCountryName = 'France';

  it('should show more detailed information on a separate page', () => {
    cy.visit('/');
    cy.findByRole('link', { name: countryName })
      .should('exist')
      .and('have.attr', 'href', `/country/${countryCode}`)
      .click();
    cy.location('pathname').should('equal', `/country/${countryCode}`);
    cy.get('.country-name').should('have.text', countryName);
  });

  it('should allow you to navigate to the border countries', () => {
    cy.visit(`/country/${countryCode}`);
    cy.findByRole('link', { name: borderCountryName })
      .should('exist')
      .and('have.attr', 'href', `/country/${borderCountryCode}`)
      .click();
    cy.location('pathname').should('equal', `/country/${borderCountryCode}`);
    cy.get('.country-name').should('have.text', borderCountryName);
  });
});
