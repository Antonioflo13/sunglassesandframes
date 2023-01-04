//REACT
import React, { useState } from "react";
//NEXT
import Image from "next/image";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setCartContent } from "../store/modules/cart";
//HOOKS
import shopifyBuildClient from "../hooks/shopifyBuildClient";
import useMediaQuery from "../hooks/useMediaQuery";
//UTILS
import { parserLineItems } from "../utils/parser";
import {
  FormattedMessage as OriginalFormattedMessage,
  FormattedNumber,
} from "react-intl";
import { getCookie } from "../utils/cookie";
//FRAMER
import { motion } from "framer-motion";
//COMPONENTS
import Layout from "../components/layout";
import Receipt from "../components/receipt";

const getItems = cart => {
  if (cart) {
    const { lineItems } = cart;
    return lineItems;
  }
};

const Cart = () => {
  //STATE
  const [isLoading, setIsLoading] = useState(false);

  //STORE
  const cart = useSelector(state => JSON.parse(state.cart.value));
  const language = useSelector(state => state.language.value);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  //FUNCTIONS

  const handleAddItem = async id => {
    setIsLoading(true);
    const item = [
      {
        variantId: id,
        quantity: 1,
      },
    ];
    const updatedCheckout = await shopifyBuildClient(
      "updateCheckout",
      language,
      item
    );

    if (updatedCheckout) {
      setIsLoading(false);
    }

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    dispatch(setCartContent(JSON.stringify(cartContent)));
  };

  const handleRemoveItem = async id => {
    setIsLoading(true);
    const item = [
      {
        variantId: id,
        quantity: -1,
      },
    ];
    const updatedCheckout = await shopifyBuildClient(
      "updateCheckout",
      language,
      item
    );

    if (updatedCheckout) {
      setIsLoading(false);
    }

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    dispatch(setCartContent(JSON.stringify(cartContent)));
  };

  const handleRemoveItems = async id => {
    setIsLoading(true);
    const item = [id];
    const updatedCheckout = await shopifyBuildClient(
      "removeLineItems",
      language,
      item
    );

    if (updatedCheckout) {
      setIsLoading(false);
    }

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    dispatch(setCartContent(JSON.stringify(cartContent)));
  };

  const goToCheckout = async () => {
    const checkoutWebUrl = getCookie("checkoutWebUrl");
    window.open(checkoutWebUrl, "_self");
  };

  const items = parserLineItems(getItems(cart));

  return (
    <Layout>
      <div className="drawer-container">
        <div className="drawer-title text-sunglassesandframes text-xl font-bold uppercase pb-5">
          <FormattedMessage id="drawer.title" />
        </div>
        <div className="pb-4 text-sm">
          <FormattedMessage id="drawer.ship.by" />
        </div>
        {isDesktop && (
          <Receipt
            items={items}
            isLoading={isLoading}
            cart={cart}
            goToCheckout={goToCheckout}
          />
        )}
        <hr />
        {items.length > 0 ? (
          <div className="containerListItem">
            {items &&
              items.map((item, key) => {
                return (
                  <div
                    className="drawer-product-container"
                    key={`${item.id}-${key}`}
                  >
                    <div className="drawer-product-image">
                      <Image
                        fill
                        sizes="100%"
                        priority
                        src={item.details.image.src}
                        alt="product-image"
                      />
                    </div>
                    <div className="drawer-product-description">
                      {/* <div className="text-sunglassesandframes-red text-xs font-bold italic raleway noToHead mt-2">
                          {item.details.title}
                        </div> */}
                      <div className="text-xs uppercase font-bold">
                        {item.titleProduct}
                      </div>
                      <div>
                        <FormattedMessage id="drawer.quantity" />
                        <span className="drawer-product-quantity">
                          {" "}
                          {isLoading ? (
                            <div>
                              <div className="animate-pulse flex space-x-4">
                                <div className="rounded-sm bg-slate-100 h-5 w-4"></div>
                              </div>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {item.quantity}
                            </motion.div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="drawer-product-actions">
                      <div className="icon-change-quantity">
                        <div
                          onClick={() =>
                            item.quantity === 1
                              ? handleRemoveItems(item.idLineItems)
                              : handleRemoveItem(item.id)
                          }
                        >
                          -
                        </div>
                      </div>
                      <div className="drawer-product-quantity">
                        {isLoading ? (
                          <div>
                            <div className="animate-pulse flex space-x-4">
                              <div className="rounded-sm bg-slate-100 h-4 w-3"></div>
                            </div>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {item.quantity}
                          </motion.div>
                        )}
                      </div>
                      <div className="icon-change-quantity">
                        <div onClick={() => handleAddItem(item.id)}>+</div>
                      </div>
                    </div>
                    <div className="drawer-product-price">
                      <FormattedNumber
                        style="currency" // eslint-disable-line
                        value={item.details.price.amount}
                        currency={item.details.price.currencyCode}
                        minimumFractionDigits={0}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="flex justify-center items-center p-10">
            <FormattedMessage id="drawer.empty" />
          </div>
        )}
        {!isDesktop && (
          <Receipt
            items={items}
            isLoading={isLoading}
            cart={cart}
            goToCheckout={goToCheckout}
          />
        )}
      </div>
      <style jsx="true">{`
        .drawer-container {
          position: relative;
          background-color: white;
          width: 100%;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
        }
        .drawer-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .close-button {
          cursor: pointer;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .drawer-title {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .drawer-sub-title {
          font-size: 14px;
          font-family: "Artegra Sans", sans-serif;
          margin-bottom: 40px;
        }
        .drawer-product-image {
          position: relative;
          width: 200px;
          height: 200px;
          padding-right: 20px;
          margin-right: 10px;
          overflow: hidden;
        }
        .drawer-product-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin: 30px 0;
        }
        .drawer-product-description {
          font-size: 12px;
          text-transform: lowercase;
          width: 40%;
          padding-right: 10px;
        }
        .drawer-product-quantity {
          font-size: 14px;
          font-weight: 800;
        }
        .drawer-product-price {
          font-size: 17px;
          font-weight: 800;
        }
        .drawer-product-description-title {
          font-weight: 600;
          text-transform: uppercase;
        }
        .drawer-product-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-right: 15px;
        }
        .icon-change-quantity {
          cursor: pointer;
        }
        .drawer-recap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          bottom: 2.5rem;
          width: 30%;
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
          width: 80%;
        }
        .containerListItem {
          overflow-y: auto;
          height: 100%;
        }

        @media (min-width: 768px) {
          .drawer-container {
            width: 100%;
            padding: 2.5rem;
          }
          .drawer-product-container {
            width: 50%;
          }
          .drawer-product-image {
            width: 200px;
          }
          .drawer-recap-description {
            justify-content: center;
            width: auto;
            margin: 0;
            margin-top: 25px;
          }
          .drawer-recap {
            position: absolute;
            top: 0;
          }
          .drawer-recap-checkout {
            width: 100%;
          }
          .drawer-recap-checkout button {
            height: 40px !important;
          }
          .containerListItem {
            overflow-y: auto;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Cart;

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
