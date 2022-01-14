import Head from "next/head";

import styles from "./index.module.scss";

const Home = () => (
  <>
    <Head>
      <title>Curriculum Vitae - Miha Šušteršič</title>
    </Head>

    <section className={styles.section}>
      <h2 className="heading-2">Personal Information</h2>
      <p className="text">
        I am a <span className="text-accent">32 year old</span> male from
        Škofljica, <span className="text-accent">Slovenia</span>. My native
        language is Slovene, but I have also been learning&nbsp;
        <span className="text-accent">English</span> since my pre-school days.
      </p>
      <p className="text">
        I get excited about new technologies, business opportunities, products
        and creative work easily and have a passion for learning new skills. I
        recently adopted two cats, and once I take a profile picture that I
        like, I stick with it for a very long time.
      </p>
      <p className="text">
        I prefer being contacted via my email address&nbsp;
        <span className="text-accent">miha.sustersic.work@gmail.com</span>, but
        I usually also pick up when someone calls personal mobile phone
        number&nbsp;
        <span className="text-accent">+386 31 535 919</span>.
      </p>
    </section>

    <section className={styles.section}>
      <h2 className="heading-2">Skills</h2>
      <h3 className="heading-3">JavaScript</h3>
      <p className="text">
        For the past 5 years, I have been writing single-page-applications
        using&nbsp;
        <span className="text-accent">ReactJS.</span> I have used&nbsp;
        <span className="text-accent">Mobx</span>,&nbsp;
        <span className="text-accent">Redux</span>
        &nbsp; and&nbsp;
        <span className="text-accent">TypeScript</span> on multiple large-scale
        projects.
      </p>
      <p className="text">
        I have expansive experience with consuming&nbsp;
        <span className="text-accent">REST APIs</span> and am adept at
        using&nbsp;
        <span className="text-accent">axios</span>. I have a limited
        understanding of how to use <span className="text-accent">GraphQL</span>
        &nbsp; and&nbsp;
        <span className="text-accent">NodeJS</span>.
      </p>
      <p className={`text ${styles.lastText}`}>
        I am able to write <span className="text-accent">unit tests</span> using
        Jest and know how to write&nbsp;
        <span className="text-accent">end-to-end (integration)</span> tests
        using Cypress.
      </p>

      <h3 className="heading-3">Markup</h3>
      <p className={`text ${styles.lastText}`}>
        I use&nbsp;<span className="text-accent">styled-components</span>&nbsp;
        and&nbsp;
        <span className="text-accent">framer-motion</span>. I know&nbsp;
        <span className="text-accent">CSS</span>,&nbsp;
        <span className="text-accent">SASS</span>
        &nbsp; and <span className="text-accent">HTML</span>. I am used to
        writing documentation inside <span className="text-accent">.md</span>
        &nbsp; files.
      </p>

      <h3 className="heading-3">UX/UI Design</h3>
      <p className="text">
        For the past <span className="text-accent">3 years</span>, I have
        designed <span className="text-accent">web app interfaces</span>. I am
        adaptable within my creative process, I have worked using existing
        design systems (Semantic UI, Material UI, Tailwind), using design
        systems provided by graphical designers and creating a design system
        from scratch. I follow&nbsp;
        <span className="text-accent">Gestalt Principles</span>, and
        conduct&nbsp;
        <span className="text-accent">user interviews</span>, so I can design
        interfaces that satisfy user needs.
      </p>
      <p className={`text ${styles.lastText}`}>
        I have limited experience designing&nbsp;
        <span className="text-accent">static landing pages</span>.
      </p>

      <h3 className="heading-3">Project Management</h3>
      <p className="text">
        I have <span className="text-accent">2 years</span> of experience with
        project management, ranging from small-scale one-man bands to&nbsp;
        <span className="text-accent">medium-sized teams</span>. I know when and
        how to <span className="text-accent">delegate work</span>, set and&nbsp;
        <span className="text-accent">meet deadlines</span> and&nbsp;
        <span className="text-accent">prioritise work</span> according to user
        and business impact. I can&nbsp;
        <span className="text-accent">take ownership of features</span> or
        products, including&nbsp;
        <span className="text-accent">software architecture planning</span>,
        customer (and stakeholder) meetings, designing the UI, and planning
        implementation.
      </p>
      <p className="text">
        I worked as project manager and product owner in a team of 7 people. We
        built a <span className="text-accent">finished product</span> from a
        proof-of-concept application.
      </p>
      <p className={`text ${styles.lastText}`}>
        I have used multiple task management systems, including&nbsp;
        <span className="text-accent">JIRA</span>,&nbsp;
        <span className="text-accent">Asana</span>&nbsp; and&nbsp;
        <span className="text-accent">Trello</span>.
      </p>

      <h3 className="heading-3">Knowledge Sharing</h3>
      <p className="text">
        I am used to being a <span className="text-accent">mentor</span> to
        interns and new coworkers (both small groups and individuals), that
        worked as part-time developers or designers. These mentorships typically
        spanned over a couple of months and resulted in the mentees&nbsp;
        <span className="text-accent">becoming independent employees</span>.
      </p>
      <p className={`text ${styles.lastText}`}>
        I have experience creating and organising short&nbsp;
        <span className="text-accent">
          (15-30min) presentations and workshops
        </span>
        &nbsp;centered on various code and software architecture related topics
        for my colleagues.
      </p>
    </section>
    <section className={styles.section}>
      <h2 className="heading-2">Work experience</h2>
      <h3 className="heading-3">
        <span className="text-accent">Oct 2020 - Feb 2022</span>: Taia
        translations
      </h3>
      <p className={`text ${styles.lastText}`}>
        Taia translations is an&nbsp;
        <span className="text-accent">international startup</span> focusing on
        the translations industry. I worked in a smaller team of&nbsp;
        <span className="text-accent">6 developers</span>. My work here included
        a wide range of tasks, including implementing features on the Taia app
        web platform using <span className="text-accent">ReactJS</span>,
        creating&nbsp;
        <span className="text-accent">
          mock-ups and UX/UI designs, mentoring interns, planning software
          architecture
        </span>
        &nbsp; and actively designing new functionalities for the Taia web
        platform.
      </p>
      <h3 className="heading-3">
        <span className="text-accent">Apr 2017 - Oct 2020</span>: Sinergise,
        laboratorij za geografske informacijske sisteme
      </h3>
      <p className="text">
        I started working for Sinergise, a&nbsp;
        <span className="text-accent">
          medium-sized software company in Ljubljana
        </span>
        , Slovenia, working alone on a proof-of-concept single page ReactJS
        application. I developed and pitched the project successfully to our
        customer, which resulted in extended cooperation with the client and the
        first large-scale production&nbsp;
        <span className="text-accent">ReactJS</span> application I had the
        pleasure of working on.
      </p>
      <p className={`text ${styles.lastText}`}>
        After a year a larger team took over the initial project I worked on and
        I joined a larger team in which my responsibilities included&nbsp;
        <span className="text-accent">project management</span> for one of the
        teams projects,&nbsp;
        <span className="text-accent">creating UX and UI mock-ups</span> and
        development of multiple ReactJS applications. These were developed using
        a mix of ReactJS, MobX, Redux and TypeScript.
      </p>
      <h3 className="heading-3">
        <span className="text-accent">Jul 2015 - Mar 2017</span>: Sportradar
      </h3>
      <p className="text">
        My responsibilities at this&nbsp;
        <span className="text-accent">large international company</span>&nbsp;
        included <span className="text-accent">onboarding customers</span> and
        supporting them when integrating various web-based solutions into their
        technology stack.
      </p>
      <p className={`text ${styles.lastText}`}>
        My main focus was on customer support and modifying existing ReactJS and
        PhP widgets, as well as single-page-applications using SASS to fit
        customer-specific needs. These were white label solutions that
        required&nbsp;
        <span className="text-accent">styling adjustments</span> according to
        different style guides in order to fit the customer branding.
      </p>
    </section>
    <section className={styles.section}>
      <h2 className="heading-2">Education</h2>
      <h3 className="heading-3">
        <span className="text-accent">2010</span>: High school graduate
      </h3>
      <p className={`text ${styles.lastText}`}>
        Gimnazija Ledina, Ljubljana, Slovenia
      </p>
    </section>
  </>
);

export default Home;
