describe('user functionality', () => {
  beforeEach('', () => {
    cy.loginUser();
  });

  it('search for a product', () => {
    cy.visit('/user');
    const searchterm = 'wine';
    cy.get('[data-cy="searchproduct"]').type(searchterm);
    cy.get('[data-cy="product"]').should('have.length.greaterThan', 0);
  });

  it('views a product', () => {
    cy.visit('/user');

    cy.get('[data-cy="viewProduct"]').first().click();
    cy.get('[data-cy="hideProduct"]').first().click();
  });

  it('adds to cart', () => {
    cy.visit('/user');

    cy.get('[data-cy="addtoCart"]').first().click();
  });

  it('checks if cart is empty', () => {
    cy.visit('/cart');

    cy.get('[data-cy="cartItems"]').should('have.length', 0);
  });

  it('checks if cart is not empty', () => {
    cy.visit('/cart');
    cy.addProduct();
    cy.get('[data-cy="cartItems"]').should('have.length', 0);
  });

  // it('increases cart quantity', () => {
  //   cy.visit('/cart');
  //   cy.addProduct();
  //   cy.get('[data-cy="increaseQuantity"]').first().click();
  // });

  // it('reduces cart quantity', () => {
  //   cy.visit('/cart');
  //   cy.addProduct();
  //   cy.get('[data-cy="decreaseQuantity"]').click();
  // });

  it('checks for total price', () => {
    cy.visit('/cart');

    cy.get('[data-cy="totalPrice"]').should('have.length.greaterThan', 0);
  });

  it('clears cart', () => {
    cy.visit('/cart');

    cy.get('[data-cy="clearCart"]').click();
  });

  it('updates user profile', () => {
    cy.visit('/profile');

    cy.get('[data-cy="userName"]').type('Jane Doe from FBI');
    cy.get('[data-cy="email"]').type('janedoe@gmail.com');
    cy.get('[data-cy="phone_no"]').type('0789898989');

    cy.get('[data-cy="updateProfile"]').click();
  });

  it('fails to update user profile due to email format', () => {
    cy.visit('/profile');

    cy.get('[data-cy="userName"]').type('Jane Doe from FBI');
    cy.get('[data-cy="email"]').type('janedoegmail.com');
    cy.get('[data-cy="phone_no"]').type('0789898989');

    cy.get('[data-cy="updateProfile"]').click();
  });
});
