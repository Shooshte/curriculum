/// <reference types="cypress"/>

export const TEST_LAYOUTS: Cypress.ViewportPreset[] = [
  "iphone-6",
  "ipad-mini",
  "macbook-15",
];

interface LinkData {
  href: string;
  text: string;
}

const NAV_LINKS: LinkData[] = [
  { href: "/", text: "About" },
  { href: "/blog", text: "Blog posts" },
  { href: "/cookies", text: "Cookies" },
];

export const testLayout = (url: string) => {
  TEST_LAYOUTS.forEach((layout) => {
    describe(`${layout} layout`, () => {
      beforeEach(() => {
        cy.visit(url);
      });

      describe("Navigation", () => {
        NAV_LINKS.forEach(({ href, text }) => {
          const linkDescription = `${href} (${text} link)`;

          it(linkDescription, () => {
            cy.get(`[data-testid="navigation-bar"] a[href="${href}"]`)
              .contains(text)
              .click();
            cy.url().should("include", href);
          });
        });
      });

      describe("Footer", () => {
        it("When page loads for the first time show the cookies consent banner", () => {
          cy.visit("/");
          cy.get("[data-testid='cookies-banner'] h4").contains(
            "Cookies consent"
          );
          cy.get(
            "[data-testid='cookies-banner'] [data-testid='cookies-close']"
          );
          cy.get("[data-testid='cookies-banner'] p").contains(
            "By clicking “Accept”, you agree to the storage and use of Google Analytics cookies in order to improve this site's performance. You can read more about this and review your settings at any time on the cookies subpage."
          );
          cy.get("[data-testid='cookies-banner']").contains("Accept");
          cy.get("[data-testid='cookies-banner']").contains("Decline");
        });

        it("After clicking the cookies consent banner close button the banner should show again on next page load.", () => {
          cy.visit("/");
          cy.get("[data-testid='cookies-close']").click();
          cy.get("[data-testid='cookies-banner']").should("not.exist");
          cy.reload();
          cy.get("[data-testid='cookies-banner']").should("exist");
          cy.get(`[data-testid="gtag-track"]`).should("not.exist");
          cy.get(`[data-testid="gtag-init"]`).should("not.exist");
        });

        it("After clicking the cookies consent banner decline button the banner should not show the next time the page loads and the gtag track and gtag init should not be inside DOM.", () => {
          cy.visit("/");
          cy.get("[data-testid='cookies-banner'] h5")
            .contains("Decline")
            .click();
          cy.get("[data-testid='cookies-banner']").should("not.exist");
          cy.reload();
          cy.get("[data-testid='cookies-banner']").should("not.exist");
          cy.get(`[data-testid="gtag-track"]`).should("not.exist");
          cy.get(`[data-testid="gtag-init"]`).should("not.exist");
        });

        it("After clicking the cookies consent banner accept button the banner should not show the next time the page loads and the gtag track and gtag init should be present inside DOM.", () => {
          cy.visit("/");
          cy.get("[data-testid='cookies-banner'] h5")
            .contains("Accept")
            .click();
          cy.get("[data-testid='cookies-banner']").should("not.exist");
          cy.reload();
          cy.get("[data-testid='cookies-banner']").should("not.exist");
          cy.get(`[data-testid="gtag-track"]`).should("exist");
          cy.get(`[data-testid="gtag-init"]`).should("exist");
        });
      });
    });
  });
};
