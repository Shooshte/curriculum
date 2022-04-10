import { useState } from "react";

import { Heading } from "../../../lib/string";
import HeadingComponent from "./heading";
import Image from "next/image";

import closeIcon from "../../../public/images/blog/tableOfContents/close.svg";
import listIcon from "../../../public/images/blog/tableOfContents/list.svg";
import styles from "./blogSidebar.module.scss";

interface SidebarProps {
  headings?: Heading[];
}

const TableOfContents = ({ headings = [] }: SidebarProps) => {
  const [hideOnMobile, setHideOnMobile] = useState<boolean>(true);

  const handleToggleClick = () => {
    setHideOnMobile(!hideOnMobile);
  };

  const onLinkClick = () => {
    setHideOnMobile(true);
  };

  return (
    <>
      <section
        className={`${styles.container} ${
          hideOnMobile ? styles.slideOut : styles.slideIn
        }`}
        data-testid="table-of-contents"
      >
        <h3 className="heading-3 margin-bottom-2">Table of contents:</h3>
        <hr className={styles.tocHorizontalRule} />
        <ol className={`${styles.tocList} ${styles.maintocList}`}>
          {headings.map((heading, index) => {
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
      </section>
      <button
        className={styles.tocTrigger}
        data-testid="toc-trigger"
        onClick={handleToggleClick}
      >
        <Image
          alt={
            hideOnMobile ? "open table of contents" : "close table of contents"
          }
          height={hideOnMobile ? "16.7px" : "20px"}
          src={hideOnMobile ? listIcon : closeIcon}
          width={hideOnMobile ? "27px" : "20px"}
        />
      </button>
    </>
  );
};

export default TableOfContents;
