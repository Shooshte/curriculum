/// <reference types="cypress"/>

interface TestParameterType {
  contains?: string;
  description?: string;
  next?: boolean;
  selector: string;
  should?: string[];
  testId: string;
}

type ViewportPresetType =
  | "macbook-16"
  | "macbook-15"
  | "macbook-13"
  | "macbook-11"
  | "ipad-2"
  | "ipad-mini"
  | "iphone-xr"
  | "iphone-x"
  | "iphone-6+"
  | "iphone-se2"
  | "iphone-8"
  | "iphone-7"
  | "iphone-6"
  | "iphone-5"
  | "iphone-4"
  | "iphone-3"
  | "samsung-s10"
  | "samsung-note9";

interface RunContentTestArgsType {
  testParams: TestParameterType;
  viewport?: ViewportPresetType;
}

const runContentTest = ({ testParams, viewport }: RunContentTestArgsType) => {
  const { contains, description, next, selector, should, testId } = testParams;
  const testDescription = !!description
    ? description
    : `${testId} ${selector} ${contains}`;
  const testSelector = `article section[data-testid="${testId}"] ${selector}`;

  it(testDescription, () => {
    if (!!viewport) {
      cy.viewport(viewport);
    }
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
describe("Clean-er ReactJS Code - Conditional Rendering blog post test", () => {
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

      describe("mobile", () => {
        runContentTest({
          testParams: {
            description: "Table of contents should not be displayed",
            selector: "",
            should: ["have.css", "display", "none"],
            testId: "table-of-contents",
          },
          viewport: "iphone-6",
        });
      });

      describe("tablet", () => {
        TOC_TEST_PARAMETERS.forEach((testParams) => {
          runContentTest({ testParams, viewport: "ipad-2" });
        });
      });

      describe("laptop", () => {
        TOC_TEST_PARAMETERS.forEach((testParams) => {
          runContentTest({ testParams, viewport: "macbook-13" });
        });
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

        describe("mobile", () => {
          HEADING_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "iphone-6" });
          });
        });

        describe("tablet", () => {
          HEADING_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "ipad-2" });
          });
        });

        describe("laptop", () => {
          HEADING_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "macbook-13" });
          });
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
          {
            contains: "Multiple conditions",
            description: "Multiple conditions first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "This is an example of conditional rendering that I come across often. Instead of a single condition, we now have many conditions inside the render function.",
            ],
            testId: "post-content",
          },
          {
            contains:
              "If the user role is 29, 21, 11 or 30 we return the AdminOptionsPanel Component. If the user role is anything else we return the UserOptionsPanel. These are the main issues I have with the approach:",
            description: "Multiple conditions second paragraph",
            selector: "p",
            testId: "post-content",
          },
          {
            contains:
              "The business logic is paired with the render logic. This makes it harder to think about the render logic in isolation.",
            description: "Multiple conditions first bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "The business logic is not communicated at all. Without knowing what roles 29, 21, 11, and 30 stand for the reader does not know why this decision is made.",
            description: "Multiple conditions second bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "The condition is not exportable. We need to repeat it if we have the same render condition for different elements inside our codebase.",
            description: "Multiple conditions third bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "The condition is hard to test in isolation. Render functions are seldom this simple. Testing the final output of the Component will not determine if the render condition is causing issues.",
            description: "Multiple conditions fourth bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Intrinsic cognitive load",
            description: "Intrinsic cognitive load first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "This is the inherent level of difficulty associated with a specific instructional topic. The more complex the instructions, the more mental effort is needed to understand them. 4 + 9 is easier to understand and reason about than a complex mathematical equation. In our code example, we are mixing two different types of information at the same time. We are relying on the reader to know what certain roles mean. Without that he is unable to know the intent behind our Component. Let's refactor the code to address this first.",
            ],
            testId: "post-content",
          },
          {
            contains:
              "It may not seem like much, but now we have split our logic into two thought processes. We can think about one without the other. When checking if the render function works we need to check the ternary condition and markup. The same goes for the displayAdminOptionsPanel constant. We need to concern ourselves with how the content of the variable (true/false in our case) is set. The intrinsic cognitive load of the person that is trying to understand our code is a lot smaller. As a nice bonus, we are also able to wrap our variable inside Reacts useMemo hook.",
            description: "Intrinsic cognitive load second paragraph",
            selector: "p",
            testId: "post-content",
          },
          {
            contains:
              "It may not seem like much, but now we have split our logic into two thought processes. We can think about one without the other. When checking if the render function works we need to check the ternary condition and markup. The same goes for the displayAdminOptionsPanel constant. We need to concern ourselves with how the content of the variable (true/false in our case) is set. The intrinsic cognitive load of the person that is trying to understand our code is a lot smaller. As a nice bonus, we are also able to wrap our variable inside Reacts useMemo hook.",
            description: "Intrinsic cognitive load third paragraph",
            next: true,
            selector: "p",
            should: [
              "have.text",
              "I can already hear the grumbling about useless nitpicking. The effort that goes into this would be better spent writing more code, right? The thing about this is that decisions like these matter. They will impact your performance in invisible ways. Constant dropping wears away a stone. We are reading a high amount of functions like these every day. The intrinsic cognitive load matters. The time we spend trying to understand code already written could be spent writing new code.",
            ],
            testId: "post-content",
          },
          {
            contains: "The hidden cost of software requirements",
            description:
              "The hidden cost of software requirements first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              'Developers are almost never lucky enough to get very specific instructions. Our customers do not say "user role 22 should have access to the admin options panel". Instead the bug report or feature request is phrased from their perspective. The business perspective. We will hear "Project managers should also be able to access the admin options". Or rather "Joe from project management cannot access options". It is our job to know that Joe from project management has user role 22, and where the issue in the code is coming from. With this in mind let\'s try to refactor our previous code to make the business logic clearer.',
            ],
            testId: "post-content",
          },
          {
            contains:
              "The reader no longer has to know why only certain roles are able to use the admin options panel. The code provides this information. This also simplifies communication between coworkers by making questions more specific. It also makes certain question (why does the code work this way type of questions) unnecessary.",
            description:
              "The hidden cost of software requirements second paragraph",
            selector: "p",
            testId: "post-content",
          },
          {
            contains:
              "We have documented every known user role and admin role in our system. We have abstracted checking if a user has admin permissions into a separate function. We have further reduced the intrinsic cognitive load of our reader. It is now clear what the initial software requirements were. The admin options panel should only be available for users with admin permissions. We can now check our four points of failure in isolation:",
            description:
              "The hidden cost of software requirements third paragraph",
            selector: "p",
            testId: "post-content",
          },
          {
            contains: "Are the roles defined correctly?",
            description:
              "The hidden cost of software requirements first bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "Is the function that checks the user roles working as expected?",
            description:
              "The hidden cost of software requirements second bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Is the component passing the user role to the function?",
            description:
              "The hidden cost of software requirements third bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Is the render ternary condition correct?",
            description:
              "The hidden cost of software requirements fourth bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Don't repeat yourself",
            description: "Don't repeat yourself paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "There is another benefit to moving the business logic into a separate function. Business logic is often repeated. If we follow our example, users with admin permissions might be able to see other parts of the interface. They might be able to access certain confidential data. They might be able to edit certain information. In that case, having a reusable function for checking user role permissions is very handy. It provides a single point of failure and debugging for the whole codebase. Once we validated it works as specified it will work that way everywhere. We no longer have to do a global search for this condition to add an admin role or to remove an existing one. These are all great benefits that improve productivity and confidence in our codebase.",
            ],
            testId: "post-content",
          },
          {
            contains: "Error reporting, debugging, and testing",
            description:
              "Error reporting, debugging, and testing first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "Structuring our code this way gives us better error reporting. We now see which specific function failed and can fix it in isolation. Debugging our code is easier since we can focus on a much smaller scope at a time. Finally, testing our code can be a lot more specific. While we could only test what our component rendered before, we can now check every single step:",
            ],
            testId: "post-content",
          },
          {
            contains: "Did the roles come from the correct constant?",
            description:
              "Error reporting, debugging, and testing first bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Did the function check the user role permissions?",
            description:
              "Error reporting, debugging, and testing second bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "Did the Component call the permissions check, passing the right argument?",
            description:
              "Error reporting, debugging, and testing third bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Did the render return the correct markup?",
            description:
              "Error reporting, debugging, and testing fourth bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "This gives us a lot more confidence when refactoring or adding more functionality.",
            description:
              "Error reporting, debugging, and testing second paragraph",
            selector: "p",
            testId: "post-content",
          },
          {
            contains: "Conclusion",
            description: "Conclusion first paragraph",
            next: true,
            selector: "h2",
            should: [
              "have.text",
              "Writing logic unrelated to markup in separate functions has a lot of added benefits:",
            ],
            testId: "post-content",
          },
          {
            contains: "Reducing the cognitive load, enabling us to do more.",
            description: "Conclusion first bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Business logic is separated and easier to understand.",
            description: "Conclusion second bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "Our code is reusable and provides a single source of truth.",
            description: "Conclusion third bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains: "Error reporting is more specific.",
            description: "Conclusion fourth bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "Testing is more specific and gives faster and better feedback.",
            description: "Conclusion five bullet point",
            selector: "ul li",
            testId: "post-content",
          },
          {
            contains:
              "All this results in fixing bugs, refactoring and adding features being easier. That being said, this is not a silver bullet that will work everywhere. Sometimes structuring your code in this way is more effort than it is worth. After reading this post, you are able to decide whether the benefits for your team are worth the effort this approach requires.",
            description: "Conclusion last paragraph",
            selector: "p",
            testId: "post-content",
          },
        ];

        describe("mobile", () => {
          PARAGRAPH_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "iphone-6" });
          });
        });

        describe("tablet", () => {
          PARAGRAPH_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "ipad-2" });
          });
        });

        describe("laptop", () => {
          PARAGRAPH_TEST_PARAMS.forEach((testParams) => {
            runContentTest({ testParams, viewport: "macbook-13" });
          });
        });
      });
    });
  });
});

export {};
