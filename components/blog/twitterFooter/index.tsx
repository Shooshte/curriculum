import Image from "next/image";

import TwitterSrc from "../../../public/images/blog/Twitter.svg";

import styles from "./twitterFooter.module.scss";

const TwitterFooter = () => (
  <footer data-testid="blog-post-footer">
    <hr className={styles.horizontalRule} />
    <p className={`${styles.footerText} text`}>
      Thank you for reading. You are amazing! If you liked this content send
      some nice words my way. If you did not, let me know so I know to do better
      the next time.
    </p>
    <a
      className={styles.twitterLink}
      href="https://twitter.com/MihaSustersic"
      rel="noreferrer"
      target="_blank"
    >
      <Image
        alt="twitter logo"
        className={styles.twitterLogo}
        height={19.5}
        priority
        src={TwitterSrc.src}
        width={24}
      />
      <p className={styles.twitterText}>@MihaSustersic</p>
    </a>
  </footer>
);

export default TwitterFooter;
