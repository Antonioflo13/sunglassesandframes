//NEXT
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
//REACT
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
//INTL
import { IntlProvider } from "react-intl";
import it from "../intl/it.json";
//STYLE
import "../styles/globals.css";
//STORE
import { store } from "../store";
import { Provider } from "react-redux";
//ROUTER
import { useRouter } from "next/router";
//COMPONENTS
import LoadingPage from "../components/loadingPage";

function MyApp({ Component, pageProps }: AppProps) {
  //ROUTER
  const router = useRouter();
  //STATE
  const [loadingPage, setLoadingPage] = useState(false);

  //EFFECT
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoadingPage(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoadingPage(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Sunglassesandframes</title>
      </Head>
      {process.env.NEXT_PUBLIC_NODE !== "development" && <Analytics />}
      <Provider store={store}>
        <IntlProvider locale={"it"}>
          {<Component {...pageProps} />}
        </IntlProvider>
      </Provider>
    </>
  );
}

export default MyApp;
