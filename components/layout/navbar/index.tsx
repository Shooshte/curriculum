import NavbarLink from "./navbarLink";
import styles from "./navbar.module.scss";

interface NavigationLinkData {
  id: number;
  route: string;
  text: string;
}

export const NAVIGATION_LINKS: NavigationLinkData[] = [
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

const Navbar = () => (
  <div className={styles.headerContent} data-testid="navigation-bar">
    <h1 className={`${styles.brand}`}>Miha Šušteršič</h1>
    <nav className={styles.navigation}>
      <ul>
        {NAVIGATION_LINKS.map((linkData: NavigationLinkData) => (
          <NavbarLink
            key={`nav-link-${linkData.id}`}
            text={linkData.text}
            to={linkData.route}
          />
        ))}
      </ul>
    </nav>
  </div>
);

export default Navbar;
