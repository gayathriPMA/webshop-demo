Cypress.Commands.add('register', (user) => {
    cy.visit('/');
    cy.get('.ico-register').click()
    cy.url().should('include', '/register');
    cy.get('h1').should('have.text', 'Register');
    cy.get('#gender-female').click().should('be.checked');
    cy.get('#FirstName').type(user.firstName);
    cy.get('#LastName').type(user.lastName);
    cy.get('#Email').type(user.email);
    cy.get('#Password').type(user.password);
    cy.get('#ConfirmPassword').type(user.password);
    cy.get('#register-button').click();
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('input[value="Log in"]').click();
});
