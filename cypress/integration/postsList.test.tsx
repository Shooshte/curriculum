/// <reference types="cypress"/>

import { testLayout, TEST_LAYOUTS } from "./layout";

import postsData from "../fixtures/posts.json";
import { PostDataType } from "../../pages/blog/[id]";

interface CheckPostLiArgs {
  post: PostDataType;
  index: number;
}

const checkPostLi = ({
  post: {
    id,
    data: { categories, date, description, imageDescription, title },
  },
  index,
}: CheckPostLiArgs) => {
  cy.visit("/blog");
  const dateText = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const categoriesArray = categories.split(";");
  const categoriesText = categoriesArray.reduce((acc, category, textIndex) => {
    return textIndex > 0 ? `${acc} - ${category}` : `${acc} | ${category}`;
  }, dateText);

  cy.get(`[data-testid="blog-posts"] ul li img[alt="${imageDescription}"]`);
  cy.get('[data-testid="blog-posts"] ul li #description').contains(description);
  cy.get('[data-testid="blog-posts"] ul li #categories').contains(
    categoriesText
  );
  cy.get('[data-testid="blog-posts"] ul li h3').contains(title).click();

  cy.url().should("include", `/blog/${id}`);
};

describe("/blog", () => {
  testLayout("/blog");

  it("<head>", () => {
    cy.visit("/blog");
    cy.get("head title").contains(`shooshte: Blog home`);
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Miha 'shooshte' Šušteršič's personal blog page. Focused on ReactJS, front-end, and software development, but may also include other topics and cat pictures."
    );
  });

  describe("blog-posts", () => {
    TEST_LAYOUTS.forEach((layout) => {
      describe(layout, () => {
        it("title", () => {
          cy.visit("/blog");
          cy.get('[data-testid="blog-posts"] h2').contains("Recent blog posts");
        });
        it("blog card", () => {
          postsData.forEach((post, index) => {
            checkPostLi({ post, index });
          });
        });
      });
    });
  });
});

export {};
