const customTimeout = Cypress.env('timeout') ?? 30000

// needs to be fixed
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.Commands.add('elementExists', (selector) => {
  return cy.window().then($window => $window.document.querySelector(selector));
});

const doLoginAndPostSteps = () => {
  return cy.url().then(url => {
    cy.intercept('POST', '/api/authentication/login').as('loginRequest');

    cy.log(`Current URL in doLoginAndPostSteps: ${url}`);
    
    // Normal login flow only
    cy.log('Using normal login flow...');
    cy.get('#login-input', { timeout: customTimeout })
      .should('be.visible')
      .type(Cypress.env('user'));
    
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').contains('Log in').click();

    // If we have already run the password change, we need to use the new password to login vs the old one.
    cy.wait('@loginRequest').then((request) => {
     if (request.response.statusCode == 401) {
       cy.get('input[name="password"]').clear();
       cy.get('input[name="password"]').type(Cypress.env('new_password'));
       cy.get('button[type="submit"]').contains('Log in').click();
     }
    });

    cy.wait(2000);

    // Handle the default password change screen
    cy.url().then((currentURL) => {
      if (currentURL.includes('reset_password')) {
        cy.get('input[name="old_password"]').type(Cypress.env('password'));
        cy.get('input#create-password').type(Cypress.env('new_password'));
        cy.get('input#confirm-password').type(Cypress.env('new_password'));
        cy.get("button#change-password").click()
      }
    })

    cy.wait(3000);
    
    // Handle the "Later" button if it appears
    cy.get('body', { timeout: customTimeout }).then($body => {
      if ($body.find(':contains("Later")').length > 0) {
        cy.log('Found "Later" button, clicking...');
        cy.contains('Later', { timeout: customTimeout }).click();
      } else {
        cy.log('No "Later" button found, continuing...');
      }
    });
  });
};

describe('Basic Sonarqube', function() {
  it('Check Sonarqube is accessible', function() {
    // Initial visit with better error handling
    cy.visit(Cypress.env('url'), {
      timeout: customTimeout,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    });
    
    // Wait for initial page load and any redirects
    cy.get('body', { timeout: customTimeout }).should('be.visible')
    cy.wait(2000) // Give time for any redirects
    
    // Check if we've been redirected to maintenance page
    cy.url().then((currentUrl) => {
      cy.log(`Current URL: ${currentUrl}`);
      
      if (currentUrl.includes('/maintenance')) {
        cy.log('SonarQube redirected to maintenance page, starting setup...');
        
        // Navigate to setup page
        cy.visit(Cypress.env('url') + '/setup');
        cy.contains('span', 'Continue', { timeout: customTimeout }).should('be.visible').click();
        cy.get('button[id="start-migration"]', { timeout: customTimeout }).click();
        cy.contains('Database is up-to-date', { timeout: customTimeout });
        cy.contains('SonarQube is starting', { timeout: customTimeout });

        // Poll for login page after migration, refreshing if needed
        cy.log('Waiting for SonarQube to finish starting...');
        cy.wait(3000);
        cy.reload();
        cy.url({ timeout: 120000 }).should((url) => {
          expect(url).to.satisfy(u =>
            u.includes('/sessions/new') ||
            u.includes('/login') ||
            u.includes('/dashboard')
          );
        })
        .then(() => cy.get('body', { timeout: customTimeout }).should('be.visible'))
        .then(() => doLoginAndPostSteps());
      } else {
        return doLoginAndPostSteps();
      }
    })

    // Explicitly wait for the page to load
    cy.get('body', { timeout: customTimeout }).should('be.visible')
      
    // Verify popup is closed
    cy.get('[role="dialog"]').should('not.exist');

    //Wait for server to refresh with popup
    cy.wait(2000)
    
    //Check to see if we end up on the screen asking us to consent and if so perform consnet
    cy.url().then((currentURL) => {
      if (currentURL.includes('plugin_risk_consent')) {
        cy.contains("I understand the risk").click()
      }
    })
    
    cy.scrollTo('topRight', { duration: 500 })
    cy.get('button[aria-label="Account"]', { timeout: customTimeout })
      .should('be.visible')
      .click();
    cy.contains("My Account", { timeout: customTimeout }).click();
    cy.contains("Security", { timeout: customTimeout }).click();
    cy.wait(2000);

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
  });
});
