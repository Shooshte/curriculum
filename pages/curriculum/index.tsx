import Head from "next/head";
import Image from "next/image";

import styles from "./curriculum.module.scss";

import profileSrc from "../../public/images/CV/ProfilePicture.png";
// import sidebarSrc from "../../public/images/SidebarImage.png";

const Home = () => (
  <>
    <Head>
      <title>Miha Šušteršič: Curriculum Vitae</title>
      <meta
        name="description"
        content="Miha Šušteršič's personal CV page. An experienced ReactJS front-end developer that also works in project management and UX/UI design. The CV contains all the relevant work experience and skills. Will be available for employment from 10th Feb 2022."
      ></meta>
    </Head>

    <div className={`${styles.container}`}>
      <div className="content-container">
        <section className={styles.section} data-testid="personal-information">
          <h2 className="heading-2">Personal Information</h2>
          <p className="text">
            I am a <span className="text-accent">32 year old</span> male from
            Škofljica, <span className="text-accent">Slovenia</span>. My native
            language is Slovene, but I am also proficient in&nbsp;
            <span className="text-accent">English</span>.
          </p>

          <p className="text">
            I often get excited about new technologies, business opportunities,
            products and creative work. I have a passion for learning new
            skills. I recently adopted two cats, and instantly became a cat
            whisperer. Once I take a profile picture that I like, I stick with
            it for a very long time.
          </p>
          <p className="text">
            I prefer being contacted via my email address&nbsp;
            <span className="text-accent">miha.sustersic.work@gmail.com</span>.
            That being said, I usually also pick up when someone calls my
            personal mobile phone number:&nbsp;
            <span className="text-accent">+386 31 535 919</span>.
          </p>
        </section>

        <section className={styles.section} data-testid="skills">
          <h2 className="heading-2">Skills</h2>
          <h3 className="heading-3">JavaScript</h3>
          <p className="text">
            For the past 5 years, I have been writing single-page-applications
            using&nbsp;
            <span className="text-accent">ReactJS.</span> I have used&nbsp;
            <span className="text-accent">Mobx</span>,&nbsp;
            <span className="text-accent">Redux</span>
            &nbsp;and&nbsp;
            <span className="text-accent">TypeScript</span> on several
            large-scale projects.
          </p>
          <p className="text">
            I have expansive experience with consuming&nbsp;
            <span className="text-accent">REST APIs</span> and am adept at
            using&nbsp;
            <span className="text-accent">axios</span>. I have a limited
            understanding of how to use{" "}
            <span className="text-accent">GraphQL</span>
            &nbsp;and&nbsp;
            <span className="text-accent">NodeJS</span>.
          </p>
          <p className={`text ${styles.lastText}`}>
            I am able to write <span className="text-accent">unit tests</span>{" "}
            using Jest and know how to write&nbsp;
            <span className="text-accent">end-to-end (integration)</span> tests
            using Cypress.
          </p>
          <h3 className="heading-3">Markup</h3>
          <p className={`text ${styles.lastText}`}>
            I use&nbsp;<span className="text-accent">styled-components</span>
            &nbsp;and&nbsp;
            <span className="text-accent">framer-motion</span>. I know&nbsp;
            <span className="text-accent">CSS</span>,&nbsp;
            <span className="text-accent">SASS</span>
            &nbsp;and <span className="text-accent">HTML</span>. I am used to
            writing documentation inside{" "}
            <span className="text-accent">.md</span>
            &nbsp;files.
          </p>
          <h3 className="heading-3">UX/UI Design</h3>
          <p className="text">
            For the past 3 years, I have designed{" "}
            <span className="text-accent">web app interfaces</span>. I am
            adaptable within my creative process. I have worked using existing
            design systems such as Semantic UI, Material UI and Tailwind. I know
            how to adapt design systems and branding provided by graphical
            designers. I was also a part of a team that created a in-house
            design system from scratch.{" "}
          </p>
          <p className="text">
            I follow&nbsp;
            <span className="text-accent">Gestalt Principles</span>, always
            thinking about how users will perceive my work. I conduct&nbsp;
            <span className="text-accent">user interviews</span> to design
            interfaces that meet user needs.
          </p>
          <p className={`text ${styles.lastText}`}>
            I have limited experience designing&nbsp;
            <span className="text-accent">static landing pages</span>.
          </p>
          <h3 className="heading-3">Project Management</h3>
          <p className="text">
            I have 2 years of experience with project management. I know when
            and how to <span className="text-accent">delegate work</span>, set
            and&nbsp;
            <span className="text-accent">meet deadlines.</span> I&nbsp;
            <span className="text-accent">prioritise work</span> according to
            user and business impact. I can&nbsp;
            <span className="text-accent">take ownership of features</span> or
            products. I have experience with&nbsp;
            <span className="text-accent">software architecture planning</span>.
            I am accustomed to customer (and stakeholder) meetings and planning
            software requirements.
          </p>
          <p className={`text ${styles.lastText}`}>
            I have used many task management systems, including&nbsp;
            <span className="text-accent">JIRA</span>,&nbsp;
            <span className="text-accent">Asana</span>&nbsp;and&nbsp;
            <span className="text-accent">Trello</span>.
          </p>

          <h3 className="heading-3">Knowledge Sharing</h3>
          <p className="text">
            I am used to being a <span className="text-accent">mentor</span> to
            interns and new coworkers (both small groups and individuals). These
            mentorships all lasted a few months and resulted in{" "}
            <span className="text-accent">
              new productive and satisfied employees.
            </span>
          </p>
          <p className={`text ${styles.lastText}`}>
            I have experience creating and organising short&nbsp;
            <span className="text-accent">
              (15-30min) presentations and workshops.
            </span>
          </p>
        </section>

        <section className={styles.section} data-testid="work-experience">
          <h2 className="heading-2">Work experience</h2>
          <h3 className="heading-3">
            <span className="text-accent">Senior Front-end Developer</span>
            &nbsp;Oct 2020 - Feb 2022 (1 year and 4 months)
          </h3>
          <p className={`text ${styles.lastText}`}>
            Taia translations is an&nbsp;
            <span className="text-accent">international startup</span> focusing
            on the translations industry. I worked in a smaller team of 6
            developers as a&nbsp;
            <span className="text-accent">senior front-end developer</span>. My
            work was not focused only on development but included a wide range
            of tasks. I was implementing features on the Taia app web platform
            using <span className="text-accent">ReactJS</span>. I was also
            creating&nbsp;
            <span className="text-accent">
              mock-ups and UX/UI designs while mentoring interns
            </span>
            . I helped planning{" "}
            <span className="text-accent">software architecture</span>. I also
            helped brainstorming and designing new functionalities for the Taia
            web platform.
          </p>
          <h3 className="heading-3">
            <span className="text-accent">Front-end Developer</span> Apr 2017 -
            Oct 2020 (3 years and 7 months)
          </h3>

          <p className="text">
            Sinergise is a&nbsp;
            <span className="text-accent">medium-sized software company</span>
            &nbsp;located in Ljubljana, Slovenia. I started by working alone on
            a proof-of-concept single page ReactJS application. I succeeded at
            developing and pitching the project to our customer. This resulted
            in extended cooperation with the client and a large-scale
            production&nbsp;
            <span className="text-accent">ReactJS</span> application.
          </p>
          <p className={`text ${styles.lastText}`}>
            After a year I joined a larger team. There my responsibilities
            expanded to <span className="text-accent">project management</span>{" "}
            and creating <span className="text-accent">UX and UI mock-ups</span>
            . I also continued with development of several ReactJS applications
            with my colleagues. These were developed using a mix of ReactJS,{" "}
            <span className="text-accent">MobX, Redux and TypeScript</span>.
          </p>
          <h3 className="heading-3">
            <span className="text-accent">Integration Engineer</span>&nbsp;Jul
            2015 - Mar 2017 (1 year and 9 months)
          </h3>
          <p className="text">
            Sportradar is a{" "}
            <span className="text-accent">large international company</span>. My
            responsibilities there included onboarding and supporting customers.
            I was hired to provide{" "}
            <span className="text-accent">technical help</span> with integration
            of various products. These were all web-based widgets, XML feeds and
            SDKs.
          </p>
          <p className={`text ${styles.lastText}`}>
            My main focus was customer support. I was also{" "}
            <span className="text-accent">
              modifying ReactJS and PhP widgets
            </span>
            , as well as single-page-applications. This was done using{" "}
            <span className="text-accent">SASS</span> to fit customer-specific
            needs. I worked on white label solutions that required styling
            adjustments.
          </p>
        </section>
        <section className={styles.section} data-testid="education">
          <h2 className="heading-2">Education</h2>
          <h3 className="heading-3">
            <span className="text-accent">High school graduate</span>
            &nbsp;(2010)
          </h3>
          <p className={`text ${styles.lastText}`}>
            Gimnazija Ledina, Ljubljana, Slovenia
          </p>
        </section>
      </div>
      <div className={styles.sidebar}>
        {/* <Image
          alt="A circuit board filled with icons representing different curriculum parts."
          height={2547}
          layout="fixed"
          src={sidebarSrc}
          quality={100}
          width={307}
        /> */}
        <Image
          alt="Portrait photo of Miha Šušteršič"
          height={179.12}
          layout="fixed"
          src={profileSrc}
          quality={100}
          width={214.9}
        />
      </div>
    </div>
  </>
);

export default Home;
