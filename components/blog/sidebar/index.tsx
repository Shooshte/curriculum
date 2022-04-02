import Image from "next/image";
import styles from "./blogSidebar.module.scss";

import { Heading, slugifyPostId } from "../../../lib/string";

interface SidebarProps {
  headings?: Heading[];
}

interface HeadingProps {
  key: string;
  index: number;
  heading: Heading;
}

const HeadingComponent = ({ heading, index }: HeadingProps) => {
  const { chapters, text } = heading;
  const href = slugifyPostId(text);
  return (
    <li className={styles.tosLi}>
      <a className={`${styles.tosLink} text`} href={`#${href}`}>
        {`${index + 1}. ${heading.text}`}
      </a>
      {!!chapters.length && (
        <ol className={styles.tosList} data-testid={`blog-sidebar-ol-${text}`}>
          {chapters.map((heading, index) => {
            return (
              <HeadingComponent
                key={`${index}-${heading.text}`}
                index={index}
                heading={heading}
              />
            );
          })}
        </ol>
      )}
    </li>
  );
};

const BlogSidebar = ({ headings = [] }: SidebarProps) => {
  return (
    <section className={styles.container} data-testid="blog-sidebar">
      <h3 className="heading-3 margin-bottom-2">Table of contents:</h3>
      <hr className={styles.tosHorizontalRule} />
      <ol className={`${styles.tosList} ${styles.mainTosList}`}>
        {headings.map((heading, index) => {
          return (
            <HeadingComponent
              key={`${index}-${heading.text}`}
              index={index}
              heading={heading}
            />
          );
        })}
      </ol>
    </section>
  );
};

export default BlogSidebar;
