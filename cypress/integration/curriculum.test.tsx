/// <reference types="cypress"/>

interface SectionType {
  keywords: string[];
  sectionHeading: string;
  subHeadings: string[];
  testId: string;
}

describe("Curriculum page", () => {
  // Page head element test, checking for page title and description
  it("<head> content", () => {
    cy.visit("/curriculum");
    cy.get("head title").contains("Miha Šušteršič: Curriculum Vitae");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Miha Šušteršič's personal CV page. An experienced ReactJS front-end developer that also works in project management and UX/UI design. The CV contains all the relevant work experience and skills. Will be available for employment from 10th Feb 2022."
    );
  });

  // Test data for testing that the Curriculum page includes the correct content
  // Only testing for correct heading and content because the rest of the text is subject to change
  const expectedSections: SectionType[] = [
    {
      keywords: [
        "32 year old",
        "Slovenia",
        "English",
        "miha.sustersic.work@gmail.com",
        "+386 31 535 919",
      ],
      sectionHeading: "Personal Information",
      subHeadings: [],
      testId: "personal-information",
    },
    {
      keywords: [
        "ReactJS",
        "Mobx",
        "Redux",
        "TypeScript",
        "REST APIs",
        "axios",
        "GraphQL",
        "NodeJS",
        "unit tests",
        "end-to-end (integration)",
        "styled-components",
        "framer-motion",
        "CSS",
        "SASS",
        "HTML",
        ".md",
        "web app interfaces",
        "Gestalt Principles",
        "user interviews",
        "static landing pages",
        "delegate work",
        "meet deadlines",
        "prioritise work",
        "take ownership of features",
        "software architecture planning",
        "JIRA",
        "Asana",
        "Trello",
        "mentor",
        "new productive and satisfied employees",
        "(15-30min) presentations and workshops",
      ],
      sectionHeading: "Skills",
      subHeadings: [
        "JavaScript",
        "Markup",
        "UX/UI Design",
        "Project Management",
        "Knowledge Sharing",
      ],
      testId: "skills",
    },
    {
      keywords: [
        "international startup",
        "senior front-end developer",
        "ReactJS",
        "mock-ups and UX/UI designs while mentoring interns",
        "software architecture",
        "medium-sized software company",
        "project management",
        "UX and UI mock-ups",
        "MobX",
        "Redux",
        "TypeScript",
        "large international company",
        "technical help",
        "modifying ReactJS and PhP widgets",
        "SASS",
      ],
      sectionHeading: "Work experience",
      subHeadings: [
        "Senior Front-end Developer Oct 2020 - Feb 2022 (1 year and 4 months)",
        "Front-end Developer Apr 2017 - Oct 2020 (3 years and 7 months)",
        "Integration Engineer Jul 2015 - Mar 2017 (1 year and 9 months)",
      ],
      testId: "work-experience",
    },
    {
      keywords: [],
      sectionHeading: "Education",
      subHeadings: ["High school graduate (2010)"],
      testId: "education",
    },
  ];

  expectedSections.forEach(
    ({ keywords, sectionHeading, subHeadings, testId }) => {
      const testDescription = `${sectionHeading} content`;
      const testIdSelector = `[data-testid="${testId}"]`;
      it(testDescription, () => {
        cy.get(`${testIdSelector} h2`).contains(sectionHeading);
        subHeadings.forEach((subHeading) => {
          cy.get(`${testIdSelector} h3`).contains(subHeading);
        });
        keywords.forEach((keyword) => {
          cy.get(testIdSelector).contains(keyword);
        });
      });
    }
  );
});

export {};
