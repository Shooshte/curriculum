/// <reference types="cypress"/>

describe("Curriculum page", () => {
  it("should add the page head element correctly", () => {
    cy.visit("/");
    cy.get("head title").contains("Miha Šušteršič: Curriculum Vitae");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Miha Šušteršič's personal CV page. An experienced ReactJS front-end developer that also works in project management and UX/UI design. The CV contains all the relevant work experience and skills. Will be available for employment from 10th Feb 2022."
    );
  });
});

export {};
