const customTimeout = Cypress.env('timeout') ?? 10000

// needs to be fixed
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
describe('Basic Sonarqube', function () {
  it('Check Sonarqube is accessible', function () {
    cy.viewport(1920, 1080)

    // Avoids needing to dismiss the SonarLint ad
    cy.intercept('GET', '/api/users/current', (req) => {
      req.continue((res) => {
        if (res.statusCode == 200) {
          expect(res.body).to.have.property('dismissedNotices')
          res.body.dismissedNotices.sonarlintAd = true
        }
      })
    })

    cy.visit(Cypress.env('url'))
    cy.get('body').then(($body) => {
      if (
        $body.find('h1[class="css-6qanlr"]').length > 0 &&
        $body.find('h1:contains("SonarQube is under maintenance")').length > 0
      ) {
        cy.visit(Cypress.env('url') + '/setup')
        cy.get('button[id="start-migration"]', {
          timeout: customTimeout,
        }).click()
        cy.contains('Database is up-to-date', { timeout: customTimeout })
        cy.contains('SonarQube is starting', { timeout: customTimeout })
      }
    })

    // Explicitly wait for the page to load
    cy.get('body', { timeout: customTimeout }).should('be.visible')

    // Explicitly wait for the input to load then Login 
    // and wait for authentication call to complete before moving on
    cy.get('input[name="login"]', { timeout: customTimeout * 30 })
      .should('be.visible')
      .type(Cypress.env('user'))
    cy.get('input[name="password"]').type(Cypress.env('password'))
    cy.intercept('POST', '**/api/authentication/login').as('validSession')
    cy.get('button[type="submit"]').contains('Log in').click()
    cy.wait('@validSession').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })

    cy.visit(Cypress.env('url') + '/admin/plugin_risk_consent')
    cy.contains('I understand the risk').click()

    // Visit account security to create a token
    cy.visit(Cypress.env('url') + '/account/security')
    cy.get('input[placeholder="Enter Token Name"]').type(
      Math.random().toString(36).substring(8)
    )

    // Click token type dropdown
    cy.get('input#token-select-type')
      .should('have.attr', 'aria-expanded', 'false')
      .click({ force: true })

    // Ensure the dropdown is expanded
    cy.get('input#token-select-type').should(
      'have.attr',
      'aria-expanded',
      'true',
      { timeout: customTimeout }
    )

    // Select "User Token" from the dropdown options
    cy.contains('div.sw-flex.sw-items-center.sw-gap-1', 'User Token', {
      timeout: customTimeout,
    })
      .should('be.visible')
      .click()

    // Verify that "User Token" is displayed in the value container
    cy.get('div.react-select__single-value').should(
      'contain.text',
      'User Token'
    )

    // Ensure the dropdown is collapsed
    cy.get('input#token-select-type').should(
      'have.attr',
      'aria-expanded',
      'false',
      { timeout: customTimeout }
    )

    // Wait for the "Generate" button to become enabled and click it
    cy.get('button.it__generate-token', { timeout: customTimeout })
      .should('not.be.disabled')
      .click({ force: true })
  })
})
