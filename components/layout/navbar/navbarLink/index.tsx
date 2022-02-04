import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./navbarLink.module.scss";

export interface NavbarLinkProps {
  className?: string;
  to: string;
  text: string;
}

const NavbarLink = ({ to, text }: NavbarLinkProps) => {
  const router = useRouter();

  const renderClassName = useMemo(() => {
    const currentPath = router.pathname;
    const isActive = currentPath === to;
    return `${isActive ? styles.activeNavbarLink : styles.navbarLink}`;
  }, [router, to]);

  return (
    <li className={renderClassName}>
      <Link href={to} passHref={true}>
        {text}
      </Link>
    </li>
  );
};

export default NavbarLink;
