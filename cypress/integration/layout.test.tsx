/// <reference types="cypress"/>

describe("Layout", () => {
  describe("Navigation bar", () => {
    beforeEach(() => {
      cy.visit("/curriculum");
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

  describe("Cookies banner", () => {
    it("when page loads show the cookies banner when localStorage does not contain CookiesConsent", () => {
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-banner'] h4").contains("Cookies consent");
      cy.get("[data-testid='cookies-banner'] [data-testid='cookies-close']");
      cy.get("[data-testid='cookies-banner'] p").contains(
        "I would like to store and use analytics cookies in order to improve this site's performace. You can read more about this and review your settings at the "
      );
      cy.get("[data-testid='cookies-banner']").contains("Accept");
      cy.get("[data-testid='cookies-banner']").contains("Decline");
    });

    it("when page loads don't show the cookies banner when localStorage contains CookiesConsent : accepted", () => {
      localStorage.setItem("CookiesConsent", "accepted");
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-banner']").should("not.exist");
    });

    it("when page loads don't show the cookies banner when localStorage contains CookiesConsent : declined", () => {
      localStorage.setItem("CookiesConsent", "declined");
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-banner']").should("not.exist");
    });

    it("close button", () => {
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-close']").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("exist");
      cy.get(`[data-testid="gtag-track"]`).should("not.exist");
      cy.get(`[data-testid="gtag-init"]`).should("not.exist");
    });

    it("decline button", () => {
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-banner']").contains("Decline").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.get(`[data-testid="gtag-track"]`).should("not.exist");
      cy.get(`[data-testid="gtag-init"]`).should("not.exist");
    });

    it("accept button", () => {
      cy.visit("/curriculum");
      cy.get("[data-testid='cookies-banner']").contains("Accept").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.get(`[data-testid="gtag-track"]`).should("exist");
      cy.get(`[data-testid="gtag-init"]`).should("exist");
    });
  });
});

export {};
