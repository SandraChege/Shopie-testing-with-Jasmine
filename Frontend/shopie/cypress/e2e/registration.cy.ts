describe('registers a user', () => {
  it('passes', () => {
    cy.visit('/register');

    cy.get('[data-cy="userName"]').type('jane Doe')
    cy.get('[data-cy="userEmail"]').type('janeDoe@yopmail.com');
    cy.get('[data-cy="userphone"]').type('0737492000');
    cy.get('[data-cy="userPassword"]').type('12345678');
    
    cy.get('[data-cy="register_user_btn"]').click();

    cy.get('[data-cy="registered-success-popup"]');
    cy.location("pathname").should('eq', '/login')
  });
});
