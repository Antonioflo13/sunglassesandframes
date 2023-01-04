//REACT
import React, { useEffect, useState } from "react";
//NEXT
import Head from "next/head";
import Script from "next/script";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/modules/language";
import {
  setMonthCollectionInfo,
  setMonthCollection,
} from "../store/modules/monthCollection";
import { setItemsNavBar } from "../store/modules/itemsNavBar";
import { setItemsShopBy } from "../store/modules/itemsShopBy";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//API
import getAllArticles from "../api/articles";
import getShopBy from "../api/shopBy";
import getMonthlyHighlight from "../api/monthlyHighlight";
import getShopByItems from "../api/ShopByItems";
import { getCollection } from "../api/collections";
//COMPONENTS
import SliderMenu from "../components/slider-menu";
import SliderHomeCollection from "../templates/slider-home-collection";
import SliderArticles from "../components/slider-articles";
import AnimatedPage from "../components/animated-page";
import Layout from "../components/layout";
import Crisp from "../components/crisp";
import SubscribeForm from "../components/subscribe-form";

const IndexPage = ({
  articles,
  shopBy,
  monthCollectionInfo,
  monthCollection,
  itemsNavbar,
}) => {
  //HOOKS
  const isDesktop = useMediaQuery(768);
  //STORE
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.value);
  //STATE
  const allShopBy = shopBy?.data?.allShopBies;
  articles = articles.data.allArticles;
  //FUNCTION
  const setLanguageByBrowser = () => {
    if (navigator.language !== "it-IT") {
      dispatch(setLanguage("en"));
    }
  };

  const handlerCookieScript = () => {
    if (localStorage.getItem("cookie-accepted") === null) {
      let script = document.createElement("script");
      script.src = "https://cdn.iubenda.com/cs/iubenda_cs.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    dispatch(setMonthCollectionInfo(JSON.stringify(monthCollectionInfo)));
    dispatch(setMonthCollection(JSON.stringify(monthCollection)));
    dispatch(setItemsNavBar(JSON.stringify(itemsNavbar)));
    dispatch(setItemsShopBy(JSON.stringify(shopBy)));

    handlerCookieScript();
    setLanguageByBrowser();
  }, []);

  return (
    <>
      <Script>
        {`
        var _iub = _iub || [];
          _iub.csConfiguration = {
        "lang":"${language}","siteId":2172061,"cookiePolicyId":22164738, 
          "banner": { 
            "acceptButtonDisplay":true,
            "customizeButtonDisplay":true,
            "acceptButtonColor":"#000000",
            "acceptButtonCaptionColor":"white",
            "customizeButtonColor":"#212121",
            "customizeButtonCaptionColor":"white",
            "rejectButtonColor":"#0073CE",
            "rejectButtonCaptionColor":"white",
            "position":"float-bottom-center",
            "textColor":"black",
            "backgroundColor":
            "#FFF",
            "fontSizeBody":12 
          },
           "callback": {
                "onReady": function(event) {
                    var banner = document.getElementById('iubenda-cs-banner');
                  
                    if (banner && !localStorage.getItem("cookie-accepted")) {
                      bannerHTML = banner.innerHTML;
                    }
                },
                "onPreferenceFirstExpressed": function(event) {
                    if(event.consent) {
                        localStorage.setItem("cookie-accepted", event.consent);
                    }
                    _iub.cons_instructions.push(["submit",
                        {
                            consent: {
                                subject: {},
                                preferences: event,
                                legal_notices: [{
                                    identifier: "cookie_policy"
                                }],
                                proofs: [{
                                    content: JSON.stringify(event),
                                    form: bannerHTML
                                }]
                            }
                        },
                        {
                            success: function() {
                                
                            },
                            error: function() {
                               
                            }
                        }
                    ]);
                }
            }
        };
        `}
      </Script>
      <Head>
        <title>sunglassesandframes</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Layout articles={articles} itemsNavbar={itemsNavbar}>
        <AnimatedPage fullHeight>
          <SliderArticles articles={articles} />
          <SliderHomeCollection />
          <SliderMenu allShopBy={allShopBy} />
          {isDesktop && <SubscribeForm />}
          <Crisp />
        </AnimatedPage>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getAllArticles();
  const shopBy = await getShopBy();
  const monthCollectionInfo = await getMonthlyHighlight();
  const monthCollection = await getCollection("month", 30);
  const itemsNavbar = await getShopByItems();
  return {
    props: {
      articles,
      shopBy,
      monthCollectionInfo,
      monthCollection,
      itemsNavbar,
    },
    revalidate: 1000,
  };
}

export default IndexPage;
