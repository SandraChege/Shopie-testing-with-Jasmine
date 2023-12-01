describe('admin functionality', () => {
  beforeEach(() => {
    cy.loginAdmin();
  });
  it('search for a product', () => {
    const searchterm = 'wine';
    cy.get('[data-cy = "searchproduct"]').type(searchterm);
    cy.get('[data-cy = "product"]').should('have.length.greaterThan', 0);
  });

  it('views a product', () => {
    cy.get('[data-cy="viewProduct"]').first().click();
    cy.get('[data-cy="hideProduct"]').first().click();
  });

    it('successfully edit product', () => {
      cy.get('[data-cy="updateProduct"]').first().click();
      cy.get('[data-cy="updatedProducttitle"]').type('Old Monk Rum');
      cy.get('[data-cy="updatedProductdescription"]').type(
        'Old monk rum is a Indian rum classified as Dark rum. It has 42% ABV (alcohol by volume). It is offered in 750 ml at Drinks Vine online liquor store. We offer you affordable prices and regular offers coupled with free delivery in Nairobi and environs.'
      );
      cy.get('[data-cy="updatedProductprice"]').type('1800');
      cy.get('[data-cy="updatedProductcategory"]').type('Rum');
      cy.get('[data-cy="updatedProductstock"]').type('5');
      cy.get('[data-cy="saveChanges"]').click();
    });

    
    it('fails to edit product', () => {
      cy.get('[data-cy="updateProduct"]').first().click();
      cy.get('[data-cy="updatedProducttitle"]').type('Old Monk Rum');
      cy.get('[data-cy="updatedProductdescription"]').type(
        'Old monk rum is a Indian rum classified as Dark rum. It has 42% ABV (alcohol by volume). It is offered in 750 ml at Drinks Vine online liquor store. We offer you affordable prices and regular offers coupled with free delivery in Nairobi and environs.'
      );
      cy.get('[data-cy="updatedProductprice"]').type('d');
      cy.get('[data-cy="updatedProductcategory"]').type('Rum');
      cy.get('[data-cy="updatedProductstock"]').type('r');
      cy.get('[data-cy="saveChanges"]').click();
    });

    it('deletes a product', () => {
      cy.get('[data-cy="deleteProduct"]').first().click();
    });
});

// describe('updates admin profile', () => {
//   beforeEach(() => {
//     cy.loginAdmin();
//     cy.visit('/adminprofile');
//   });
//   it('updates admin profile', () => {
//     cy.visit('/adminprofile');

//     cy.get('[data-cy="userName"]').type('Jane Doe from FBI');
//     cy.get('[data-cy="email"]').type('superbikesgmail.com');
//     cy.get('[data-cy="phone_no"]').type('0734343434');

//     cy.get('[data-cy="updateProfile"]').click();
//   });

//   it('fails to updates admin profile', () => {
//     cy.visit('/adminprofile');

//     cy.get('[data-cy="userName"]').type('Jane Doe from FBI');
//     cy.get('[data-cy="email"]').type('superbikegmail.com');
//     cy.get('[data-cy="phone_no"]').type('0734343434');

//     cy.get('[data-cy="updateProfile"]').click();
//   });
// });


describe('admin user functionality', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/adminusers');
  });
  it('search for a user', () => {
    const searchterm = 'p';
    cy.get('[data-cy="searchuser"]').type(searchterm);
    cy.get('[data-cy="user"]').should('have.length.greaterThan', 0);
  });
  it('deletes a user', () => {
    cy.get('[data-cy="deleteUser"]').first().click();
  });
});

  describe('add product', () => {
    beforeEach(() => {
        cy.loginAdmin();
        cy.visit('/adminaddproduct');
    });
    it('admin adds a product', () => {
      cy.get('[data-cy="image"]').type('https://ik.imagekit.io/cprvr2lhot/veuve-cliquot.jpeg');
      cy.get('[data-cy="title"]').type('Veuve cliquot brut');
      cy.get('[data-cy="price"]').type('13999');
      cy.get('[data-cy="stock"]').type('2');
      cy.get('[data-cy="category"]').type('champagne');
      cy.get('[data-cy="description"]').type('Veuve Cliquot is classified as brut-champagne and is produced in France. veuve cliquot brut has 12% ABV (Alcohol By Volume). This champagne comes in 750 ml which cost Ksh 13999.');
      cy.get('[data-cy="addNewProduct"]').click();
    });

    it('admin fails to adds a product', () => {
      cy.get('[data-cy="image"]').type('https://ik.imagekit.io/cprvr2lhot/veuve-cliquot.jpeg');
      cy.get('[data-cy="title"]').type('Veuve cliquot brut');
      cy.get('[data-cy="price"]').type('t');
      cy.get('[data-cy="stock"]').type('ps');
      cy.get('[data-cy="category"]').type('champagne');
      cy.get('[data-cy="description"]').type('Veuve Cliquot is classified as brut-champagne and is produced in France. veuve cliquot brut has 12% ABV (Alcohol By Volume). This champagne comes in 750 ml which cost Ksh 13999.');
      cy.get('[data-cy="addNewProduct"]').click();
    });
})
