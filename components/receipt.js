import { motion } from "framer-motion";
import {
  FormattedMessage as OriginalFormattedMessage,
  FormattedNumber,
} from "react-intl";
import ProductIcon from "./product-icon";
import React from "react";

const Receipt = ({ items, isLoading, cart, goToCheckout }) => {
  return (
    <>
      {items.length > 0 && (
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="drawer-recap">
            <div className="drawer-recap-title">
              <FormattedMessage id="drawer.summary" />
            </div>
            <div className="drawer-recap-row">
              <FormattedMessage id="drawer.subtotal" />
              <div>
                {isLoading ? (
                  <div>
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-sm bg-slate-50 h-4 w-7"></div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FormattedNumber
                      style="currency" // eslint-disable-line
                      value={cart?.totalPrice ? cart?.totalPrice.amount : 0}
                      currency={cart?.totalPrice.currencyCode}
                      minimumFractionDigits={0}
                    />
                  </motion.div>
                )}
              </div>
            </div>
            <div className="drawer-recap-row">
              <FormattedMessage id="drawer.delivery" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormattedNumber
                  style="currency" // eslint-disable-line
                  value={0}
                  currency={cart?.totalPrice.currencyCode}
                  minimumFractionDigits={0}
                />
              </motion.div>
            </div>
            <hr />
            <ProductIcon fontSize={8} />
            <div className="drawer-recap-row">
              <FormattedMessage id="drawer.total" />
              <div className="text-base">
                {isLoading ? (
                  <div>
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-sm bg-slate-50 h-5 w-10"></div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FormattedNumber
                      style="currency" // eslint-disable-line
                      value={cart?.totalPrice ? cart?.totalPrice.amount : 0}
                      currency={cart?.totalPrice.currencyCode}
                      minimumFractionDigits={0}
                    />
                  </motion.div>
                )}
              </div>
            </div>
            <div className="drawer-recap-checkout mt-4">
              <motion.button
                className="w-full rounded-xl bg-sunglassesandframes-black py-2 px-4 leading-5 text-white font-bold text-xs uppercase"
                style={{ height: "45px" }}
                onClick={goToCheckout}
              >
                <div className="font-bold">
                  <FormattedMessage id="drawer.label_button" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      <style jsx="true">{`
        .drawer-recap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          bottom: 2.5rem;
          width: 100%;
          height: 90%;
          background-color: white;
        }
        .drawer-recap-title {
          align-self: start;
          font-weight: 800;
        }
        .drawer-recap-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin: 10px 0;
        }
        .drawer-recap-description {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 25px;
        }
        .drawer-recap-quantity {
          border-radius: 100%;
          background-color: lightgray;
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }
        .drawer-recap-checkout {
          width: 100%;
        }

        @media (min-width: 768px) {
          .drawer-recap {
            width: 30%;
          }
          .drawer-recap-description {
            justify-content: center;
            width: auto;
            margin: 0;
            margin-top: 25px;
          }
          .drawer-recap-row {
            margin: unset;
          }
          .drawer-recap {
            position: absolute;
            top: 0;
          }
          .drawer-recap-checkout button {
            height: 40px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      r: chunk => <b className="text-sunglassesandframes-black">{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
