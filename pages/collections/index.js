//REACT
import React from "react";
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

  console.log("alphabeticList", alphabeticList);

  return (
    <Layout>
      <Head>
        <title>sunglassesandframes - Collections</title>
        <meta name="description" content="Designers" />
      </Head>
      <AnimatedPage margins={true}>
        {/* {isDesktop && <Breadcrumbs title="Designers" />} */}
        <div className="mt-20">
          <div>
            {alphabeticList.map(item => (
              <span
                className="item"
                style={{ marginLeft: "10px" }}
                key={item + 1}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="containerCollections mt-10">
            <div className="containerDesigner">
              <ul>
                {collectionsListByAlphabet.map((letter, index) => (
                  <React.Fragment key={index}>
                    {letter.collectionsList.map((collection, index) => (
                      <li key={index}>
                        {collection.viewLetter && (
                          <div className="font-semibold text-2xl font-serif italic mb-3 text-sunglassesandframes-red">
                            {letter.letter}
                          </div>
                        )}

                        <div
                          className={`${
                            collection.products?.edges?.length > 0
                              ? "available"
                              : "unavailable"
                          } mb-6`}
                        >
                          <Link
                            href={{
                              pathname:
                                collection.products?.edges?.length > 0 &&
                                collection.handle ===
                                  "sunglassesandframes-capsule-collection"
                                  ? "/collections/[collection]"
                                  : "/collections/[collection]",
                              query: { collection: collection.handle },
                            }}
                          >
                            <span>
                              <motion.h2 className=" text-sunglassesandframes text-xl font-bold uppercase">
                                {collection.title}
                              </motion.h2>
                              {/* <p className="text-xs mt-2">
                              {collection.description}
                            </p> */}
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
        {/* {!isDesktop && <Breadcrumbs title="Boutiques" />} */}
      </AnimatedPage>
      <style jsx="true">
        {`
          .unavailable:hover {
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
          }

          .available:hover {
            color: #800001;
            transition: color 0.2s ease-in-out;
          }

          .containerDesigner {
            width: 40%;
          }

          .containerCollectionPromo {
            width: 60%;
            background-color: black;
            height: 100vh;
          }

          .containerCollections {
            display: flex;
            gap: 10rem;
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
