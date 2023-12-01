// describe('logs a user', () => {
//   it('passes', () => {
//     cy.visit('/login');

//     cy.get('[data-cy="email"]').type('janeDoe@yopmail.com');
//     cy.get('[data-cy="password"]').type('12345678');

//     cy.get('[data-cy="login_user_btn"]').click();

//     cy.get('[data-cy="logged-in-success-popup"]');
//     cy.location('pathname').should('eq', '/user');
//   });
    
//     it('fails', () => {
//       cy.visit('/login');

//       cy.get('[data-cy="email"]').type('janeDoe@yopmal.com');
//       cy.get('[data-cy="password"]').type('1234567');

//       cy.get('[data-cy="login_user_btn"]').click();

//       cy.get('[data-cy="logged-in-error-popup"]');
   
//     });

//     it('passes admin', () => {
//       cy.visit('/login');

//       cy.get('[data-cy="email"]').type('9superbikes@gmail.com');
//       cy.get('[data-cy="password"]').type('12345678');

//       cy.get('[data-cy="login_user_btn"]').click();

//       cy.get('[data-cy="logged-in-success-popup"]');
//       cy.location('pathname').should('eq', '/adminhome');
//     });
// });

describe('forgot password', () => {
  it("forget password",() => {
    cy.visit('/login');
    cy.get('[data-cy="forgotpassword"]').click();
    // cy.visit('/password');
    cy.get('[data-cy="email"]').type('janeDoe@yopmail.com');
    cy.get('[data-cy="resetPassword"]').click();
  })
})
