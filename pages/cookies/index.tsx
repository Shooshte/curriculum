import { useContext, useMemo } from "react";
import styles from "./cookies.module.scss";
import CookiesContext, { CookiesConsent } from "~/context/cookies";

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
      "Used by Google Analytics to collect data on the number of times a user has visited the website as well as dates for the first and most recent visit.",
    expiry: "2 years",
    type: "HTTP",
  },
  {
    name: "gat",
    provider: "Google",
    purpose: "Used by Google Analytics to throttle request rate.",
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
      "Used to send data to Google Analytics about the visitor's device and behavior. Tracks the visitor across devices and marketing channels.",
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
        return `You declined saving cookies on ${consentDateString}. No cookies will be stored by this page.`;
      }
      if (cookiesConsent === "accepted") {
        return `You accepted saving cookies on ${consentDateString}. The page will store all the google analytics cookies listed above.`;
      }
    }
  }, [cookiesConsent, cookiesConsentDate]);

  const onConsentButtonClick = (cookiesConsent: CookiesConsent): void => {
    setCookiesConsent(cookiesConsent);
  };

  return (
    <section className={styles.container}>
      <h1 className="heading-2">Tracking cookies</h1>
      <h2 className="heading-3">List of tracking cookies</h2>
      <p className="text margin-bottom-3">
        A list of all the google analytics tracking cookies that this page would
        like to save. All of these are optional and will not be saved unless you
        allow it. You can review and change your settings below the table.
      </p>
      <table className={`${styles.table} text`} data-testId="cookies-table">
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
      <p className="text">{`${settingsString}`}</p>
      <p className="text">
        You can change your current settings by using the buttons below. In case
        you have previously accepted cookies and would like to revoke your
        permission, delete the cookies from your browser after clicking decline,
        and refresh the page window. This will make sure that the tracking
        script is no longer running.
      </p>
      <h5
        className={`heading-5 ${styles.button}`}
        onClick={() => onConsentButtonClick("declined")}
      >
        Decline storing cookies
      </h5>
      <h5
        className={`heading-5 ${styles.button}`}
        onClick={() => onConsentButtonClick("accepted")}
      >
        Accept storing cookies
      </h5>
    </section>
  );
};

export default Cookies;
