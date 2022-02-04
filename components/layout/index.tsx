import { ReactNode } from "react";

import CookieBanner from "./cookieBanner";
import Navbar from "./navbar";

import styles from "./layout.module.scss";

interface navigationLinkType {
  id: number;
  route: string;
  text: string;
}

export const NAVIGATION_LINKS: navigationLinkType[] = [
  {
    id: 0,
    route: "/curriculum",
    text: "CV",
  },
  {
    id: 1,
    route: "/blog",
    text: "Blog",
  },
  {
    id: 2,
    route: "/cookies",
    text: "Cookies",
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <CookieBanner />
      </footer>
    </div>
  );
};

export default Layout;
