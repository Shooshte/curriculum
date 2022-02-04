/// <reference types="cypress"/>

import postsData from "../fixtures/posts.json";

interface PostDataType {
  content: string;
  data: {
    categories?: string;
    date?: string;
    description?: string;
    title?: string;
  };
  excerpt?: string;
  id: string;
  isEmpty: boolean;
  subheadings: string[];
}

const checkPostHead = ({ id, data: { description, title } }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get("head title").contains(title);
  cy.get('head meta[name="description"]').should(
    "have.attr",
    "content",
    description
  );
};

const checkPostTitle = ({ id, data: { title } }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get('article section[data-testid="post-content"] h1').contains(title);
};

const checkPostTOS = ({ id, subheadings }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.viewport("iphone-6");
  cy.get('[data-testid="blog-sidebar"]').should("have.css", "display", "none");
  cy.viewport("ipad-2");
  cy.get('[data-testid="blog-sidebar"]').should("have.css", "display", "flex");
  cy.get('[data-testid="blog-sidebar"] [data-testid="blog-sidebar-TOS"] h3')
    .contains("Table of contents")
    .next()
    .should("match", "hr");

  subheadings.forEach((title, index) => {
    cy.get(
      '[data-testid="blog-sidebar"] [data-testid="blog-sidebar-TOS"] ul li a'
    ).contains(`${index + 1}. ${title}`);
  });
};

const checkPostFooter = (pathName: string) => {
  cy.visit(`blog/${pathName}`);
  cy.get('[data-testid="blog-post-footer"] hr');
  cy.get('[data-testid="blog-post-footer"] p').contains(
    "Thank you for reading the post. You are amazing! If you liked this post send some nice words my way. If you did not, let me know so I know to do better the time."
  );
  cy.get('[data-testid="blog-post-footer"] a')
    .should("have.attr", "href", "https://twitter.com/MihaSustersic")
    .should("have.attr", "target", "_blank")
    .contains("@MihaSustersic");
};

describe("Blog post", () => {
  postsData.forEach((postData) => {
    describe(postData.id, () => {
      it("<head>", () => {
        checkPostHead(postData);
      });
      it("Table of contents", () => {
        checkPostTOS(postData);
      });
      it("Title", () => {
        checkPostTitle(postData);
      });
      it("<footer>", () => {
        checkPostFooter(postData.id);
      });
    });
  });
});

export default {};
