import Head from "next/head";
//REACT
import type { AppProps } from "next/app";
//INTL
import { IntlProvider } from "react-intl";
import it from "../intl/it.json";
//STYLE
import "../styles/globals.css";
//STORE
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Indice</title>
      </Head>
      <Provider store={store}>
        <IntlProvider locale={"it"}>
          <Component {...pageProps} />˙
        </IntlProvider>
      </Provider>
    </>
  );
}

export default MyApp;
