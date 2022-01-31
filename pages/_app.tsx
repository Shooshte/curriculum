// npm packages
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Components
import Layout from "~/components/layout";
// Scripts
import * as gtag from "~/lib/gtag";
// Styles
import "~/styles/reset.scss";
import "~/styles/global.scss";
import "~/styles/code.scss";

const COOKIES_LOCALSTORAGE_ITEM = "CookiesConsent";

interface SetAcceptedCookiesArgs {
  acceptedCookies: boolean;
  storeToLocalstorage: boolean;
}

// Types
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (acceptedCookies) {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIES_LOCALSTORAGE_ITEM);
    console.log("consent: ", consent);
    setAcceptedCookies(consent ? true : false);
  }, []);

  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false);

  const handleSetAcceptedCookies = ({
    acceptedCookies,
    storeToLocalstorage,
  }: SetAcceptedCookiesArgs) => {
    setAcceptedCookies(acceptedCookies);
    if (storeToLocalstorage) {
      localStorage.setItem(
        COOKIES_LOCALSTORAGE_ITEM,
        JSON.stringify(acceptedCookies)
      );
    }
  };

  return (
    <>
      {acceptedCookies ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
            }}
          />
        </>
      ) : null}
      <Layout
        acceptedCookies={acceptedCookies}
        setAcceptedCookies={handleSetAcceptedCookies}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
