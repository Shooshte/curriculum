import { ReactNode } from "react";

import CookieBanner from "./cookieBanner";
import Navbar from "./navbar";

import styles from "./layout.module.scss";

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
