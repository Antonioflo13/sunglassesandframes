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
        <div className="flex flex-col justify-start items-center buyContainer">
          <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead mt-2">
            {shopifyProduct.vendor}
          </div>
          <div className="ml-1 text-xs uppercase font-bold mt-2">
            {shopifyProduct.title}
          </div>
          <div className="flex items-center text-sm flex-col mb-5">
            {shopifyProduct.availableForSale &&
            !shopifyProduct.tags.includes("nfs") &&
            shopifyProduct.variants.edges[0].node.quantityAvailable > 0 ? (
              <>
                <FormattedNumber
                  style="currency" // eslint-disable-line
                  value={shopifyProduct.variants.edges[0].node.priceV2.amount}
                  currency={
                    shopifyProduct.variants.edges[0].node.priceV2.currencyCode
                  }
                  minimumFractionDigits={2}
                />

                <div className="button-price">
                  <Label onClick={buy}>
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
      <hr />
      <div
        className="my-4 text-xs whitespace-pre-line product-description"
        dangerouslySetInnerHTML={{
          __html: shopifyProduct.descriptionHtml,
        }}
      />
      <div className="my-20 text-xs text-center px-5">
        <FormattedMessage id="home.slider_monthly.text" />
      </div>
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
          .textStores {
            width: 100px;
            margin: 0 auto;
          }
          .product-description {
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
      r: chunk => <b className="text-sunglassesandframes-red">{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
