//REACT
import React, { useState, useEffect } from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setSideBarShow } from "../store/modules/sideBar";
import { setAlgoliaModalShow } from "../store/modules/algoliaModal";
import { setCartContent } from "../store/modules/cart";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
import { getCookie } from "../utils/cookie";
//FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
//FRAMER-MOTION
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Sidebar from "../components/sidebar";
//IMAGES
import logo from "../assets/images/logo.svg";
import menuBurgher from "../assets/images/menu-burger.svg";
import cartIcon from "../assets/images/shopping-bag.svg";
import homeIcon from "../assets/images/home.svg"; //Add FontAwesome

export const Navbar = () => {
  //STORE
  const dispatch = useDispatch();
  const showSideBar = useSelector(state => state.sideBar.value);
  const showAlgoliaModal = useSelector(state => state.algoliaModal.value);
  const cart = useSelector(state => JSON.parse(state.cart.value));

  //STATE
  const [hasHover, setHasHover] = useState(false);
  const [customHover, setCustomHover] = useState(true);
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

  const openSearchModal = () => {
    dispatch(setAlgoliaModalShow(!showAlgoliaModal));
    document.body.classList.remove("overflow-auto");
    document.body.classList.add("overflow-hidden");
  };

  // EFFECT
  useEffect(() => {
    let cartContent = getCookie("cart");
    if (cartContent) {
      dispatch(setCartContent(cartContent));
    }
    if (localStorage.getItem("monthCollectionInfo")) {
      setMonthCollectionInfo(
        JSON.parse(localStorage.getItem("monthCollectionInfo")).data
          ?.allMonthlyHighlights[0]
      );
    }
    if (localStorage.getItem("itemsNavBar")) {
      setItemsNavbar(JSON.parse(localStorage.getItem("itemsNavBar")));
    }
  }, []);

  const items = itemsNavbar?.data?.shopByItem?.items;

  return (
    <>
      <div className="header-sticky">
        <div className="px-5 md:px-5 left-0 top-0 w-full min-h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
          {isDesktop ? (
            <Link href={"/"}>
              <img src={homeIcon.src} width={20} alt="icon-home" />
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

                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    width={15}
                    onClick={openSearchModal}
                  />
                </>
              )}
            </div>
          )}

          <Link href="/">
            <button>
              <div className="flex flex-col justify-center items-center">
                <img src={logo.src} width={110} alt="logo" />
              </div>
            </button>
          </Link>
          <Link
            href="/cart"
            className="text-black font-semibold text-xs md:text-sm"
            style={{ fontSize: "10px" }}
          >
            <div className="relative">
              <img src={cartIcon.src} width={20} alt="cart-icon" />
              {totalQuantity > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="badge">{totalQuantity}</div>
                </motion.div>
              )}
            </div>
          </Link>
        </div>
        {isDesktop && (
          <div className="customWidthHeaderTwo">
            <div>
              <Link href="/magazine">
                <button className="link">
                  <div
                    onMouseEnter={() => setCustomHover(false)}
                    onMouseLeave={() => setCustomHover(true)}
                    className={`flex flex-col justify-center items-center ralewayLight customHoverColor ${
                      !customHover && "changeColor"
                    }`}
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
                  onMouseEnter={() => setCustomHover(false)}
                  onMouseLeave={() => setCustomHover(true)}
                  className={`flex flex-col justify-center items-center ralewayLight customHoverColor ${
                    !customHover && "changeColor"
                  }`}
                >
                  Shop By
                </div>
              </button>

              <Link href="/designers">
                <button className="link">
                  <div
                    onMouseEnter={() => setCustomHover(false)}
                    onMouseLeave={() => setCustomHover(true)}
                    className={`flex flex-col justify-center items-center ralewayLight customHoverColor ${
                      !customHover && "changeColor"
                    }`}
                  >
                    Our Designers
                  </div>
                </button>
              </Link>
              <Link
                href={{
                  pathname: "/designers/[designer]",
                  query: { designer: "sunglasses" },
                }}
              >
                <button className="link">
                  <div
                    onMouseEnter={() => setCustomHover(false)}
                    onMouseLeave={() => setCustomHover(true)}
                    className={`flex flex-col justify-center items-center ralewayLight customHoverColor ${
                      !customHover && "changeColor"
                    }`}
                  >
                    Sunglasses
                  </div>
                </button>
              </Link>
              <Link
                href={{
                  pathname: "/designers/[designer]",
                  query: { designer: "frames" },
                }}
              >
                <button className="link">
                  <div
                    onMouseEnter={() => setCustomHover(false)}
                    onMouseLeave={() => setCustomHover(true)}
                    className={`flex flex-col justify-center items-center ralewayLight customHoverColor ${
                      !customHover && "changeColor"
                    }`}
                  >
                    Frames
                  </div>
                </button>
              </Link>
              <Link
                href={{
                  pathname: "/designers/[designer]",
                  query: { designer: "promo" },
                }}
              >
                <button className="link">
                  <div
                    onMouseEnter={() => setCustomHover(false)}
                    onMouseLeave={() => setCustomHover(true)}
                    className={`flex flex-col justify-center items-center ralewayLight customHoverColorRed ${
                      !customHover && "changeColor"
                    }`}
                  >
                    Promotions
                  </div>
                </button>
              </Link>
            </div>

            <div style={{ position: "relative" }} onClick={openSearchModal}>
              <FontAwesomeIcon
                style={{
                  marginLeft: "2px",
                  width: 12,
                  position: "absolute",
                  top: "6px",
                  left: "6px",
                }}
                className="cursor-pointer"
                icon={faSearch}
              />
              <input className="searchInput" placeholder="Search" />
            </div>
          </div>
        )}
        <AnimatePresence>
          {isDesktop && hasHover && (
            <>
              <div>
                <motion.div
                  style={{
                    backgroundColor: "white",
                    paddingBottom: "40px",
                    borderBottomRightRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}
                  onMouseEnter={() => setHasHover(true)}
                  onMouseLeave={() => setHasHover(false)}
                >
                  <div className="containerMenuTwo">
                    <div className="containerItems">
                      {items.map((first, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center"
                          style={{ alignItems: "start" }}
                        >
                          <div className="first">{first?.title}</div>
                          {first?.item?.map((item, index) => (
                            <div className="second" key={index}>
                              <Link
                                href={{
                                  pathname: "/designers/[designer]",
                                  query: {
                                    designer: item?.handle.toLowerCase(),
                                  },
                                }}
                              >
                                {item?.item}
                              </Link>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="containerAdv">
                      <Link href={`/designers/${monthCollectionInfo?.handle}`}>
                        <div className="adv">
                          <Image
                            fill="true"
                            style={{ objectFit: "cover" }}
                            sizes="100%"
                            priority={true}
                            placeholder="blur"
                            src={monthCollectionInfo?.navbarImage?.url}
                            blurDataURL={
                              monthCollectionInfo?.navbarImage?.blurUpThumb
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
              <div className="fullScreenBackground"></div>
            </>
          )}
        </AnimatePresence>
      </div>
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
      <style jsx="true">{`
        .logo {
          width: 10em;
        }

        .header-sticky {
          position: fixed;
          width: 100%;
          z-index: 2;
          background-color: white;
          top: 0;
          height: 120px;
        }

        .badge {
          position: absolute;
          bottom: -7px;
          left: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15px;
          height: 15px;
          border-radius: 100%;
          border: 1px solid white;
          background: black;
          font-size: 8px;
          color: white;
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
          height: 100vh;
          background-color: rgb(0 0 0/25%);
          width: 100%;
          margin-left: auto;
          margin-right: auto;
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
        }

        .containerItems {
          display: flex;
          gap: 20%;
          width: 70%;
          margin-left: 10px;
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
          cursor: pointer;
        }

        .link {
          padding-right: 4rem;
        }

        .searchInput {
          border: solid 1px;
          border-radius: 10px;
          height: 23px;
        }

        .searchInput::placeholder {
          padding-left: 25px;
          font-size: 14px;
          color: #d9d9d9;
        }

        .customHoverColorRed {
          color: #c60000;
        }

        .changeColor {
          color: #727272;
        }

        .customHoverColorRed:hover {
          color: #c60000;
        }

        .customHoverColor:hover {
          color: black;
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
