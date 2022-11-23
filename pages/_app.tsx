//NEXT
import { Analytics } from "@vercel/analytics/react";
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/reset-min.css"
          integrity="sha256-QlHlZdbSVxaYkUHxhMFhAj/L3pJiW1LuomSCONXBWms="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
          integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
          crossOrigin="anonymous"
        />
      </Head>
      {process.env.NEXT_PUBLIC_NODE !== "development" && <Analytics />}
      <Provider store={store}>
        <IntlProvider locale={"it"}>
          <Component {...pageProps} />˙
        </IntlProvider>
      </Provider>
    </>
  );
}

export default MyApp;
