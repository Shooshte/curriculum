/// <reference types="cypress"/>

import postsData from "../fixtures/posts.json";

interface PostDataType {
  id: string;
  categories: string;
  date: string;
  description: string;
  imageUrl: string;
  title: string;
}

const checkPostHead = ({ id, description, title }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get("head title").contains(title);
  cy.get('head meta[name="description"]').should(
    "have.attr",
    "content",
    description
  );
};

const checkPostTitle = ({ id, title }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get('article section[data-testid="post-content"] h1').contains(title);
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
      it("post head", () => {
        checkPostHead(postData);
      });
      it("post title", () => {
        checkPostTitle(postData);
      });
      it("post footer", () => {
        checkPostFooter(postData.id);
      });
    });
  });
});

export default {};
