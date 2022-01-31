/// <reference types="cypress"/>

describe("Navigation bar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the navigation bar nav component", () => {
    cy.get('[data-testid="navigation-bar"]');
  });

  it("should contain a working CV link", () => {
    cy.get('[data-testid="navigation-bar"] a[href="/curriculum"]')
      .contains("CV")
      .click();
    cy.url().should("include", "/curriculum");
  });

  it("should contain a working Blog link", () => {
    cy.get('[data-testid="navigation-bar"] a[href="/blog"]')
      .contains("Blog")
      .click();
    cy.url().should("include", "/blog");
  });

  it("should contain a working Cookies link", () => {
    cy.get('[data-testid="navigation-bar"] a[href="/cookies"]')
      .contains("Cookies")
      .click();
    cy.url().should("include", "/cookies");
  });
});

export {};
