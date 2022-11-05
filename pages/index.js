//REACT
import React, { useState } from "react";
//API
import getAllArticles from "../api/articles";
//COMPONENTS
import ModalsIcons from "../components/modalsIcons";
import SliderMenu from "../components/slider-menu";
import SliderHomeCollection from "../templates/slider-home-collection";
import SliderArticles from "../components/slider-articles";
import AnimatedPage from "../components/animated-page";
import Layout from "../components/layout";
import Head from "next/head";
import Script from "next/script";
import { useSelector } from "react-redux";

const IndexPage = ({ articles }) => {
  //STORE
  const language = useSelector(state => state.language.value);
  //STATE
  const [show, setShown] = useState(false);
  articles = articles.data.allArticles;
  let selectSingleIcon;

  return (
    <>
      <Script
        type="text/javascript"
        src="https://cdn.iubenda.com/cs/iubenda_cs.js"
        async
      />
      <Script>{`var _iub = _iub || [];
        _iub.csConfiguration = {
        "lang":"${language}","siteId":2172061,"cookiePolicyId":22164738, 
          "banner": { 
            "acceptButtonDisplay":true,
            "customizeButtonDisplay":true,
            "acceptButtonColor":"#800000",
            "acceptButtonCaptionColor":"white",
            "customizeButtonColor":"#212121",
            "customizeButtonCaptionColor":"white",
            "rejectButtonColor":"#0073CE",
            "rejectButtonCaptionColor":"white",
            "position":"float-bottom-center",
            "textColor":"white",
            "backgroundColor":
            "#000001",
            "fontSizeBody":12 
          }
        };`}</Script>

      <Head>
        <title>Indice</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Layout articles={articles}>
        <AnimatedPage fullHeight>
          <SliderArticles articles={articles} />
          <SliderMenu />
          <SliderHomeCollection />
          {show && (
            <ModalsIcons
              selectSingleIcon={selectSingleIcon}
              setShown={setShown}
            />
          )}
        </AnimatedPage>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getAllArticles();
  return {
    props: { articles },
  };
}

export default IndexPage;
