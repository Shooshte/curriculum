import { createContext } from "react";

export type CookiesConsent = "accepted" | "declined";

export type CookiesContextState =
  | {
      cookiesConsent?: CookiesConsent;
      cookiesConsentDate?: string;
      setCookiesConsent: (cookiesConsent?: CookiesConsent) => void;
    }
  | undefined;

export const CookiesContext = createContext<CookiesContextState>(undefined);

export default CookiesContext;
