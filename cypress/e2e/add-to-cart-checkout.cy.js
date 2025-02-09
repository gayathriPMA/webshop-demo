import userData from '../fixtures/userData.json';

describe('Add Items to Cart and Checkout', () => {
    beforeEach(() => {
        cy.login(userData.validUser.email, userData.validUser.password);
        cy.visit('/');
    });
    it('should add items from different categories to the cart', () => {
        cy.visit('/');
        cy.get('a[href="/books"]').first().click();
        cy.get('.product-box-add-to-cart-button').first().click();

        cy.get('a[href="/"]').first().click();
        cy.get('.product-box-add-to-cart-button').eq(1).click();

        cy.get('#topcartlink').click();
        cy.get('.cart-item-row').should('have.length.at.least', 2);
    });
    it('should update item quantity in cart and verify subtotal calculation', () => {
        cy.get('#topcartlink').click();
        cy.get('.cart-item-row').first().find('.qty-input').clear().type('2');
        cy.get('.update-cart-button').click();
        cy.get('.cart-item-row').first().find('.qty-input').should('have.value', '2');
        cy.get('.product-price').invoke('text').then(parseFloat).should('be.greaterThan', 0);
    });
    it('should proceed to checkout successfully and validate order summary', () => {
        cy.get('#topcartlink').click();
        cy.get('#termsofservice').check()
        cy.get('.checkout-button').click();
        cy.get('.checkout-page').should('exist');
        cy.get('#checkout-step-billing').should('exist')
    });
    it('should remove an item from the cart and validate the cart updates', () => {
        cy.get('#topcartlink').click();
        cy.get('.cart-item-row').each(($el) => {
            cy.wrap($el).find('.qty-input').clear().type('0');
        });
        cy.get('.update-cart-button').click()
        cy.get('.order-summary-content')
            .invoke('text')
            .then((text) => text.trim())
            .should('eq', 'Your Shopping Cart is empty!');
    }); 
});
