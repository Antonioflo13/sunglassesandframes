//REACT
import React, { useEffect, useState } from "react";
//HOOKS
import cookie from "../hooks/cookie";
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
import { useSelector } from "react-redux";

const IndexPage = ({ articles }) => {
  //STORE
  const language = useSelector(state => state.language.value);
  //STATE
  const [show, setShown] = useState(false);
  articles = articles.data.allArticles;
  let selectSingleIcon;
  //EFFECT
  useEffect(() => {
    cookie(language);
  }, [language]);

  return (
    <>
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
