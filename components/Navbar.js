//REACT
import React, { useState, useEffect } from "react";

//NEXT
import Link from "next/link";
import { useRouter } from "next/router";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setDialogContactShow } from "../store/modules/dialogContact";
import { setSideBarShow } from "../store/modules/sideBar";
import { setCartContent } from "../store/modules/cart";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
import { getCookie } from "../utils/cookie";
//FRAMER-MOTION
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Sidebar from "../components/sidebar";
import Contact from "../components/contact";
//IMAGES
import logo from "../assets/images/logo.png";
import menuBurgher from "../assets/images/menu-burger.svg";
import cartIcon from "../assets/images/shopping-bag.svg";
import homeIcon from "../assets/images/home.svg";

import Image from "next/image";

import AlgoliaSearch from "../components/algolia-search";

//Add FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

export const Navbar = () => {
  //ROUTER
  const pathName = useRouter().pathname;
  //STORE
  const dispatch = useDispatch();
  const showDialogContact = useSelector(state => state.dialogContact.value);
  const showSideBar = useSelector(state => state.sideBar.value);
  const cart = useSelector(state => JSON.parse(state.cart.value));

  //STATE
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [monthCollectionInfo, setMonthCollectionInfo] = useState({});
  const [itemsNavbar, setItemsNavbar] = useState([]);
  const [viewSecondSidebar, setViewSecondSidebar] = useState(false);
  const [viewThirdSidebar, setViewThirdSidebar] = useState(false);

  //HOOKS
  const isDesktop = useMediaQuery(768);

  // FUNCTIONS
  const totalQuantity = cart?.lineItems
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  // EFFECT
  useEffect(() => {
    let cartContent = getCookie("cart");
    if (cartContent) {
      dispatch(setCartContent(cartContent));
    }
    setMonthCollectionInfo(
      JSON.parse(localStorage.getItem("monthCollectionInfo")).data
        ?.allMonthlyHighlights[0]
    );
    setItemsNavbar(JSON.parse(localStorage.getItem("itemNavBar")));
  }, []);

  const openSearchModal = () => {
    setIsSearchActive(true);
    document.body.classList.remove("overflow-auto");
    document.body.classList.add("overflow-hidden");
  };

  const closeSearchModal = () => {
    setIsSearchActive(false);
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-auto");
  };

  const items = itemsNavbar?.data?.shopByItem?.items;

  return (
    <>
      <div className="px-5 md:px-5 left-0 top-0 w-full h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
        {isDesktop ? (
          <Link href={"/"}>
            <img src={homeIcon.src} width={15} alt="icon-home" />
          </Link>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            {!isDesktop && (
              <>
                {!showSideBar && (
                  <button
                    className="text-black font-semibold text-xs md:text-sm"
                    onClick={() => dispatch(setSideBarShow(!showSideBar))}
                  >
                    <img src={menuBurgher.src} width={15} alt="burger-icon" />
                  </button>
                )}

                {!viewSecondSidebar && !viewThirdSidebar && showSideBar && (
                  <button
                    className="text-black font-semibold text-xs md:text-sm"
                    onClick={() => dispatch(setSideBarShow(!showSideBar))}
                  >
                    <FontAwesomeIcon icon={faXmark} width={10} />
                  </button>
                )}

                {viewSecondSidebar && !viewThirdSidebar && (
                  <button
                    className="text-black font-semibold text-xs md:text-sm"
                    onClick={() => setViewSecondSidebar(false)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} width={10} />
                  </button>
                )}

                {viewThirdSidebar && (
                  <button
                    className="text-black font-semibold text-xs md:text-sm"
                    onClick={() => setViewThirdSidebar(false)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} width={10} />
                  </button>
                )}

                <FontAwesomeIcon icon={faMagnifyingGlass} width={15} />
              </>
            )}
          </div>
        )}

        <Link href="/">
          <button>
            <div className="flex flex-col justify-center items-center">
              <img src={logo.src} width={150} alt="logo" />
            </div>
          </button>
        </Link>
        <Link
          href="/cart"
          className="text-black font-semibold text-xs md:text-sm"
          style={{ fontSize: "10px" }}
        >
          <img src={cartIcon.src} width={15} alt="cart-icon" />
          {/* <div>({totalQuantity})</div> */}
        </Link>
      </div>
      {isDesktop && (
        <div className="customWidthHeaderTwo">
          <div>
            <Link href="/magazine">
              <button className="link">
                <div
                  className={`${
                    pathName === "/magazine" &&
                    "text-sunglassesandframes-black font-bold mackay"
                  } flex flex-col justify-center items-center hover:font-bold mackay`}
                >
                  Magazine
                </div>
              </button>
            </Link>

            <button
              className="link"
              onMouseEnter={() => setHasHover(true)}
              onMouseLeave={() => setHasHover(false)}
            >
              <div
                className={`${
                  pathName === "/shop" ||
                  (hasHover &&
                    "text-sunglassesandframes-black font-bold mackay")
                } flex flex-col justify-center items-center hover:font-bold mackay`}
              >
                Shop By
              </div>
            </button>

            <Link href="/designers">
              <button className="link">
                <div
                  className={`${
                    pathName === "/designers" &&
                    "text-sunglassesandframes-black font-bold mackay"
                  } flex flex-col justify-center items-center hover:font-bold mackay`}
                >
                  Our Designer
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="link">
                <div
                  className={`${
                    pathName === "/newIn" &&
                    "text-sunglassesandframes-black font-bold mackay"
                  } flex flex-col justify-center items-center hover:font-bold mackay`}
                >
                  New in
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="link">
                <div
                  className={`${
                    pathName === "/promotions" &&
                    "text-sunglassesandframes-black font-bold mackay"
                  } flex flex-col justify-center items-center text-sunglassesandframes-red hover:font-bold mackay`}
                >
                  Promotions
                </div>
              </button>
            </Link>
            {isSearchActive && (
              <div
                id="search-overlay"
                className={`absolute w-screen h-screen top-0 left-0 z-50 fullScreenBackground transition-all duration-300 overflow-y-scroll ${
                  isSearchActive ? "visible opacity-100" : "invisible opacity-0"
                }`}
                onClick={closeSearchModal}
              >
                <div>
                  <FontAwesomeIcon
                    style={{ marginLeft: "2px", width: 15 }}
                    className="cursor-pointer absolute right-10 top-10"
                    icon={faXmark}
                    onClick={closeSearchModal}
                  />
                </div>
                {/* className="absolute top-50/100 left-50/100 min-w-[80%] min-h-[80%] translate-x-[-50%] translate-y-[-50%] bg-white" */}
                <div
                  className=" bg-white p-4"
                  onClick={e => e.stopPropagation()}
                >
                  <AlgoliaSearch onClose={closeSearchModal} />
                </div>
              </div>
            )}
          </div>
          <FontAwesomeIcon
            style={{ marginLeft: "2px", width: 12 }}
            className="cursor-pointer"
            icon={faSearch}
            onClick={openSearchModal}
          />
        </div>
      )}
      <AnimatePresence>
        {isDesktop && hasHover && (
          <div className="fullScreenBackground">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "max-content" }}
              exit={{ opacity: 0, height: "min-content" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{
                backgroundColor: "white",
                paddingBottom: "40px",
              }}
              onMouseEnter={() => setHasHover(true)}
              onMouseLeave={() => setHasHover(false)}
            >
              <div className="containerMenuTwo">
                <div className="containerItems">
                  {items.map((first, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="first">{first?.title}</div>
                      {first?.item?.map((item, index) => (
                        <div className="second" key={index}>
                          {item?.item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="containerAdv">
                  <Link href={`designers/${monthCollectionInfo?.handle}`}>
                    <div className="adv">
                      <Image
                        fill="true"
                        style={{ objectFit: "cover" }}
                        sizes="100%"
                        priority={true}
                        placeholder="blur"
                        src={monthCollectionInfo?.backgroundimage?.url}
                        blurDataURL={
                          monthCollectionInfo?.backgroundimage?.blurUpThumb
                        }
                        alt="advImage"
                      />
                      <div className="containerTextAdv">
                        <p className="textAdv">
                          {monthCollectionInfo?.designer}
                        </p>
                        <p className="textAdv centertext">
                          {monthCollectionInfo?.text}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSideBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
            onClick={() => {
              dispatch(setSideBarShow(false));
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSideBar && (
          <Sidebar
            items={items}
            viewSecondSidebar={viewSecondSidebar}
            setViewSecondSidebar={setViewSecondSidebar}
            viewThirdSidebar={viewThirdSidebar}
            setViewThirdSidebar={setViewThirdSidebar}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDialogContact && (
          <Contact setShown={dispatch(setDialogContactShow(true))} />
        )}
      </AnimatePresence>
      <style jsx="true">{`
        .logo {
          width: 10em;
        }

        .customWidthHeader {
          max-width: 83rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          height: 70px;
        }

        .customWidthHeaderTwo {
          max-width: 83rem;
          display: flex;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          justify-content: space-between;
        }

        .fullScreenBackground {
          height: 100%;
          background-color: rgb(0 0 0/25%);
          z-index: 99;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
        }

        .containerMenuTwo {
          max-width: 83rem;
          margin-left: auto;
          padding-top: 30px;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          display: flex;
          justify-content: space-between;
          z-index: 999;
        }

        .containerItems {
          display: flex;
          gap: 20%;
          width: 70%;
        }

        .containerAdv {
          width: 30%;
        }

        .adv {
          width: 90%;
          height: 230px;
          background-color: black;
          position: relative;
          overflow: hidden;
          border-radius: 15px;
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

        .centertext {
          text-align: center;
        }

        .first {
          margin-bottom: 10px;
        }

        .second {
          place-self: flex-start;
        }

        .link {
          padding-right: 2.5rem;
        }

        @media screen and (max-width: 1150px) {
          .containerItems {
            gap: 15%;
          }
        }

        @media screen and (max-width: 800px) {
          .containerItems {
            gap: 10%;
          }
        }

        @media screen and (max-width: 768px) {
          .subtitle-logo {
            font-size: 10px;
          }

          .customWidthHeader {
            position: fixed;
          }
        }
      `}</style>
    </>
  );
};
