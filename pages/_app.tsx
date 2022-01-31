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

type CookiesConsent = "accepted" | "declined";

// Types
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
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
  }, [router.events]);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIES_LOCALSTORAGE_ITEM);
    if (consent) {
      setCookiesConsent(consent);
    }
  }, []);

  const [cookiesConsent, setCookiesConsent] = useState<string>();

  const handleSetAcceptedCookies = (cookiesConsent: CookiesConsent) => {
    setCookiesConsent(cookiesConsent);
    localStorage.setItem(COOKIES_LOCALSTORAGE_ITEM, cookiesConsent);
  };

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
            page_path: window.location.pathname,
          });
          `,
            }}
          />
        </>
      ) : null}
      <Layout
        cookiesConsent={cookiesConsent}
        setAcceptedCookies={handleSetAcceptedCookies}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
