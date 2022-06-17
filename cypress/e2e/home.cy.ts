describe.skip('Theme Toggle', () => {
  const visit = (darkAppearance: boolean) =>
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.stub(win, 'matchMedia')
          .callThrough() // Call the real method for non-matched calls
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: darkAppearance,
            addEventListener: () => {}, // this makes it work, breaks the force set
          });
      },
    });

  it('toggles the theme to dark mode', () => {
    visit(false);
    cy.findByText(/dark mode/i).click();
    cy.get('html').should('have.class', 'dark');
  });
  it('toggles the theme to light mode', () => {
    visit(true);
    cy.findByText(/dark mode/i).click();
    cy.get('html').should('have.class', 'light');
  });
});

// TODO: Check for search box and region filter controls,
// and that the card links are present
describe('See all countries from the API on the homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has no accessibility violations', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('renders a series of cards', () => {
    cy.get('.card-container').should('not.be.empty');
  });

  it('contains the correct number of country cards', () => {
    cy.get('.card').should('have.length', 250);
  });
});

describe('Search for a country using a partial name', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has no accessibility violations', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('searches for `jam`', () => {
    cy.findByLabelText(/search for a country/i)
      .type('jam')
      .then(() => {
        cy.url().should('include', 'name=jam');
        cy.get('.card-container').should('not.be.empty');
        cy.get('.card').should('have.length', 1);
        cy.get('h2').should('have.text', 'Jamaica');
      });
  });
});

describe('When choosing a region', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // TODO: Test all regions
  it('should filter the cards by the region', () => {
    cy.findByLabelText(/filter by region/i).click();
    cy.get('[data-label=Polar]')
      .click()
      .then(() => {
        cy.url().should('include', 'region=polar');
        cy.get('.card-container').should('not.be.empty');
        cy.get('.card').should('have.length', 1);
        cy.get('h2').should('have.text', 'Antarctica');
      });
  });
});
