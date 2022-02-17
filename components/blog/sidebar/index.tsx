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
      <h3 className="heading-3 margin-bottom-2">Table of contents:</h3>
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
  );
};

export default BlogSidebar;
