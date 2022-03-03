import { useContext, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./cookies.module.scss";
import CookiesContext, { CookiesConsent } from "~/context/cookies";

import CookiesImgSrc from "../../public/images/cookies/Cookies.png";

import { PAGE_TITLE } from "../../constants";

interface CookieData {
  name: string;
  provider: string;
  purpose: string;
  expiry: string;
  type: string;
}

const COOKIES_DATA: CookieData[] = [
  {
    name: "_dc_gtm_UA-#",
    provider: "Google",
    purpose:
      "Used by Google Tag Manager to control the loading of a Google Analytics script tag.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "ga",
    provider: "Google",
    purpose:
      "Registers a unique ID that is used to generate statistical data on how the visitor uses the website.",
    expiry: "2 years",
    type: "HTTP",
  },
  {
    name: "_ga_#",
    provider: "Google Tag Manager",
    purpose:
      "Used by Google Analytics to collect data on the number of times a user has visited the website, as well as dates of the first and most recent visits.",
    expiry: "2 years",
    type: "HTTP",
  },
  {
    name: "gat",
    provider: "Google",
    purpose:
      "Used by Google Analytics to reduce the number of network requests made to external sites.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "_gid",
    provider: "Google",
    purpose:
      "Registers a unique ID that is used to generate statistical data on how the visitor uses the website.",
    expiry: "1 day",
    type: "HTTP",
  },
  {
    name: "collect",
    provider: "Google",
    purpose:
      "Used to send data to Google Analytics about the visitor's device and behaviour. This tracks the visitor across devices and marketing channels.",
    expiry: "1 day",
    type: "HTTP",
  },
];

const Cookies = () => {
  const { cookiesConsent, cookiesConsentDate, setCookiesConsent } =
    useContext(CookiesContext);

  const settingsString = useMemo(() => {
    if (!cookiesConsent) {
      return "No settings saved. No cookies will be stored by this page.";
    }
    if (cookiesConsent) {
      const dateTimeStamp = parseInt(cookiesConsentDate);
      const consentDateString = new Date(dateTimeStamp).toLocaleDateString();

      if (cookiesConsent === "declined") {
        return `You declined cookies on ${consentDateString}. No cookies will be stored by this page.`;
      }
      if (cookiesConsent === "accepted") {
        return `You accepted cookies on ${consentDateString}. The page will store all the google analytics cookies listed above.`;
      }
    }
  }, [cookiesConsent, cookiesConsentDate]);

  const onConsentButtonClick = (cookiesConsent: CookiesConsent): void => {
    setCookiesConsent(cookiesConsent);
  };

  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE}: Cookies`}</title>
        <meta
          name="description"
          content="Cookies page that includes a list of cookies, stored user preferences and user preference controls.."
        ></meta>
      </Head>
      <section
        className={`content-container ${styles.container}`}
        data-testid="cookies-section"
      >
        <h1 className="heading-1">Tracking cookies</h1>
        <div className={styles.imageContainer}>
          <Image
            alt="a lot of colorful cookies"
            layout="fill"
            objectFit="cover"
            src={CookiesImgSrc}
          />
        </div>
        <h2 className="heading-3 margin-top-3">List of tracking cookies</h2>
        <p className="text margin-bottom-3">
          The following is a list of all the Google Analytics tracking cookies
          that this page would like to save. All of these are optional and will
          not be stored without your permission. You can review and change your
          settings above.
        </p>
        <table className={`${styles.table}`} data-testid="cookies-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES_DATA.map(({ name, provider, purpose, expiry, type }) => (
              <tr key={`cookie-${name}-row`}>
                <td>{name}</td>
                <td>{provider}</td>
                <td>{purpose}</td>
                <td>{expiry}</td>
                <td>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="heading-3">Your settings</h2>
        <p
          className="text"
          data-testid="cookies-settings-text"
        >{`${settingsString}`}</p>
        <p className="text">
          You can change your current settings by using the buttons below. In
          case you have previously accepted cookies and would like to revoke
          your permission, delete the cookies from your browser after clicking
          ‘Decline’, and refresh the page window. This will make sure that the
          tracking script is no longer running.
        </p>
        <h5
          className={`heading-5 ${styles.button}`}
          onClick={() => onConsentButtonClick("declined")}
        >
          Decline cookies
        </h5>
        <h5
          className={`heading-5 ${styles.button}`}
          onClick={() => onConsentButtonClick("accepted")}
        >
          Accept cookies
        </h5>
      </section>
    </>
  );
};

export default Cookies;
