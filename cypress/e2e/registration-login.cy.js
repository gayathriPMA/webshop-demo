import userData from '../fixtures/userData.json';

describe('User Registration and Login', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });
    it('should register a new user successfully', () => {
        cy.register(userData.validUser);
        cy.get('.validation-summary-errors > ul > li').should('contain', 'Your registration completed');
    });
    it('should not allow duplicate registration', () => {
        cy.register(userData.validUser);
        cy.get('.validation-summary-errors > ul > li')
        .invoke('text') 
        .then((text) => text.trim()) 
        .should('eq', 'The specified email already exists'); 
    });
    it('should login with valid credentials', () => {
        cy.login(userData.validUser.email, userData.validUser.password);
        cy.get('.account').should('contain', userData.validUser.email);
    });
    it('should fail login with invalid credentials', () => {
        cy.login(userData.invalidUser.email, userData.invalidUser.password);
        cy.get('.validation-summary-errors').should('contain', 'Login was unsuccessful');
    });
    it('should login with valid credentials and validate session persistence', () => {
        cy.login(userData.validUser.email, userData.validUser.password);
        cy.get('.account').should('contain', userData.validUser.email);
        cy.reload();
        cy.get('.account').should('contain', userData.validUser.email);
    });
    it('should fail login with incorrect password', () => {
        cy.login(userData.validUser.email, 'wrongPassword');
        cy.get('.validation-summary-errors').should('contain', 'Login was unsuccessful');
    });
    it('should fail login with non-existent email', () => {
        cy.login('gayu@gmail.com', userData.validUser.password);
        cy.get('.validation-summary-errors').should('contain', 'Login was unsuccessful');
    });
    it('should not allow login with empty credentials', () => {
        cy.login(' ', ' ');
        cy.get('.message-error .validation-summary-errors li') 
  .invoke('text') 
  .then((text) => text.trim()) 
  .should('eq', 'No customer account found');     
});
});
