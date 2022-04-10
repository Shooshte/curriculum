import NavbarLink from "./navbarLink";
import styles from "./navbar.module.scss";

import { NAVIGATION_LINKS } from "../../../constants/navigation";
import { PAGE_TITLE } from "../../../constants";

const Navbar = () => (
  <div className={styles.headerContent} data-testid="navigation-bar">
    <h1 className={`${styles.brand}`}>{PAGE_TITLE}</h1>
    <nav className={styles.navigation}>
      <ul>
        {NAVIGATION_LINKS.map((linkData) => (
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
