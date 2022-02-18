/// <reference types="cypress"/>

interface CookieData {
  name: string;
  provider: string;
  purpose: string;
  expiry: string;
  type: string;
}

const COOKIES_DATA: CookieData[] = [
  {
    name: "_dc_gtm_UA-#",
    provider: "Google",
    purpose:
      "Used by Google Tag Manager to control the loading of a Google Analytics script tag.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "ga",
    provider: "Google",
    purpose:
      "Registers a unique ID that is used to generate statistical data on how the visitor uses the website.",
    expiry: "2 years",
    type: "HTTP",
  },
  {
    name: "_ga_#",
    provider: "Google Tag Manager",
    purpose:
      "Used by Google Analytics to collect data on the number of times a user has visited the website, as well as dates of the first and most recent visits.",
    expiry: "2 years",
    type: "HTTP",
  },
  {
    name: "gat",
    provider: "Google",
    purpose:
      "Used by Google Analytics to reduce the number of network requests made to external sites.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "_gid",
    provider: "Google",
    purpose:
      "Registers a unique ID that is used to generate statistical data on how the visitor uses the website.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "collect",
    provider: "Google",
    purpose:
      "Used to send data to Google Analytics about the visitor's device and behaviour. This tracks the visitor across devices and marketing channels.",
    expiry: "1 day",
    type: "HTTP",
  },
];

describe("/cookies", () => {
  it("should render all the static data correctly", () => {
    cy.visit("/cookies");
    cy.get('[data-testid="cookies-section"] h1').contains("Tracking cookies");

    cy.get('[data-testid="cookies-section"] h2')
      .contains("List of tracking cookies")
      .next()
      .should("match", "p")
      .contains(
        "The following is a list of all the Google Analytics tracking cookies that this page would like to save. All of these are optional and will not be stored without your permission. You can review and change your settings above."
      )
      .next()
      .should("match", "table")
      .next()
      .should("match", "h2")
      .contains("Your settings")
      .next()
      .should("match", "p")
      .contains("No settings saved. No cookies will be stored by this page.")
      .next()
      .should("match", "p")
      .contains(
        "You can change your current settings by using the buttons below. In case you have previously accepted cookies and would like to revoke your permission, delete the cookies from your browser after clicking ‘Decline’, and refresh the page window. This will make sure that the tracking script is no longer running."
      )
      .next()
      .should("match", "h5")
      .contains("Decline cookies")
      .next()
      .should("match", "h5")
      .contains("Accept cookies");

    cy.get('[data-testid="cookies-table"] thead').contains("Name");
    cy.get('[data-testid="cookies-table"] thead').contains("Provider");
    cy.get('[data-testid="cookies-table"] thead').contains("Purpose");
    cy.get('[data-testid="cookies-table"] thead').contains("Expiry");
    cy.get('[data-testid="cookies-table"] thead').contains("Type");

    COOKIES_DATA.forEach(({ name, provider, purpose, expiry, type }) => {
      cy.get('[data-testid="cookies-table"] tbody tr').contains(name);
      cy.get('[data-testid="cookies-table"] tbody tr').contains(provider);
      cy.get('[data-testid="cookies-table"] tbody tr').contains(purpose);
      cy.get('[data-testid="cookies-table"] tbody tr').contains(expiry);
      cy.get('[data-testid="cookies-table"] tbody tr').contains(type);
    });
  });

  it("should display the correct settings message when cookies are accepted", () => {
    const date = new Date();
    const localisedDate = date.toLocaleDateString();
    const timestampString = date.valueOf().toString();
    localStorage.setItem("CookiesConsent", "accepted");
    localStorage.setItem("CookiesConsentDate", timestampString);

    cy.visit("/cookies");
    cy.get('[data-testid="cookies-settings-text"]').contains(
      `You accepted cookies on ${localisedDate}. The page will store all the google analytics cookies listed above.`
    );
  });

  it("should display the correct settings message when cookies are declined", () => {
    const date = new Date();
    const localisedDate = date.toLocaleDateString();
    const timestampString = date.valueOf().toString();
    localStorage.setItem("CookiesConsent", "declined");
    localStorage.setItem("CookiesConsentDate", timestampString);

    cy.visit("/cookies");
    cy.get('[data-testid="cookies-settings-text"]').contains(
      `You declined cookies on ${localisedDate}. No cookies will be stored by this page.`
    );
  });
});

export {};
