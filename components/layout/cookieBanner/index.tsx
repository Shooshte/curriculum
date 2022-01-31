import { useMemo, useState } from "react";

import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import closeSVGSrc from "../../../public/images/CloseIcon.svg";
import styles from "./cookieBanner.module.scss";

type CookiesConsent = "accepted" | "declined";

interface CookieBannerProps {
  cookiesConsent?: string;
  setAcceptedCookies: (cookiesContent: CookiesConsent) => void;
}

const CookieBanner = ({
  cookiesConsent,
  setAcceptedCookies,
}: CookieBannerProps) => {
  const [closedBanner, setClosedBanner] = useState<boolean>(false);

  const onCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    setClosedBanner(true);
  };

  const onAcceptClick = (e: MouseEvent) => {
    e.preventDefault();
    setAcceptedCookies("accepted");
  };

  const onDeclineClick = (e: MouseEvent) => {
    e.preventDefault();
    setAcceptedCookies("declined");
  };

  const showBanner = useMemo(() => {
    return !closedBanner && !cookiesConsent;
  }, [cookiesConsent, closedBanner]);

  return showBanner ? (
    <section className={styles.container} data-testid="cookies-banner">
      <div className={styles.headerContainer}>
        <h4 className="heading-4">Cookies consent</h4>
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
          I would like to store and use analytics cookies in order to improve
          this site's performace. You can read more about this and review your
          settings at the <Link href="/cookies">cookies sub page</Link>.
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
