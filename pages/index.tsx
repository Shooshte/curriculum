import Head from "next/head";

import ImageWithPlaceholder from "../components/image";
import TwitterFooter from "../components/blog/twitterFooter";

import styles from "./index.module.scss";

import LandingRainbow from "../public/images/landing-rainbow.png";
import { PAGE_TITLE } from "../constants";

const Landing = () => (
  <>
    <Head>
      <title>{`${PAGE_TITLE}: About`}</title>
      <meta
        name="description"
        content="Shooshte blog page mission statement, vales and content introduction."
      ></meta>
    </Head>
    <section className={styles.container}>
      <ImageWithPlaceholder
        alt="a rainbow tree"
        containerClassName={styles.rainbow}
        src={LandingRainbow.src}
      />
      <h1 className="heading-1">
        Freedom.
        <br />
        Low-pressure.
        <br />
        Creativity.
      </h1>
      <p className="text">Hello, and welcome to my blog!</p>
      <p className="text">
        I’m shooshte and I am believe that everybody deserves freedom, and a
        low-pressure environment to unlock their creativity. My blog posts
        include a wide range of topics, but in the end, they all focus on
        skills, experiences and lessons learned that helped me achieve the same.
      </p>
      <p className="text">
        Since I work as a coder, a lot of the content I produce focuses on
        software development, but I really believe the content can be applied to
        a wider range of topics and professions.
      </p>
      <TwitterFooter />
    </section>
  </>
);

export default Landing;
