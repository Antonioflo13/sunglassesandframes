import {
  faFacebook,
  faInstagram,
  faTiktok,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "./LanguagesLink";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import logo from "../assets/images/logo.svg";
import useMediaQuery from "../hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import amex from "../assets/images/amex.svg";
import applepay from "../assets/images/applepay.svg";
import mastercard from "../assets/images/mastercard.svg";
import visa from "../assets/images/visa.svg";
import paypal from "../assets/images/paypal.svg";

const Footer = () => {
  const [accordion, setAccordion] = React.useState({
    contact: false,
    support: false,
    wherIs: false,
  });
  const isDesktop = useMediaQuery(768);

  return (
    <>
      <div className="backgroudcolorfooter px-5">
        <div className="w-full items-center justify-center pt-10 pb-4 text-black">
          <div
            className={`${
              isDesktop
                ? "customWidthFooter"
                : "grid gap-y-6 md:grid-cols-5 lg:grid-cols-5 md:gap-x-12 md:gap-y-24 whitespace-pre-line"
            }`}
          >
            <div className="flex justify-center noDesktop">
              <img src={logo.src} alt="logo" width={110} />
            </div>
            <div className="flex flex-col accordionDesktop ">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.payments.title" />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <img src={amex.src} width={40} alt="icon" />
                <img src={applepay.src} width={40} alt="icon" />
                <img src={visa.src} width={40} alt="icon" />
                <img src={mastercard.src} width={40} alt="icon" />
                <img src={paypal.src} width={40} alt="icon" />
              </div>

              <div className="font-bold uppercase text-sm mt-10">
                <FormattedMessage id="footer.social.title" />
              </div>
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                <FontAwesomeIcon icon={faInstagram} width={22} />
                <FontAwesomeIcon icon={faFacebook} width={22} />
                <FontAwesomeIcon icon={faTiktok} width={22} />
                <FontAwesomeIcon icon={faPinterest} width={22} />
              </div>
            </div>

            <div className="flex flex-col accordionMobile mobileCenterSocial"></div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, contact: !accordion.contact })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.contacts.title" />
                </div>
                {accordion.contact ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="containerIcon"
                    width={10}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="containerIcon"
                    width={10}
                  />
                )}
              </div>
              <AnimatePresence>
                {accordion.contact && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-xs mt-2 ">
                      <FormattedMessage id="footer.contacts.email" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col accordionDesktop "></div>
            <div className="flex flex-col noMobile">
              <img src={logo.src} alt="logo" width={110} />
            </div>
            <div className="flex flex-col accordionDesktop ">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.support.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.order.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.payment.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.return.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.faq.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.terms.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.privacy.title" />
              </div>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, support: !accordion.support })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.support.title" />
                </div>
                {accordion.support ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="containerIcon"
                    width={10}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="containerIcon"
                    width={10}
                  />
                )}
              </div>
              <AnimatePresence>
                {accordion.support && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link to="/faq">
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.support.faq" />
                      </div>
                    </Link>
                    <a
                      href="https://sunglassesandframes-vision.myshopify.com/15652721/policies/terms-of-service.html?locale=en"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.support.terms_and_conditions" />
                      </div>
                    </a>
                    <a
                      href="https://www.iubenda.com/privacy-policy/22164738"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.support.privacy_policy" />
                      </div>
                    </a>
                    <a
                      href="https://www.iubenda.com/privacy-policy/22164738/cookie-policy"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.support.cookie_policy" />
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col accordionDesktop ">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.location.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.about.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.licensed.title" />
              </div>
              <div className="text-xs mt-2 ">
                <FormattedMessage id="footer.promise.title" />
              </div>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, wherIs: !accordion.wherIs })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.location.title" />
                </div>
                {accordion.wherIs ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="containerIcon"
                    width={10}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="containerIcon"
                    width={10}
                  />
                )}
              </div>
              <AnimatePresence>
                {accordion.wherIs && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="customWidthFooter">
          <div
            className="text-3xs textCenterDesktop justify-center mt-20 mb-8"
            style={{ maxWidth: "83rem", width: "37%" }}
          >
            <FormattedMessage id="footer.legal" />
          </div>
        </div>
        <style jsx="true">
          {`
            .backgroudcolorfooter {
              background-color: #f8f8f8;
              position: absolute;
              width: 100%;
            }

            .containerAccordion {
              display: flex;
              justify-content: space-between;
            }

            .containerIcon {
              margin-left: 4px;
              cursor: pointer;
            }

            .customWidthFooter {
              max-width: 83rem;
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: space-between;
            }

            @media (min-width: 768px) {
              .accordionMobile {
                display: none;
              }

              .accordionDesktop {
                display: block;
              }

              .textCenterDesktop {
                text-align: start;
              }

              .noDesktop {
                display: none;
                margin-bottom: 10px;
                margin-top: 10px;
              }
            }

            @media (max-width: 767px) {
              .justifyMobileEnd {
                justify-content: flex-start !important;
              }

              .accordionMobile {
                display: block;
              }

              .accordionDesktop {
                display: none;
              }

              .noMobile {
                display: none;
              }

              .mobileCenterSocial {
                display: flex;
                flex-direction: inherit;
                justify-self: center;
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Footer;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
