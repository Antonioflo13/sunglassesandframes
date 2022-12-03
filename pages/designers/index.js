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
        <div className="mt-20">
          <div className="container-alphabetic">
            {alphabeticList.map((letter, index) => (
              <span
                style={
                  letterIndex === letter
                    ? {
                        marginLeft: "1rem",
                        borderBottom: "solid 1px black",
                      }
                    : { marginLeft: "1rem", cursor: "pointer" }
                }
                key={index}
                onClick={() => setLetterIndex(letter)}
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
                                  ? "/designers/[designer]"
                                  : "/designers/[designer]",
                              query: { designer: collection.handle },
                            }}
                          >
                            <span>
                              <motion.h2 className=" sunglassesandframes text-xs md:text-xl font-bold uppercase">
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
  const monthlyHighlight = await getMonthlyHighlight();
  return {
    props: { collections, monthlyHighlight },
  };
}

export default CollectionsPage;
