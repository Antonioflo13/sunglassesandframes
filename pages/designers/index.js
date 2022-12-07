//REACT
import React, { useState, useRef } from "react";
//NEXT
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//FRAMER
import { motion } from "framer-motion";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import Layout from "../../components/layout";
//API
import { getAllCollections } from "../../api/collections";
import getMonthlyHighlight from "../../api/monthlyHighlight";

const CollectionsPage = ({ collections, monthlyHighlight }) => {
  collections = collections.data.collections.nodes;

  //HOOKS
  const isDesktop = useMediaQuery("768");

  const myRef = useRef(null);

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

  //STATE
  const [letterIndex, setLetterIndex] = useState(alphabeticList[0]);

  //FUNCTIONS
  const executeScroll = letter => {
    const letterId = document.getElementById(letter).offsetTop;
    const container = document.getElementById("container");

    container.scrollTo({
      top: letterId - 240,
      behavior: "smooth",
    });
  };

  const itemMonthlyHighlight = monthlyHighlight?.data?.allMonthlyHighlights[0];

  return (
    <Layout>
      <Head>
        <title>sunglassesandframes - Collections</title>
        <meta name="description" content="Designers" />
      </Head>
      <AnimatedPage margins={true}>
        <div className="mt-10">
          {isDesktop && <h1 className="text-center mb-5">DESIGNER A - Z</h1>}
          <div className="container-alphabetic">
            {alphabeticList.map((letter, index) => (
              <span
                className="topLetter"
                style={
                  letterIndex === letter
                    ? {
                        borderBottom: "solid 1px black",
                      }
                    : {}
                }
                key={index}
                onClick={() => setLetterIndex(letter)}
              >
                <span
                  className="text-sunglassesandframes text-l"
                  style={
                    letterIndex === letter
                      ? { fontWeight: "bold", fontFamily: "ui-monospace" }
                      : {}
                  }
                  onClick={() => executeScroll(letter)}
                >
                  {letter}
                </span>
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
                          <div ref={myRef} className="marginCustomDesigner">
                            <section
                              className="font-semibold text-2xl bigLetter"
                              id={letter.letter}
                            >
                              {letter.letter}
                            </section>
                          </div>
                        )}
                        <div
                          className={`${
                            collection.products?.nodes?.length > 0
                              ? "available"
                              : "unavailable"
                          }`}
                          style={{ marginBottom: "0.3rem" }}
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
                                  ? "/designers/[designer]"
                                  : "/designers/[designer]",
                              query: { designer: collection.handle },
                            }}
                          >
                            <span>
                              <motion.h2 className=" sunglassesandframes text-xs md:text-xl font-bold">
                                <div className="collectionTitle">
                                  {collection.title}
                                </div>
                              </motion.h2>
                            </span>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            {isDesktop && (
              <div className="containerCollectionPromo">
                <Link href={`designers/${itemMonthlyHighlight?.handle}`}>
                  <div className="adv">
                    <Image
                      fill="true"
                      style={{ objectFit: "cover" }}
                      sizes="100%"
                      priority={true}
                      src={itemMonthlyHighlight?.backgroundimage?.url}
                      placeholder="blur"
                      blurDataURL={
                        itemMonthlyHighlight?.backgroundimage?.blurUpThumb
                      }
                      alt="advImage"
                    />
                    <div className="containerTextAdv">
                      <p className="textAdv">
                        {itemMonthlyHighlight?.designer}
                      </p>
                      <p className="textAdv centertext">
                        {itemMonthlyHighlight?.text}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </AnimatedPage>
      <style jsx="true">
        {`
          .container-alphabetic {
            text-align: center;
            overflow-x: scroll;
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
            overflow-x: hidden;
          }

          ::-webkit-scrollbar {
            display: none;
          }

          .containerCollectionPromo {
            width: 40%;
            background-color: black;
            height: 70vh;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
          }

          .containerTextAdv {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
            position: absolute;
            font-weight: bold;
            color: white;
            bottom: 30%;
            text-shadow: 5px 5px 5px rgb(0 0 0 / 50%);
          }

          .textAdv {
            text-transform: uppercase;
          }

          .containerCollections {
            display: flex;
            justify-content: space-between;
          }

          .collection {
            margin-top: 20px;
          }

          .collectionTitle {
            text-transform: lowercase;
            margin-left: 4rem;
          }

          .collectionTitle:first-letter {
            text-transform: uppercase;
          }

          .topLetter {
            cursor: pointer;
            margin-right: 1.5rem;
          }

          .bigLetter {
            fontsize: 40px;
            line-height: 8rem;
          }

          .marginCustomDesigner {
            margin-bottom: -64px;
          }

          @media (max-width: 768px) {
            .marginCustomDesigner {
              margin-bottom: 0px;
            }
            .bigLetter {
              font-size: 13px;
              line-height: 2rem;
              margin-bottom: 5px;
            }
            .collectionTitle {
              margin-left: 0px;
              font-size: 16px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export async function getStaticProps() {
  const collections = await getAllCollections();
  const monthlyHighlight = await getMonthlyHighlight();
  return {
    props: { collections, monthlyHighlight },
  };
}

export default CollectionsPage;
