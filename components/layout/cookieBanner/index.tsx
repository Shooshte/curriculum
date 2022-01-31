import { useState } from "react";

import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import closeSVGSrc from "../../../public/images/CloseIcon.svg";
import styles from "./cookieBanner.module.scss";

interface SetAcceptedCookiesArgs {
  acceptedCookies: boolean;
  storeToLocalstorage: boolean;
}

interface CookieBannerProps {
  acceptedCookies: boolean;
  setAcceptedCookies: ({}: SetAcceptedCookiesArgs) => void;
}

const CookieBanner = ({
  acceptedCookies,
  setAcceptedCookies,
}: CookieBannerProps) => {
  const [showBanner, setShowBanner] = useState<boolean>(!acceptedCookies);

  const onCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    setAcceptedCookies({ acceptedCookies: false, storeToLocalstorage: false });
    setShowBanner(false);
  };

  const onAcceptClick = (e: MouseEvent) => {
    e.preventDefault();
    setAcceptedCookies({ acceptedCookies: false, storeToLocalstorage: true });
    setShowBanner(false);
  };

  const onDeclineClick = (e: MouseEvent) => {
    e.preventDefault();
    setAcceptedCookies({ acceptedCookies: false, storeToLocalstorage: true });
    setShowBanner(false);
  };

  console.log("acceptedCookies: ", acceptedCookies);
  console.log("showBanner: ", showBanner);

  return showBanner ? (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <h4 className="heading-4">Cookies consent</h4>
        <div className={styles.close} onClick={onCloseClick}>
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
