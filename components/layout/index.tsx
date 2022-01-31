import { ReactNode } from "react";
import Link from "next/link";
import CookieBanner from "./cookieBanner";

import styles from "./layout.module.scss";

interface navigationLinkType {
  id: number;
  route: string;
  text: string;
}

type CookiesConsent = "accepted" | "declined";

interface LayoutProps {
  cookiesConsent?: string;
  children: ReactNode;
  setAcceptedCookies: (cookiesConsent: CookiesConsent) => void;
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

const Layout = ({
  children,
  cookiesConsent,
  setAcceptedCookies,
}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Miha Šušteršič</h1>
          <nav data-testid="navigation-bar" className={styles.navigation}>
            <ul>
              {NAVIGATION_LINKS.map((linkData: navigationLinkType) => (
                <li key={`nav-link-${linkData.id}`}>
                  <Link href={linkData.route}>{linkData.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <CookieBanner
          cookiesConsent={cookiesConsent}
          setAcceptedCookies={setAcceptedCookies}
        />
      </footer>
    </div>
  );
};

export default Layout;
