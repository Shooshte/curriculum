/// <reference types="cypress"/>

it("Blog page should show the under construction notification and back button", () => {
  // first visit the home page in order to have something to return to
  cy.visit("/");
  cy.visit("/blog");
  cy.contains("Recent blog posts");
});

export {};
