import TwitterSrc from "../../../public/images/blog/Twitter.svg";

import styles from "./twitterFooter.module.scss";

const TwitterFooter = () => (
  <footer data-testid="blog-post-footer">
    <hr className={styles.horizontalRule} />
    <p className={styles.footerText}>
      Thank you for reading the post. You are amazing! If you liked this post
      send some nice words my way. If you did not, let me know so I know to do
      better the time.
    </p>
    <a
      className={styles.twitterLink}
      href="https://twitter.com/MihaSustersic"
      target="_blank"
    >
      <img
        alt="twitter logo"
        className={styles.twitterLogo}
        src={TwitterSrc.src}
      />
      <p className={styles.twitterText}>@MihaSustersic</p>
    </a>
  </footer>
);

export default TwitterFooter;
