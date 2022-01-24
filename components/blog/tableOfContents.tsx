import { slugifyPostId } from "../../lib/string";

import styles from "./tableOfContents.module.scss";

interface PropsType {
  headings: string[];
}

const TableOfContents = ({ headings = [] }: PropsType) => {
  return !!headings.length ? (
    <section className={styles.container} data-testid="table-of-contents">
      <h4 className="heading-4">Table of contents:</h4>
      <ul>
        {headings.map((heading, index) => {
          const href = slugifyPostId(heading);
          return (
            <li key={`table-of-content-${index + 1}`}>
              <a className="link text" href={`#${href}`}>
                {`${index + 1}. ${heading}`}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  ) : null;
};

export default TableOfContents;
