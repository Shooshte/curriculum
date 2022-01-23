/// <reference types="cypress"/>

interface TestParameterType {
  contains?: string;
  description?: string;
  selector: string;
  should?: string[];
  testId: string;
}

// Hardcoded tests for the first blog psot for now
describe("Blog post", () => {
  it("<head> content", () => {
    cy.visit("/blog/react-conditional-rendering");
    cy.get("head title").contains(
      "Miha Šušteršič: Clean-er ReactJS Code - Conditional Rendering"
    );
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "How to write cleaner, extendable and testable ReactJS component render functions."
    );
  });

  describe("<arcticle> content", () => {
    describe("Table of contents", () => {
      const TOC_TEST_PARAMETERS: TestParameterType[] = [
        {
          contains: "Table of contents:",
          description: "heading",
          selector: "h4",
          testId: "table-of-contents",
        },
        {
          contains: "1. TL;DR",
          description: "First chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#TL;DR"],
        },
        {
          contains: "2. Introduction",
          description: "Second chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#Introduction"],
        },
        {
          contains: "3. Multiple conditions",
          description: "Third chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#Multiple_conditions"],
        },
        {
          contains: "4. Intrinsic cognitive load",
          description: "Intrinsic cognitive load",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#Intrinsic_cognitive_load"],
        },
        {
          contains: "5. The hidden cost of software requirements",
          description: "Fifth chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: [
            "have.attr",
            "href",
            "#The_hidden_cost_of_software_requirements",
          ],
        },
        {
          contains: "6. Don't repeat yourself",
          description: "Sixth chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#Don't_repeat_yourself"],
        },
        {
          contains: "7. Error reporting, debugging, and testing",
          description: "Seventh chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: [
            "have.attr",
            "href",
            "#Error_reporting,_debugging,_and_testing",
          ],
        },
        {
          contains: "8. Conclusion",
          description: "Eight chapter link",
          selector: "ul li a",
          testId: "table-of-contents",
          should: ["have.attr", "href", "#Conclusion"],
        },
      ];

      TOC_TEST_PARAMETERS.forEach((testCase) => {
        const { contains, description, selector, should, testId } = testCase;
        const testDescription = !!description
          ? description
          : `${testId} ${selector}`;
        const testSelector = `article section[data-testid="${testId}"] ${selector}`;

        it(testDescription, () => {
          if (!!contains && should) {
            cy.get(testSelector)
              .contains(contains)
              // @ts-ignore
              .should(...should);
            return;
          }
          if (!!contains && !should) {
            cy.get(testSelector).contains(contains);
            return;
          }
          if (!contains && !!should) {
            // @ts-ignore
            cy.get(testSelector).should(...should);
            return;
          }
          cy.get(testSelector);
        });
      });
    });
  });
});

export {};
