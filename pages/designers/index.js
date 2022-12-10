//REACT
import React, { useState, useEffect } from "react";
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

//Add FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CollectionsPage = ({ collections, monthlyHighlight }) => {
  const [searchInput, setSearchInput] = useState("");
  const [collectionsListByAlphabet, setCollectionsListByAlphabet] = useState(
    []
  );
  const [filteredCollectionsList, setFilteredCollectionsList] = useState([]);
  collections = collections.data.collections.nodes;
  //HOOKS
  const isDesktop = useMediaQuery("768");

  //STATE
  const [letterIndex, setLetterIndex] = useState("");
  const [alphabeticList, setAlphabeticList] = useState([]);

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

  useEffect(() => {
    //Get by SHOPBY menu collections
    let items = [];
    let itemsNavBar = [];
    let itemsShopBy = [];

    if (localStorage.getItem("itemsShopBy")) {
      itemsNavBar = JSON.parse(localStorage.getItem("itemsNavBar")).data
        .shopByItem.items;
    }

    if (localStorage.getItem("itemsShopBy")) {
      itemsShopBy = JSON.parse(localStorage.getItem("itemsShopBy")).data
        .allShopBies;
    }

    for (const item of itemsShopBy) {
      items.push(item.item.toLowerCase());
    }

    for (const item of itemsNavBar) {
      for (const itemElement of item.item) {
        items.push(itemElement.item.toLowerCase());
      }
    }
    items = [...new Set(items)];

    // Filter designers by SHOPBY collections
    collections = collections.filter(
      collection => !items.includes(collection.title.toLowerCase())
    );

    // Set alphabeticList by collections
    let alphabeticList = [];
    for (const product of collections) {
      alphabeticList.push(product.title[0].toUpperCase());
    }

    alphabeticList = [...new Set(alphabeticList)];
    setAlphabeticList(alphabeticList);
    setLetterIndex(alphabeticList[0]);

    let arr = [];
    let id = 0;
    for (const letter of alphabeticList) {
      arr.push({ id: ++id, letter: letter, collectionsList: [] });
    }
    for (const product of collections) {
      for (const collectionListByAlphabet of arr) {
        if (
          product.title[0].toUpperCase() === collectionListByAlphabet.letter
        ) {
          collectionListByAlphabet.collectionsList.push(product);
        }
      }
    }
    arr.map(
      collectionList => (collectionList.collectionsList[0].viewLetter = true)
    );
    setCollectionsListByAlphabet(arr);
    setFilteredCollectionsList(arr);
  }, []);

  //SearchInput
  const changeInputHandler = e => {
    setSearchInput(e.target.value);
    let arr = [...collectionsListByAlphabet];
    let newArr = [];
    let newItem = {};
    for (let item of arr) {
      let newCollectionsList = [];
      for (let collection of item.collectionsList) {
        if (collection.handle.includes(e.target.value)) {
          newCollectionsList.push(collection);
        }
      }
      if (newCollectionsList.length) {
        newItem = { ...item, collectionsList: [...newCollectionsList] };
        newArr.push(newItem);
      }
    }
    newArr.map(collection => {
      if (collection.collectionsList.length) {
        collection.collectionsList.map(
          collection => (collection.viewLetter = false)
        );
        collection.collectionsList[0].viewLetter = true;
      }
    });

    setFilteredCollectionsList(newArr);
  };

  return (
    <Layout>
      <Head>
        <title>sunglassesandframes - Designers</title>
        <meta name="description" content="Designers" />
      </Head>
      <AnimatedPage margins={true}>
        <div style={{ marginTop: "3rem" }}>
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
            {!isDesktop && (
              <label className="relative block w-[100%] md:w-[50%] m-auto mt-5">
                <FontAwesomeIcon
                  className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 w-[1rem] h-[1rem]"
                  icon={faSearch}
                />

                <input
                  autoFocus
                  value={searchInput}
                  onChange={changeInputHandler}
                  className="border-2 border-black rounded-xl py-1 px-4 bg-white placeholder-gray-400 text-black appearance-none w-full block pl-12 focus:outline-none"
                />
              </label>
            )}
          </div>
          <div className="containerCollections mt-10">
            <div id="container" className="containerDesigner">
              {filteredCollectionsList.length > 0 ? (
                <ul>
                  {filteredCollectionsList.map((letter, indexLetter) => (
                    <React.Fragment key={letter.id}>
                      {letter.collectionsList.map(collection => (
                        <li key={collection.id}>
                          {collection.viewLetter && (
                            <div className="marginCustomDesigner">
                              <section
                                className={`font-semibold bigLetter ${
                                  indexLetter === 0 ? "noMarginTop" : ""
                                }`}
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
              ) : (
                <p className="text-xl text-center overflow-wrap">
                  Didn't find any designer with name: <br />
                  <span className="font-bold search-not-found">
                    {searchInput}
                  </span>
                </p>
              )}
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
          .search-not-found {
            font-weight: bold;
            overflow-wrap: break-word;
          }
          .container-alphabetic {
            text-align: center;
            overflow-x: scroll;
          }
          .unavailable:hover {
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
          }

          .available:hover {
            font-size: 25px;
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

          .noMarginTop {
            margin-top: -15px !important;
          }

          .bigLetter {
            font-size: 40px;
            margin-bottom: 50px;
            margin-top: 50px;
          }

          .marginCustomDesigner {
            margin-bottom: -88px;
          }

          @media (max-width: 768px) {
            .marginCustomDesigner {
              margin-bottom: 0;
            }
            .bigLetter {
              font-size: 13px;
              line-height: 2rem;
              margin-bottom: 5px;
            }
            .collectionTitle {
              margin-left: 0;
              font-size: 16px;
            }
            .containerDesigner {
              width: 100%;
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
