
const customTimeout = Cypress.env('timeout') ?? 10000

// needs to be fixed
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
describe('Basic Sonarqube', function() {
  it('Check Sonarqube is accessible', function() {
    cy.visit(Cypress.env('url'))
    cy.get("body").then($body => {
      if ($body.find('h1[class="maintenance-title"]').length > 0) {
        cy.visit(Cypress.env('url_setup'))
        cy.get('button[id="start-migration"]', {timeout: customTimeout}).click()
        cy.contains('Database is up-to-date', {timeout: customTimeout})
        cy.contains('SonarQube is starting', {timeout: customTimeout})
      }
    })
    // Explicitly wait for the page to load
    cy.get('body', { timeout: customTimeout }).should('be.visible')
    //Login and wait for authentication call to complete before moving on
    cy.get('input[name="login"]', { timeout: customTimeout * 3 }).type(Cypress.env('user'))
    cy.get('input[name="password"]').type(Cypress.env('password'))
    cy.intercept('POST', '**/api/authentication/login').as('validSession')
    cy.get('button[type="submit"]').contains("Log in").click()
    cy.wait('@validSession').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })

    //Wait for server to refresh with popup
    cy.wait(1000)

    //Check to see if we end up on the screen asking us to consent and if so perform consnet
    cy.url().then((currentURL) => {
      if (currentURL.includes('plugin_risk_consent')) {
        cy.contains("I understand the risk").click()
      }
    })
        // Dismiss "Learn more" or "Dismiss" button if present
    cy.get('button').then($buttons => {
      if ($buttons.text().includes('Learn more')) {
        cy.contains('Learn more').click();
      } else if ($buttons.text().includes('Dismiss')) {
        cy.contains('Dismiss').click();
      }
    });
    cy.scrollTo('topRight')
    cy.wait(2000)
    cy.get('button#userAccountMenuDropdown-trigger', { timeout: customTimeout })
      .should('be.visible')
      .click();
    cy.wait(2000);
    cy.contains("My Account").click();
    cy.wait(2000);
    cy.contains("Security").click();
    cy.wait(2000);

    cy.get('input[placeholder="Enter Token Name"]').type(Math.random().toString(36).substring(8));

  })
})

