import Link from "next/link";

import styles from "./layout.module.scss";

interface navigationLinkType {
  id: number;
  route: string;
  text: string;
}

export const NAVIGATION_LINKS: navigationLinkType[] = [
  {
    id: 0,
    route: "/",
    text: "CV",
  },
  {
    id: 1,
    route: "/blog",
    text: "Blog",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
