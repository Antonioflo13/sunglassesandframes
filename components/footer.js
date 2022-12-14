//REACT
import React from "react";
//NEXT
import Link from "next/link";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
import createHandle from "../hooks/createHandle";
//FRAMER
import { AnimatePresence, motion } from "framer-motion";
//FONTAWESOME
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
//IMAGES
import logo from "../assets/images/logo.svg";
import amex from "../assets/images/amex.svg";
import applePay from "../assets/images/applepay.svg";
import mastercard from "../assets/images/mastercard.svg";
import visa from "../assets/images/visa.svg";
import paypal from "../assets/images/paypal.svg";

const Footer = () => {
  const [accordion, setAccordion] = React.useState({
    assistance: false,
    whyus: false,
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
                : "grid gap-y-3 md:grid-cols-5 lg:grid-cols-5 md:gap-x-12 md:gap-y-24 whitespace-pre-line"
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
                <img src={applePay.src} width={40} alt="icon" />
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

            {!isDesktop && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    placeContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faInstagram} width={15} />
                  <FontAwesomeIcon icon={faFacebook} width={15} />
                  <FontAwesomeIcon icon={faTiktok} width={15} />
                  <FontAwesomeIcon icon={faPinterest} width={15} />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    placeContent: "center",
                  }}
                >
                  <img src={amex.src} width={35} alt="icon" />
                  <img src={applePay.src} width={35} alt="icon" />
                  <img src={visa.src} width={35} alt="icon" />
                  <img src={mastercard.src} width={35} alt="icon" />
                  <img src={paypal.src} width={35} alt="icon" />
                </div>
              </>
            )}
            <div className="flex flex-col accordionMobile">
              <div className="flex flex-col accordionMobile mobileCenterSocial"></div>
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({
                    ...accordion,
                    assistance: !accordion.assistance,
                  })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.support.title" />
                </div>
                {accordion.assistance ? (
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
                {accordion.assistance && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-xs mt-2 ">
                      <FormattedMessage id="footer.contact.title" />
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/assistance-center",
                          query: { menu: createHandle("Orders & Deliveries") },
                        }}
                      >
                        <FormattedMessage id="footer.order.title" />
                      </Link>
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/assistance-center",
                          query: { menu: createHandle("Payment") },
                        }}
                      >
                        <FormattedMessage id="footer.payment.title" />
                      </Link>
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/assistance-center",
                          query: { menu: createHandle("Returns & Refunds") },
                        }}
                      >
                        <FormattedMessage id="footer.return.title" />
                      </Link>
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/assistance-center",
                          query: { menu: createHandle("FAQ") },
                        }}
                      >
                        <FormattedMessage id="footer.faq.title" />
                      </Link>
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/assistance-center",
                          query: { menu: createHandle("Terms and Conditions") },
                        }}
                      >
                        <FormattedMessage id="footer.terms.title" />
                      </Link>
                    </div>
                    <div className="text-xs mt-2 ">
                      <Link
                        href={{
                          pathname: "/privacy-policy",
                        }}
                      >
                        <FormattedMessage id="footer.privacy.title" />
                      </Link>
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
                <Link
                  href={{
                    pathname: "/assistance-center",
                  }}
                >
                  <FormattedMessage id="footer.support.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/assistance-center",
                    query: { menu: createHandle("Orders & Deliveries") },
                  }}
                >
                  <FormattedMessage id="footer.order.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/assistance-center",
                    query: { menu: createHandle("Payment") },
                  }}
                >
                  <FormattedMessage id="footer.payment.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/assistance-center",
                    query: { menu: createHandle("Returns & Refunds") },
                  }}
                >
                  <FormattedMessage id="footer.return.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/assistance-center",
                    query: { menu: createHandle("FAQ") },
                  }}
                >
                  <FormattedMessage id="footer.faq.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/assistance-center",
                    query: { menu: createHandle("Terms and Conditions") },
                  }}
                >
                  <FormattedMessage id="footer.terms.title" />
                </Link>
              </div>
              <div className="text-xs mt-2 ">
                <Link
                  href={{
                    pathname: "/privacy-policy",
                  }}
                >
                  <FormattedMessage id="footer.privacy.title" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, whyus: !accordion.whyus })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.whyus.title" />
                </div>
                {accordion.whyus ? (
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
                {accordion.whyus && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <a
                      href="https://sunglassesandframes-vision.myshopify.com/15652721/policies/terms-of-service.html?locale=en"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.about.title" />
                      </div>
                    </a>
                    <a
                      href="https://www.iubenda.com/privacy-policy/22164738"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.licensed.title" />
                      </div>
                    </a>
                    <a
                      href="https://www.iubenda.com/privacy-policy/22164738/cookie-policy"
                      target="_blank"
                    >
                      <div className="text-xs mt-2 ">
                        <FormattedMessage id="footer.promise.title" />
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col accordionDesktop ">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.whyus.title" />
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
          </div>
        </div>

        {isDesktop ? (
          <div className="customWidthFooter">
            <div
              className="text-3xs textCenterDesktop justify-center mt-20 mb-8"
              style={{ maxWidth: "83rem", width: "37%" }}
            >
              <FormattedMessage id="footer.legal" />
            </div>
          </div>
        ) : (
          <div
            className="text-2xs textCenterDesktop justify-center mt-10 mb-8"
            style={{ textAlignLast: "center", color: "#333333" }}
          >
            <FormattedMessage id="footer.legal.mobile" />
          </div>
        )}
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
