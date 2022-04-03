/// <reference types="cypress"/>

describe("Layout Component", () => {
  describe("Navigation", () => {
    beforeEach(() => {
      cy.visit("/blog");
    });

    it("Shows the Miha Šušteršič heading", () => {
      cy.get('[data-testid="navigation-bar"] h1').contains("@shooshte");
    });

    it("Has a working Blog link", () => {
      cy.get('[data-testid="navigation-bar"] a[href="/blog"]')
        .contains("Blog")
        .click();
      cy.url().should("include", "/blog");
    });

    it("Has a working Cookies link", () => {
      cy.get('[data-testid="navigation-bar"] a[href="/cookies"]')
        .contains("Cookies")
        .click();
      cy.url().should("include", "/cookies");
    });

    it("Has correct CSS for active and inactive navbar links", () => {
      // All nav links should be transformed to uppercase
      cy.get('[data-testid="navigation-bar"] a').should(
        "have.css",
        "text-transform",
        "uppercase"
      );

      // Active navbar link should not be underlined
      cy.get('[data-testid="navigation-bar"] a[href="/blog"]')
        .contains("Blog")
        .should("have.css", "text-decoration", "none solid rgb(29, 29, 29)");

      // Inactive navbar links should be underlined
      cy.get('[data-testid="navigation-bar"] a[href="/cookies"]')
        .contains("Cookies")
        .should(
          "have.css",
          "text-decoration",
          "underline solid rgb(29, 29, 29)"
        );
    });
  });

  describe("Footer", () => {
    it("When page loads for the first time show the cookies consent banner", () => {
      cy.visit("/blog");
      cy.get("[data-testid='cookies-banner'] h4").contains("Cookies consent");
      cy.get("[data-testid='cookies-banner'] [data-testid='cookies-close']");
      cy.get("[data-testid='cookies-banner'] p").contains(
        "By clicking “Accept”, you agree to the storage and use of Google Analytics cookies in order to improve this site's performance. You can read more about this and review your settings at any time on the cookies subpage."
      );
      cy.get("[data-testid='cookies-banner']").contains("Accept");
      cy.get("[data-testid='cookies-banner']").contains("Decline");
    });

    it("After clicking the cookies consent banner close button the banner should show again on next page load.", () => {
      cy.visit("/blog");
      cy.get("[data-testid='cookies-close']").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("exist");
      cy.get(`[data-testid="gtag-track"]`).should("not.exist");
      cy.get(`[data-testid="gtag-init"]`).should("not.exist");
    });

    it("After clicking the cookies consent banner decline button the banner should not show the next time the page loads and the gtag track and gtag init should not be inside DOM.", () => {
      cy.visit("/blog");
      cy.get("[data-testid='cookies-banner'] h5").contains("Decline").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.get(`[data-testid="gtag-track"]`).should("not.exist");
      cy.get(`[data-testid="gtag-init"]`).should("not.exist");
    });

    it("After clicking the cookies consent banner accept button the banner should not show the next time the page loads and the gtag track and gtag init should be present inside DOM.", () => {
      cy.visit("/blog");
      cy.get("[data-testid='cookies-banner'] h5").contains("Accept").click();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.reload();
      cy.get("[data-testid='cookies-banner']").should("not.exist");
      cy.get(`[data-testid="gtag-track"]`).should("exist");
      cy.get(`[data-testid="gtag-init"]`).should("exist");
    });
  });
});

export {};
