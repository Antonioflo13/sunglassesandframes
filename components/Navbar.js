//REACT
import React, { useState, useEffect } from "react";
//NEXT
import Link from "next/link";
import { useRouter } from "next/router";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setDialogContactShow } from "../store/modules/dialogContact";
import { setSideBarShow } from "../store/modules/sideBar";
import { setCartContent, setShowCart } from "../store/modules/cart";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
import { getCookie } from "../utils/cookie";
//FRAMER-MOTION
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Sidebar from "../components/sidebar";
import Contact from "../components/contact";
import Drawer from "../components/drawer";
//IMAGES
import logo from "../assets/images/logo.png";
import menuBurgher from "../assets/images/menu-burger.svg";
import cartIcon from "../assets/images/shopping-bag.svg";
import homeIcon from "../assets/images/home.svg";

import AlgoliaSearch from "../components/algolia-search";

//Add FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  //ROUTER
  const pathName = useRouter().pathname;
  //STORE
  const showDialogContact = useSelector(state => state.dialogContact.value);
  const showSideBar = useSelector(state => state.sideBar.value);
  const language = useSelector(state => state.language.value);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const cart = useSelector(state => JSON.parse(state.cart.value));
  const showCart = useSelector(state => state.cart.show);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  // FUNCTIONS
  const totalQuantity = cart?.lineItems
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  // USEEFFECT
  useEffect(() => {
    let cartContent = getCookie("cart");
    if (cartContent) {
      dispatch(setCartContent(cartContent));
    }
  }, []);

  const openSearchModal = () => {
    setIsSearchActive(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeSearchModal = () => {
    setIsSearchActive(false);
    document.body.classList.remove("overflow-hidden");
  };
  const [hasHover, setHasHover] = useState(false);

  return (
    <>
      <div className="px-5 md:px-5 left-0 top-0 w-full h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
        {isDesktop ? (
          <img src={homeIcon.src} width={15} alt="icon-home" />
        ) : (
          <>
            <button
              className="text-black font-semibold text-xs md:text-sm"
              onClick={() => dispatch(setSideBarShow(!showSideBar))}
            >
              {isDesktop ? (
                <div style={{ fontSize: "10px" }}>MENU</div>
              ) : (
                <img src={menuBurgher.src} width={15} alt="burger-icon" />
              )}
            </button>
            <div>Q</div>
          </>
        )}

        <Link href="/">
          <button>
            <div className="flex flex-col justify-center items-center">
              <img src={logo.src} width={150} alt="logo" />
            </div>
          </button>
        </Link>
        <button
          className="text-black font-semibold text-xs md:text-sm"
          style={{ fontSize: "10px" }}
          onClick={() => dispatch(setShowCart(true))}
        >
          <img src={cartIcon.src} width={15} alt="cart-icon" />
          {/* <div>({totalQuantity})</div> */}
        </button>
        {showCart && (
          <Drawer
            handleClose={() => {
              dispatch(setShowCart(false));
            }}
            setShowCart={r => dispatch(setCart(r))}
          />
        )}
      </div>
      {isDesktop && (
        <div className="customWidthHeaderTwo">
          <div>
            <Link href="/magazine">
              <button className="link">
                <div
                  className={`${
                    pathName === "/magazine" && "text-sunglassesandframes-red"
                  } flex flex-col justify-center items-center`}
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
                  pathName === "/shop" && "text-sunglassesandframes-red"
                } flex flex-col justify-center items-center`}
              >
                Shop By
              </div>
            </button>

            <Link href="/designers">
              <button className="link">
                <div
                  className={`${
                    pathName === "/designers" && "text-sunglassesandframes-red"
                  } flex flex-col justify-center items-center`}
                >
                  Our Designer
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="link">
                <div
                  className={`${
                    pathName === "/newIn" && "text-sunglassesandframes-red"
                  } flex flex-col justify-center items-center`}
                >
                  New in
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="link">
                <div
                  className={`${
                    pathName === "/promotions" && "text-sunglassesandframes-red"
                  } flex flex-col justify-center items-center text-sunglassesandframes-red`}
                >
                  Promotions
                </div>
              </button>
            </Link>
            <div
              id="search-overlay"
              className={`absolute w-screen h-screen top-0 left-0 z-50 bg-slate-400/75 transition-all duration-300 ${
                isSearchActive ? "visible opacity-100" : "invisible opacity-0"
              }`}
              onClick={closeSearchModal}
            >
              {/* className="absolute top-50/100 left-50/100 min-w-[80%] min-h-[80%] translate-x-[-50%] translate-y-[-50%] bg-white" */}
              <div
                className="absolute top-[5%] left-[5%] w-[90%] h-[90%]  bg-white overflow-auto p-4"
                onClick={e => e.stopPropagation()}
              >
                <AlgoliaSearch />
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            style={{ marginLeft: "2px", width: 12 }}
            className="cursor-pointer"
            icon={faSearch}
            onClick={openSearchModal}
          />
        </div>
      )}
      {isDesktop && hasHover && (
        <div className="fullScrennBackground">
          <AnimatePresence>
            <motion.div
              key={hasHover ? "success" : "error"}
              initial={{ opacity: 0, height: "0px" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: "0px" }}
              transition={{ type: "tween" }}
              style={{
                backgroundColor: "white",
                paddingBottom: "40px",
              }}
              onMouseEnter={() => setHasHover(true)}
              onMouseLeave={() => setHasHover(false)}
            >
              <div className="containerMenuTwo">
                <div className="containerItems">
                  <div className="flex flex-col items-center">
                    <div className="first">TREND</div>
                    <div>Round</div>
                    <div>Squared</div>
                    <div>Cat eve</div>
                    <div>Aviator</div>
                    <div>Mask</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="first">OCCASIONE</div>
                    <div>Round</div>
                    <div>Squared</div>
                    <div>Cat eve</div>
                    <div>Aviator</div>
                    <div>Mask</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="first">STILE</div>
                    <div>Round</div>
                    <div>Squared</div>
                    <div>Cat eve</div>
                    <div>Aviator</div>
                    <div>Mask</div>
                  </div>

                  <div className="flex flex-col  items-center">
                    <div className="first">SHAPE</div>
                    <div>Round</div>
                    <div>Squared</div>
                    <div>Cat eve</div>
                    <div>Aviator</div>
                    <div>Mask</div>
                  </div>
                </div>
                <div className="containerAdv">
                  <div className="adv"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
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
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
            onClick={() => {
              dispatch(setShowCart(false));
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{showSideBar && <Sidebar />}</AnimatePresence>
      <AnimatePresence>
        {showCart && (
          <Drawer
            handleClose={() => {
              dispatch(setShowCart(false));
            }}
            setShowCart={r => dispatch(setShowCart(r))}
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
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          height: 70px;
        }

        .customWidthHeaderTwo {
          max-width: 90rem;
          display: flex;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          justify-content: space-between;
        }

        .fullScrennBackground {
          height: 100%;
          background-color: rgb(0 0 0/25%);
          z-index: 99;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
        }

        .containerMenuTwo {
          max-width: 90rem;
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
          gap: 10rem;
          width: 70%;
        }

        .containerAdv {
          width: 30%;
        }

        .adv {
          width: 90%;
          height: 230px;
          background-color: black;
          border-radius: 15px;
        }

        .first {
          margin-bottom: 10px;
        }

        .link {
          padding-right: 2.5rem;
        }

        @media (max-width: 768px) {
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
