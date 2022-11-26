//REACT
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
//STORE
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../store/modules/language";
import { setSideBarShow } from "../store/modules/sideBar";
//MOTION
import { AnimatePresence, motion } from "framer-motion";
//INTL
import { useIntl } from "react-intl";
//ICONS
import Icons from "../data/Icons";
import closeIcon from "../assets/images/cross.svg";
import logo from "../assets/images/logo-black.png";
import shoppingBag from "../assets/images/shopping-bag-red.svg";
//COMPONENTS
import ModalsIcons from "./modalsIcons";
import LinkMenu from "./linkMenu";

const sidebarVariants = {
  hidden: { x: "-100%", transition: { type: "tween" } },
  shown: {
    x: "0",
    transition: { type: "tween", staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const Sidebar = () => {
  //STORE
  const dispatch = useDispatch();

  //INTL
  const intl = useIntl();
  //STATE
  const [show, setShown] = useState(false);
  const [selectSingleIcon, setSelectSingleIcon] = useState();

  //FUNCTIONS
  const changeSidebar = () => {
    dispatch(setSideBarShow(false));
  };

  const pathName = useRouter().pathname;
  const [viewSecondSidebar, setViewSecondSidebar] = useState(false);

  return (
    <>
      <motion.div
        variants={sidebarVariants}
        initial={"hidden"}
        animate={"shown"}
        exit={"hidden"}
        className="fixed top-0 left-0 h-full w-full md:w-1/2 z-50"
        style={{ height: "100vh", marginTop: "70px", backgroundColor: "white" }}
      >
        <div
          className="flex w-full h-full items-center"
          style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
        >
          <div className="flex flex-col h-full" style={{ width: "100%" }}>
            <div className="flex-1 flex flex-col items-start mt-10">
              <div
                className={`${
                  pathName === "/" &&
                  "text-sunglassesandframes-black font-bold mackay"
                } flex flex-col justify-center items-center mt-4`}
              >
                <LinkMenu to="/" sidebar>
                  Home
                </LinkMenu>
              </div>
              <div
                className={`${
                  pathName === "/magazine" &&
                  "text-sunglassesandframes-black font-bold mackay"
                } flex flex-col justify-center items-center mt-4`}
              >
                <LinkMenu to="/magazine" sidebar>
                  Magazine
                </LinkMenu>
              </div>
              <div
                className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  onClick={() => setViewSecondSidebar(true)}
                >
                  <div className="mt-3 font-semibold text-l">Shop By</div>
                  <div className="mt-4">
                    <FontAwesomeIcon icon={faAngleRight} width={10} />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  pathName === "/designers" &&
                  "text-sunglassesandframes-black font-bold mackay"
                } flex flex-col justify-center items-center mt-4`}
              >
                <LinkMenu to="/designers" sidebar>
                  Our Designers
                </LinkMenu>
              </div>
              <div
                className={`${
                  pathName === "/promotions" &&
                  "text-sunglassesandframes-black font-bold mackay"
                } flex flex-col justify-center items-center text-sunglassesandframes-red mt-4`}
              >
                <LinkMenu to="/promotions" sidebar>
                  Promotions
                </LinkMenu>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {show && (
        <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
      )}

      <AnimatePresence>
        {viewSecondSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
            onClick={() => {
              setViewSecondSidebar(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {viewSecondSidebar && (
          <motion.div
            variants={sidebarVariants}
            initial={"hidden"}
            animate={"shown"}
            exit={"hidden"}
            className="fixed top-0 left-0 h-full w-full md:w-1/2 bg-sunglassesandframes-grey z-50"
            style={{
              height: "100vh",
              marginTop: "70px",
              backgroundColor: "white",
            }}
          >
            <div
              className="flex w-full h-full items-center"
              style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
            >
              <div className="flex flex-col h-full" style={{ width: "100%" }}>
                <div className="flex-1 flex flex-col items-start mt-10">
                  <div
                    className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setViewSecondSidebar(true)}
                    >
                      <div className="mt-3 font-semibold text-l">TREND</div>
                      <div className="mt-4">
                        <FontAwesomeIcon icon={faAngleRight} width={10} />
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setViewSecondSidebar(true)}
                    >
                      <div className="mt-3 font-semibold text-l">OCCASIONE</div>
                      <div className="mt-4">
                        <FontAwesomeIcon icon={faAngleRight} width={10} />
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setViewSecondSidebar(true)}
                    >
                      <div className="mt-3 font-semibold text-l">STILE</div>
                      <div className="mt-4">
                        <FontAwesomeIcon icon={faAngleRight} width={10} />
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setViewSecondSidebar(true)}
                    >
                      <div className="mt-3 font-semibold text-l">SHAPE</div>
                      <div className="mt-4">
                        <FontAwesomeIcon icon={faAngleRight} width={10} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx="true">
        {`
          .flexMenu {
            display: flex;
            justify-content: space-between;
          }

          .logoMenu {
            width: 8vh;
            cursor: pointer;
          }

          .close-menu {
            font-size: 12px;
          }

          .container-buttons-multilingual {
            display: flex;
            margin-bottom: 30px;
            width: 100px;
          }

          .button-it,
          .button-en {
            cursor: pointer;
          }

          .button-en {
          }

          .separator {
            margin-right: 20px;
            margin-left: 20px;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
