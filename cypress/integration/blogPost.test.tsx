/// <reference types="cypress"/>

import { testLayout, TEST_LAYOUTS } from "./layout";

import postsData from "../fixtures/posts.json";
import { Heading, slugifyPostId } from "../../lib/string";
import { PostDataType } from "../../pages/blog/[id]";

const checkPostHead = ({
  id,
  data: { description, imageUrl, title },
}: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get("head title").contains(`shooshte: ${title}`);
  cy.get('head meta[name="description"]').should(
    "have.attr",
    "content",
    description
  );
  // facebook card meta tags
  cy.get('head meta[property="og:description"]').should(
    "have.attr",
    "content",
    description
  );
  cy.get('head meta[property="og:locale"]').should(
    "have.attr",
    "content",
    "en_GB"
  );
  cy.get('head meta[property="og:type"]').should(
    "have.attr",
    "content",
    "article"
  );
  cy.get('head meta[property="og:url"]').should(
    "have.attr",
    "content",
    `https://www.shooshte.com/blog/${id}`
  );
  cy.get('head meta[property="og:image"]').should(
    "have.attr",
    "content",
    imageUrl
  );

  // twitter card meta tags
  cy.get('head meta[name="twitter:title"]').should(
    "have.attr",
    "content",
    title
  );
  cy.get('head meta[name="twitter:description"]').should(
    "have.attr",
    "content",
    description
  );
  cy.get('head meta[name="twitter:image"]').should(
    "have.attr",
    "content",
    imageUrl
  );
  cy.get('head meta[name="twitter:card"]').should(
    "have.attr",
    "content",
    "summary_large_image"
  );
};

const checkPostTitle = ({ id, data: { title } }: PostDataType) => {
  cy.visit(`blog/${id}`);
  cy.get('article section[data-testid="post-content"] h1').contains(title);
};

const checkPostTOC = ({ id, headings }: PostDataType) => {
  const checkSubheadings = (heading: Heading) => {
    heading.chapters.forEach((currentHeading, index) => {
      const href = slugifyPostId(heading.text);
      cy.get(`[data-testid="blog-sidebar-ol-${href}"]`).contains(
        `${index + 1}. ${currentHeading.text}`
      );
      if (currentHeading.chapters.length > 0) {
        checkSubheadings(currentHeading);
      }
    });
  };

  cy.visit(`blog/${id}`);
  cy.get('[data-testId="cookies-close"]').click();
  cy.viewport("iphone-6");
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "-375px"
  );
  cy.get('[data-testId="toc-trigger"]').should("have.css", "display", "flex");
  cy.get('[data-testId="toc-trigger"]').click();
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "0px"
  );
  headings.forEach((heading, index) => {
    cy.get('[data-testid="table-of-contents"] ol li a').contains(
      `${index + 1}. ${heading.text}`
    );
    checkSubheadings(heading);
  });
  cy.get('[data-testId="toc-trigger"]').should("have.css", "display", "flex");
  cy.get('[data-testId="toc-trigger"]').click();
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "-375px"
  );

  cy.viewport("ipad-2");
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "-768px"
  );
  cy.get('[data-testId="toc-trigger"]').should("have.css", "display", "flex");
  cy.get('[data-testId="toc-trigger"]').click();
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "0px"
  );
  headings.forEach((heading, index) => {
    cy.get('[data-testid="table-of-contents"] ol li a').contains(
      `${index + 1}. ${heading.text}`
    );
    checkSubheadings(heading);
  });
  cy.get('[data-testId="toc-trigger"]').should("have.css", "display", "flex");
  cy.get('[data-testId="toc-trigger"]').click();
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "right",
    "-768px"
  );
  // desktop
  cy.viewport("macbook-11");
  cy.get('[data-testid="table-of-contents"]').should(
    "have.css",
    "display",
    "flex"
  );
  cy.get('[data-testId="toc-trigger"]').should("have.css", "display", "none");
  cy.get('[data-testid="table-of-contents"] h3')
    .contains("Table of contents")
    .next()
    .should("match", "hr");

  headings.forEach((heading, index) => {
    cy.get('[data-testid="table-of-contents"] ol li a').contains(
      `${index + 1}. ${heading.text}`
    );
    checkSubheadings(heading);
  });
};

const checkPostFooter = (pathName: string) => {
  cy.visit(`blog/${pathName}`);
  cy.get('[data-testid="blog-post-footer"] hr');
  cy.get('[data-testid="blog-post-footer"] p').contains(
    "Thank you for reading. You are amazing! If you liked this content send some nice words my way. If you did not, let me know so I know to do better the next time."
  );
  cy.get('[data-testid="blog-post-footer"] a')
    .should("have.attr", "href", "https://twitter.com/MihaSustersic")
    .should("have.attr", "target", "_blank")
    .contains("@MihaSustersic");
};

describe("/blog/:id", () => {
  postsData.forEach((postData) => {
    describe(postData.id, () => {
      testLayout(`/blog/${postData.id}`);

      it("<head>", () => {
        checkPostHead(postData);
      });
      it("Table of contents", () => {
        checkPostTOC(postData);
      });

      TEST_LAYOUTS.forEach((layout) => {
        describe(layout, () => {
          it("Title", () => {
            checkPostTitle(postData);
          });
          it("<footer>", () => {
            checkPostFooter(postData.id);
          });
        });
      });
    });
  });
});

export default {};
