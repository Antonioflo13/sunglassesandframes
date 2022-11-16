//REACT
import React, { useState, useRef } from "react";
//NEXT
import Link from "next/link";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import Breadcrumbs from "../../components/breadcrumbs";
import { motion } from "framer-motion";
import Layout from "../../components/layout";
//API
import { getAllCollections } from "../../api/collections";
import Head from "next/head";
import AnchorLink from "react-anchor-link-smooth-scroll-v2";

const CollectionsPage = ({ collections }) => {
  collections = collections.data.collections.nodes;
  //HOOKS
  const isDesktop = useMediaQuery("768");
  //generates alphabetical order products
  let collectionsListByAlphabet = [];
  let alphabeticList = [];
  for (const product of collections) {
    alphabeticList.push(product.title[0].toUpperCase());
  }
  alphabeticList = [...new Set(alphabeticList)];
  for (const letter of alphabeticList) {
    collectionsListByAlphabet.push({ letter: letter, collectionsList: [] });
  }
  for (const product of collections) {
    for (const collectionListByAlphabet of collectionsListByAlphabet) {
      if (product.title[0].toUpperCase() === collectionListByAlphabet.letter) {
        collectionListByAlphabet.collectionsList.push(product);
      }
    }
  }

  collectionsListByAlphabet.map(
    collectionsList => (collectionsList.collectionsList[0].viewLetter = true)
  );

  const [indice, setIndice] = useState("A");

  const myRef = useRef(null);
  const executeScroll = letter => {
    const letterId = document.getElementById(letter).offsetTop;
    const container = document.getElementById("container");

    container.scrollTo({
      top: letterId - 240,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <Head>
        <title>sunglassesandframes - Collections</title>
        <meta name="description" content="Designers" />
      </Head>
      <AnimatedPage margins={true}>
        {/* {isDesktop && <Breadcrumbs title="Designers" />} */}
        <div className="mt-20">
          <div className="container-alphabetic">
            {alphabeticList.map(letter => (
              <span
                className="item"
                style={
                  indice === letter
                    ? { marginLeft: "1rem", borderBottom: "solid 1px black" }
                    : { marginLeft: "1rem" }
                }
                key={letter + 1}
                onClick={() => setIndice(letter)}
              >
                <span onClick={() => executeScroll(letter)}>{letter}</span>
              </span>
            ))}
          </div>
          <div className="containerCollections mt-10">
            <div id="container" className="containerDesigner">
              <ul>
                {collectionsListByAlphabet.map((letter, index) => (
                  <React.Fragment key={index}>
                    {letter.collectionsList.map((collection, index) => (
                      <li key={index}>
                        {collection.viewLetter && (
                          <div
                            ref={myRef}
                            className="font-semibold text-2xl font-serif mb-3"
                          >
                            <section id={letter.letter}>
                              {letter.letter}
                            </section>
                          </div>
                        )}
                        <div
                          className={`${
                            collection.products?.nodes?.length > 0
                              ? "available"
                              : "unavailable"
                          } mb-6`}
                        >
                          <Link
                            style={{
                              pointerEvents:
                                !collection.products?.nodes?.length && "none",
                              touchAction:
                                !collection.products?.nodes?.length && "none",
                            }}
                            href={{
                              pathname:
                                collection.handle ===
                                "sunglassesandframes-capsule-collection"
                                  ? "/collections/[collection]"
                                  : "/collections/[collection]",
                              query: { collection: collection.handle },
                            }}
                          >
                            <span>
                              <motion.h2 className=" sunglassesandframes text-xl font-bold uppercase">
                                {collection.title}
                              </motion.h2>
                              {/*<p className="text-xs mt-2">{collection.description}</p>*/}
                            </span>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="containerCollectionPromo"></div>
          </div>
        </div>
        {/*{!isDesktop && <Breadcrumbs title="Boutiques" />}*/}
      </AnimatedPage>
      <style jsx="true">
        {`
          .container-alphabetic {
            text-align: center;
          }
          .unavailable:hover {
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
          }

          .available:hover {
            color: #800001;
            transition: color 0.2s ease-in-out;
          }

          .containerDesigner {
            width: 50%;
            height: 70vh;
            overflow-y: scroll;
          }

          ::-webkit-scrollbar {
            display: none;
          }

          .containerCollectionPromo {
            width: 40%;
            background-color: black;
            height: 70vh;
            border-radius: 20px;
          }

          .containerCollections {
            display: flex;
            justify-content: space-between;
          }

          .collection {
            margin-top: 20px;
          }

          @media (max-width: 768px) {
            .containerDesigner {
            }
          }
        `}
      </style>
    </Layout>
  );
};

export async function getStaticProps() {
  const collections = await getAllCollections();
  return {
    props: { collections },
  };
}

export default CollectionsPage;
