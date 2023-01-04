//REACT
import React, { useEffect } from "react";
import { useRouter } from "next/router";
//STORE
import { useSelector } from "react-redux";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//PROP-TYPES
import PropTypes from "prop-types";
//INTL
import { IntlProvider } from "react-intl";
//LANGUAGES
import it from "../intl/it.json";
import en from "../intl/en.json";
//COMPONENTS
import { Navbar } from "./Navbar";
import Footer from "./footer";

const Layout = ({ children, itemsNavbar }) => {
  //STORE
  const language = useSelector(state => state.language.value);
  //ROUTER
  const router = useRouter();
  //STATE
  const isDesktop = useMediaQuery(768);
  const messages = {
    it: it,
    en: en,
  };

  //FUNCTIONS
  const setBodyOverflow = () => {
    let body = document.querySelector("body");
    if (body && router.pathname === "/designers/[...product]" && !isDesktop) {
      document.body.classList.remove("overflow-auto");
      document.body.classList.add("overflow-hidden");
    }
    if (body && router.pathname !== "/designers/[...product]") {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-auto");
    }
  };

  const errorMissingTranslation = () => {
    //console.log("Error MISSING TRANSLATION]")
  };

  // //USE-EFFECT
  useEffect(() => {
    setBodyOverflow();
  }, [router]);

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      onError={errorMissingTranslation}
    >
      <Navbar itemsNavbar={itemsNavbar} />
      <div style={{ marginTop: "130px" }}>{children}</div>
      {router.pathname !== "/designers/[...product]" && <Footer />}
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
