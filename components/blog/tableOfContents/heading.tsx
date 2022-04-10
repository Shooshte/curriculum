import { Heading, slugifyPostId } from "../../../lib/string";

import styles from "./blogSidebar.module.scss";

interface HeadingProps {
  key: string;
  index: number;
  heading: Heading;
  onLinkClick: () => void;
}

const HeadingComponent = ({ heading, index, onLinkClick }: HeadingProps) => {
  const { chapters, text } = heading;
  const href = slugifyPostId(text);
  return (
    <li className={styles.tocLi}>
      <a
        className={`${styles.tocLink} text`}
        href={`#${href}`}
        onClick={onLinkClick}
      >
        {`${index + 1}. ${heading.text}`}
      </a>
      {!!chapters.length && (
        <ol className={styles.tocList} data-testid={`blog-sidebar-ol-${href}`}>
          {chapters.map((heading, index) => {
            return (
              <HeadingComponent
                key={`${index}-${heading.text}`}
                index={index}
                heading={heading}
                onLinkClick={onLinkClick}
              />
            );
          })}
        </ol>
      )}
    </li>
  );
};

export default HeadingComponent;
