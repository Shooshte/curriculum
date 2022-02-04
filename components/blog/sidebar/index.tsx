import Image from "next/image";
import styles from "./blogSidebar.module.scss";

import { slugifyPostId } from "../../../lib/string";

import AboutHeader from "../../../public/images/blog/AuthorHeading.png";

interface PropsType {
  headings?: string[];
}

const BlogSidebar = ({ headings = [] }: PropsType) => {
  return (
    <section className={styles.container} data-testid="blog-sidebar">
      <section className={styles.tosContainer} data-testid="blog-sidebar-TOS">
        <h3 className="heading-3 margin-bottom-3">Table of contents:</h3>
        <hr className={styles.tosHorizontalRule} />
        <ul className={styles.tosList}>
          {headings.map((heading, index) => {
            const href = slugifyPostId(heading);
            return (
              <li key={`table-of-content-${index + 1}`}>
                <a className={`${styles.tosLink} text`} href={`#${href}`}>
                  {`${index + 1}. ${heading}`}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.authorContainer} title="About the author">
        <Image
          alt="Author photo next to about the author title"
          height={160}
          src={AboutHeader}
          quality={100}
          width={295}
        />
        <p className={`${styles.authorText} text`}>
          Miha Šušteršič is a JavaScript developer, UX and UI designer, and a
          cat whisperer. Living behind a keyboard in Škofljica, Slovenia he
          refuses to get a life because it feels as though he's trying to lead
          three already.
        </p>
      </section>
    </section>
  );
};

export default BlogSidebar;
