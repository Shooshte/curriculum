/// <reference types="cypress"/>

interface TestParameterType {
  contains?: string;
  description?: string;
  next?: boolean;
  selector: string;
  should?: string[];
  testId: string;
}

const runContentTest = (testParams: TestParameterType) => {
  const { contains, description, next, selector, should, testId } = testParams;
  const testDescription = !!description
    ? description
    : `${testId} ${selector} ${contains}`;
  const testSelector = `article section[data-testid="${testId}"] ${selector}`;

  it(testDescription, () => {
    if (!!contains && !!should && !!next) {
      cy.get(testSelector)
        .contains(contains)
        .next()
        // @ts-ignore
        .should(...should);
      return;
    }
    if (!!contains && !!should) {
      cy.get(testSelector)
        .contains(contains)
        // @ts-ignore
        .should(...should);
      return;
    }
    if (!!contains && !!next) {
      cy.get(testSelector).contains(contains).next();
      return;
    }
    if (!!should && !!next) {
      cy.get(testSelector)
        .next()
        // @ts-ignore
        .should(...should);
      return;
    }
    if (!!contains && !should && !next) {
      cy.get(testSelector).contains(contains);
      return;
    }
    if (!contains && !!should && !next) {
      // @ts-ignore
      cy.get(testSelector).should(...should);
      return;
    }
    if (!contains && !should && !!next) {
      cy.get(testSelector).next();
      return;
    }
    cy.get(testSelector);
  });
};

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
        runContentTest(testCase);
      });
    });
    describe("Content", () => {
      describe("headings", () => {
        const HEADING_TEST_PARAMS: TestParameterType[] = [
          {
            contains: "Clean-er ReactJS Code - Conditional Rendering",
            selector: "h1",
            should: [
              "have.attr",
              "id",
              "Clean-er_ReactJS_Code_-_Conditional_Rendering",
            ],
            testId: "post-content",
          },
          {
            contains: "TL;DR",
            selector: "h2",
            should: ["have.attr", "id", "TL;DR"],
            testId: "post-content",
          },
          {
            contains: "Introduction",
            selector: "h2",
            should: ["have.attr", "id", "Introduction"],
            testId: "post-content",
          },
          {
            contains: "Multiple conditions",
            selector: "h2",
            should: ["have.attr", "id", "Multiple_conditions"],
            testId: "post-content",
          },
          {
            contains: "Intrinsic cognitive load",
            selector: "h2",
            should: ["have.attr", "id", "Intrinsic_cognitive_load"],
            testId: "post-content",
          },
          {
            contains: "The hidden cost of software requirements",
            selector: "h2",
            should: [
              "have.attr",
              "id",
              "The_hidden_cost_of_software_requirements",
            ],
            testId: "post-content",
          },
          {
            contains: "Don't repeat yourself",
            selector: "h2",
            should: ["have.attr", "id", "Don't_repeat_yourself"],
            testId: "post-content",
          },
          {
            contains: "Error reporting, debugging, and testing",
            selector: "h2",
            should: [
              "have.attr",
              "id",
              "Error_reporting,_debugging,_and_testing",
            ],
            testId: "post-content",
          },
          {
            contains: "Conclusion",
            selector: "h2",
            should: ["have.attr", "id", "Conclusion"],
            testId: "post-content",
          },
        ];

        HEADING_TEST_PARAMS.forEach((testCase) => {
          runContentTest(testCase);
        });
      });
      describe("Chapters content", () => {
        const PARAGRAPH_TEST_PARAMS: TestParameterType[] = [
          {
            contains: "TL;DR",
            description: "TL;DR paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "Move render conditions into appropriately named variables. Abstract the condition logic into a function. This makes the render function code a lot easier to understand, refactor, reuse, test, and think about.",
            ],
            testId: "post-content",
          },
          {
            contains: "Introduction",
            description: "Introduction first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "Conditional rendering is when a logical operator determines what will be rendered. The following code is from the examples in the official ReactJS documentation. It is one of the simplest examples of conditional rendering that I can think of.",
            ],
            testId: "post-content",
          },
          {
            contains:
              "I believe it would be better to write this as a function outside the scope of the Component. This improves code readability and code reusability. It also makes the code easier to test and optimize. But the biggest benefit this provides is lessening the cognitive load of programmers.",
            description: "Introduction last paragraph",
            selector: "p",
            testId: "post-content",
          },
        ];

        PARAGRAPH_TEST_PARAMS.forEach((testParam) => {
          runContentTest(testParam);
        });
      });
    });
  });
});

export {};
