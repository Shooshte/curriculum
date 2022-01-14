// Components
import Layout from "~/components/layout";

// Styles
import "../styles/reset.scss";
import "../styles/global.scss";

// Types
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
