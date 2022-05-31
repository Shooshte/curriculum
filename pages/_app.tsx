// npm packages
import Script from "next/script";
import { useEffect, useMemo, useReducer } from "react";
import { useRouter } from "next/router";
// Components
import Layout from "~/components/layout";
import { SessionProvider } from "next-auth/react";
// Scripts
import * as gtag from "~/lib/gtag";
// Styles
import "~/styles/reset.scss";
import "~/styles/global.scss";
// constants

import CookiesContext, { CookiesConsent } from "~/context/cookies";

const COOKIES_LOCALSTORAGE_ITEM = "CookiesConsent";
const COOKIES_LOCALSTORAGE_DATE = "CookiesConsentDate";

const consentReducer = (state, cookiesConsent: CookiesConsent) => {
  return cookiesConsent;
};

const consentDateReducer = (state, consentDate: string) => {
  return consentDate;
};

// Types
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // Local state for setting the cookies consent string
  const [cookiesConsent, setCookiesConsent] = useReducer(
    consentReducer,
    undefined
  );

  // use Effect that handles sending analytics data if cookies consent was given on every route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (cookiesConsent === "accepted") {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [cookiesConsent, router.events]);

  const [cookiesConsentDate, setCookiesConsentDate] = useReducer(
    consentDateReducer,
    undefined
  );

  // use Effect that handles retrieving cookies consent status and date from localStorage
  useEffect(() => {
    const consent = localStorage.getItem(COOKIES_LOCALSTORAGE_ITEM);
    if (consent) {
      setCookiesConsent(consent as CookiesConsent);
    }
    const consentDate = localStorage.getItem(COOKIES_LOCALSTORAGE_DATE);
    if (consentDate) {
      setCookiesConsentDate(consentDate);
    }
  }, []);

  const cookiesContextValue = useMemo(() => {
    const handleSetCookiesConsent = (cookiesConsent: CookiesConsent) => {
      const consentDate = new Date().valueOf().toString();
      setCookiesConsent(cookiesConsent);
      setCookiesConsentDate(consentDate);
      localStorage.setItem(COOKIES_LOCALSTORAGE_ITEM, cookiesConsent);
      localStorage.setItem(COOKIES_LOCALSTORAGE_DATE, consentDate);
    };

    return {
      cookiesConsent,
      cookiesConsentDate,
      setCookiesConsent: handleSetCookiesConsent,
    };
  }, [cookiesConsent, cookiesConsentDate]);

  return (
    <>
      {cookiesConsent === "accepted" ? (
        <>
          <Script
            data-testid="gtag-track"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            data-testid="gtag-init"
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
          });
          `,
            }}
          />
        </>
      ) : null}
      <SessionProvider session={pageProps.session}>
        <CookiesContext.Provider value={cookiesContextValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesContext.Provider>
      </SessionProvider>
    </>
  );
};

export default App;
