//REACT
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
//MOTION
import { AnimatePresence, motion } from "framer-motion";

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

const Sidebar = ({
  items,
  viewSecondSidebar,
  setViewSecondSidebar,
  viewThirdSidebar,
  setViewThirdSidebar,
}) => {
  //ROUTER
  const pathName = useRouter().pathname;

  //STATE
  const [show, setShown] = useState(false);
  const [selectSingleIcon, setSelectSingleIcon] = useState();
  const [selectItem, setSelectItem] = useState();

  const hangleTitle = title => {
    setSelectItem(title);
  };

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
            <div className="flex-1 flex flex-col items-start ">
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

        <div className="containerLineInfo">
          <div className="line" />
          <div className="containerInfo mt-5">
            <p>Need help?</p>
            <div className="info">
              <p>Whatsapp</p>
              <p>+39 339 46 44 407</p>
              <p>Available Monday to Friday, 09:00 - 18:00 EST</p>
            </div>
            <div className="info">
              <p>E-mail us</p>
              <p>info@sunglassesandframes.com</p>
            </div>
            <div className="info">
              <p>Assistance Center</p>
              <p>Anything you need to know is here</p>
            </div>
          </div>
        </div>
      </motion.div>
      {show && (
        <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
      )}

      {/* LEVEL 2 */}
      <AnimatePresence>
        {viewSecondSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
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
                <div className="flex-1 flex flex-col items-start ">
                  {items?.map((first, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                        style={{ width: "100%" }}
                        onClick={() => hangleTitle(first?.title)}
                      >
                        <div
                          style={{
                            display: "flex",
                          }}
                          onClick={() => setViewThirdSidebar(true)}
                        >
                          <div className="mt-3 font-semibold text-l">
                            {first?.title}
                          </div>
                          <div className="mt-4 iconback">
                            <FontAwesomeIcon icon={faAngleRight} width={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="containerLineInfo">
              <div className="line" />
              <div className="containerInfo mt-5">
                <p>Need help?</p>
                <div className="info">
                  <p>Whatsapp</p>
                  <p>+39 339 46 44 407</p>
                  <p>Available Monday to Friday, 09:00 - 18:00 EST</p>
                </div>
                <div className="info">
                  <p>E-mail us</p>
                  <p>info@sunglassesandframes.com</p>
                </div>
                <div className="info">
                  <p>Assistance Center</p>
                  <p>Anything you need to know is here</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewThirdSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      {/* LEVEL 3 */}
      <AnimatePresence>
        {viewThirdSidebar && (
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
                <div className="flex-1 flex flex-col items-start ">
                  {items?.map(
                    (first, index) =>
                      first.title === selectItem &&
                      first.item.map(item => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="text-sunglassesandframes-black flex flex-col justify-center items-center mt-4"
                            style={{ width: "100%" }}
                          >
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <div className="mt-3 font-semibold text-l">
                                {item.item}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
            <div className="containerLineInfo">
              <div className="line" />
              <div className="containerInfo mt-5">
                <p>Need help?</p>
                <div className="info">
                  <p>Whatsapp</p>
                  <p>+39 339 46 44 407</p>
                  <p>Available Monday to Friday, 09:00 - 18:00 EST</p>
                </div>
                <div className="info">
                  <p>E-mail us</p>
                  <p>info@sunglassesandframes.com</p>
                </div>
                <div className="info">
                  <p>Assistance Center</p>
                  <p>Anything you need to know is here</p>
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

          .separator {
            margin-right: 20px;
            margin-left: 20px;
          }
          .iconback {
            position: absolute;
            right: 1.5rem;
          }

          .containerLineInfo {
            position: absolute;
            top: 35%;
            width: 100%;
          }
          .line {
            width: 100%;
            height: 1px;
            background: #c0c0c0;
          }

          .containerInfo {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .info {
            margin-top: 25px;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
