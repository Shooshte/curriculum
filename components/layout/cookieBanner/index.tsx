import { useContext, useMemo, useState } from "react";

import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import closeSVGSrc from "../../../public/images/CloseIcon.svg";
import styles from "./cookieBanner.module.scss";

import CookiesContext from "~/context/cookies";

const CookieBanner = () => {
  const [closedBanner, setClosedBanner] = useState<boolean>(false);
  const { cookiesConsent, setCookiesConsent } = useContext(CookiesContext);

  const onCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    setClosedBanner(true);
  };

  const onAcceptClick = (e: MouseEvent) => {
    e.preventDefault();
    setCookiesConsent("accepted");
  };

  const onDeclineClick = (e: MouseEvent) => {
    e.preventDefault();
    setCookiesConsent("declined");
  };

  const showBanner = useMemo(() => {
    return !closedBanner && !cookiesConsent;
  }, [cookiesConsent, closedBanner]);

  return showBanner ? (
    <section className={styles.container} data-testid="cookies-banner">
      <div className={styles.headerContainer}>
        <h4 className="heading-3">Cookies consent</h4>
        <div
          className={styles.close}
          data-testid="cookies-close"
          onClick={onCloseClick}
        >
          <Image alt="close button" layout="fill" src={closeSVGSrc} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <p className="text">
          By clicking “Accept”, you agree to the storage and use of Google
          Analytics cookies in order to improve this site's performance. You can
          read more about this and review your settings at any time on the&nbsp;
          <Link href="/cookies">cookies</Link>&nbsp;subpage.
        </p>
        <div className={styles.buttonsContainer}>
          <h5
            className={`heading-5 ${styles.button} `}
            onClick={onDeclineClick}
          >
            Decline
          </h5>
          <h5 className={`heading-5 ${styles.button} `} onClick={onAcceptClick}>
            Accept
          </h5>
        </div>
      </div>
    </section>
  ) : null;
};

export default CookieBanner;
