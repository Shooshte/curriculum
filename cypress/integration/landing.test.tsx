/// <reference types="cypress"/>

import { testLayout, TEST_LAYOUTS } from "./layout";

describe("/", () => {
  testLayout("/");

  beforeEach(() => {
    cy.visit("/");
  });

  it("head", () => {
    cy.get("head title").contains("shooshte: About");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Shooshte blog page mission statement, vales and content introduction."
    );
  });

  describe("content", () => {
    TEST_LAYOUTS.forEach((layout) => {
      it(layout, () => {
        cy.get("section img").should("have.attr", "alt", "a rainbow tree");
        cy.get("section h1").contains("Freedom.");
        cy.get("section h1").contains("Low-pressure.");
        cy.get("section h1").contains("Creativity.");
        cy.get("section p").contains("Hello, and welcome to my blog!");
        cy.get("section p").contains(
          "I’m shooshte and I am believe that everybody deserves freedom, and a low-pressure environment to unlock their creativity. My blog posts include a wide range of topics, but in the end, they all focus on skills, experiences and lessons learned that helped me achieve the same."
        );
        cy.get("section p").contains(
          "Since I work as a coder, a lot of the content I produce focuses on software development, but I really believe the content can be applied to a wider range of topics and professions."
        );
      });
    });
  });
});

export {};
