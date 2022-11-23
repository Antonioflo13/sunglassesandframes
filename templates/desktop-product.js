import {
  FormattedMessage as OriginalFormattedMessage,
  FormattedNumber,
} from "react-intl";
import Label from "../components/label";
import SliderRelatedProducts from "../components/slider-related-products";
import React from "react";
//COMPONENTS
import ProductIcon from "../components/product-icon";

const DesktopProduct = props => {
  const {
    shopifyProduct,
    buy,
    askForPrice,
    mainImage,
    relatedProducts,
    collectionHandle,
  } = props;

  return (
    <>
      <div className="customTemplate">
        <div className="w-full flex flex-col-reverse md:flex-col imageContainer">
          <div className="hidden md:block">{mainImage}</div>
        </div>
        <div className="flex flex-col buyContainer">
          <div className="flex flex-col items-center">
            <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead mt-2">
              {shopifyProduct.node.vendor}
            </div>
            <div className="ml-1 text-xs uppercase font-bold my-2">
              {shopifyProduct.node.title}
            </div>
            <div className="mb-2">
              <FormattedNumber
                style="currency" // eslint-disable-line
                value={
                  shopifyProduct.node.variants.edges[0].node.priceV2.amount
                }
                currency={
                  shopifyProduct.node.variants.edges[0].node.priceV2
                    .currencyCode
                }
                minimumFractionDigits={0}
              />
            </div>
          </div>
          <div className="flex text-sm flex-col mb-5 text-center">
            {shopifyProduct.node.availableForSale &&
            !shopifyProduct.node.tags.includes("nfs") &&
            shopifyProduct.node.variants.edges[0].node.quantityAvailable > 0 ? (
              <>
                <div>
                  <Label style={{ width: "60%" }} onClick={buy}>
                    <FormattedMessage id="product.buy" />
                  </Label>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs whitespace-pre-line product-description">
                  <FormattedMessage id="product.specialEdition" />
                </div>

                <div className="button-price">
                  <Label onClick={askForPrice}>
                    <FormattedMessage id="product.contact_us" />
                  </Label>
                </div>
              </>
            )}
          </div>
          <ProductIcon />
        </div>
        {/* Other info and main image */}
      </div>
      <div className="flex gap-8">
        <button className="text-xs menu-button">
          <FormattedMessage id="product.details" />
        </button>
        <button className="text-xs menu-button">
          <FormattedMessage id="product.size" />
        </button>
        <button className="text-xs menu-button">
          <FormattedMessage id="product.delivery.and.returns" />
        </button>
      </div>
      <hr />
      <div
        className="my-4 text-xs whitespace-pre-line product-description"
        dangerouslySetInnerHTML={{
          __html: shopifyProduct.node.descriptionHtml,
        }}
      />
      {/*<div className="my-20 text-xs text-center px-5">*/}
      {/*  <FormattedMessage id="home.slider_monthly.text" />*/}
      {/*</div>*/}
      {/*{relatedProducts.length > 0 && (*/}
      {/*  <SliderRelatedProducts*/}
      {/*    relatedProducts={relatedProducts}*/}
      {/*    collectionHandle={collectionHandle}*/}
      {/*  />*/}
      {/*)}*/}
      <style jsx="true">
        {`
          .button-price button {
            width: 100vw !important;
            height: 40px !important;
          }

          @media (max-width: 768px) {
            .button-price button {
              width: 90% !important;
              height: 45px !important;
            }
          }

          @media (min-width: 1440px) {
            .button-price button {
              width: 20vw !important;
            }
          }
          .buyContainer {
            width: 40%;
          }
          .imageContainer {
            width: 60%;
          }
          .menu-button {
            padding: 10px;
            border-width: 0 0 1px 0;
            border-color: transparent;
          }

          .menu-button:hover,
          .menu-button:active,
          .menu-button:focus {
            text-shadow: 0 0 1.2px black;
            border-width: 0 0 1px 0;
            border-color: black;
          }

          .product-description {
            line-height: 1.4rem;
            width: 30%;
          }

          .customTemplate {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default DesktopProduct;

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
