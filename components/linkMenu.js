//REACT
import React from "react";
//NEXT
import Link from "next/link";
//STORE
import { useDispatch } from "react-redux";
import { setSideBarShow } from "../store/modules/sideBar";
//COMPONENTS
import { motion } from "framer-motion";
//ICONS
import imageMenu from "../assets/images/menu.jpg";
import Image from "next/image";

const LinkMenu = ({ children, to, sidebar, image }) => {
  //STORE
  const dispatch = useDispatch();

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10, transition: { type: "tween " } },
    shown: { opacity: 1, y: 0, transition: { type: "tween " } },
  };

  if (sidebar) {
    return (
      <motion.button
        variants={menuItemVariants}
        whileHover={{ color: "#800000" }}
        onClick={() => {
          dispatch(setSideBarShow(false));
        }}
      >
        <Link href={to}>
          <p className="mt-3 font-semibold text-xs uppercase">{children}</p>
        </Link>
      </motion.button>
    );
  } else {
    return (
      <>
        <Link href={to}>
          <motion.button>
            <div className="containerItemMenu">
              <Image
                fill="true"
                priority={true}
                style={{ objectFit: "cover" }}
                sizes="100%"
                placeholder="blur"
                blurDataURL={image}
                src={image}
                alt="imageMenu"
              />
              <div className="textMenu">{children}</div>
            </div>
          </motion.button>
        </Link>
        <style jsx="true">{`
          .containerItemMenu {
            position: relative;
            border-radius: 20px;
            height: 135px !important;
            width: 350px !important;
            overflow: hidden;
          }

          .textMenu {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
            position: absolute;
            font-weight: bold;
            color: white;
            bottom: 30%;
            text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
          }

          @media (max-width: 768px) {
            .textMenu {
              font-size: 12px;
            }

            .containerItemMenu {
              height: 70px;
              width: 165px;
            }
          }
        `}</style>
      </>
    );
  }
};

export default LinkMenu;
