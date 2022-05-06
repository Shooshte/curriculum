import NavbarLink from "./navbarLink";
import styles from "./navbar.module.scss";

import { NAVIGATION_LINKS } from "../../../constants/navigation";

const Navbar = () => (
  <nav className={styles.navigation} data-testid="navigation-bar">
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
);

export default Navbar;
