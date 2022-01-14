/// <reference types="cypress"/>

describe("Navigation bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render the navigation bar nav component", () => {
    cy.get('[data-testid="navigation-bar"]');
  });

  it("should contain a working CV link", () => {
    cy.get('[data-testid="navigation-bar"] a[href="/"]').contains("CV").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should contain a working Blog link", () => {
    cy.get('[data-testid="navigation-bar"] a[href="/blog"]')
      .contains("Blog")
      .click();
    cy.url().should("eq", "http://localhost:3000/blog");
  });
});
