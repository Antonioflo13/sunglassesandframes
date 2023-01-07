//REACT
import React, { useState } from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
//COMPONENTS
import Label from "../components/label";
import ProductIcon from "../components/product-icon";
import Product from "../components/product";

const DesktopProduct = props => {
  const {
    shopifyProduct,
    buy,
    askForPrice,
    mainImage,
    relatedProducts,
    colorProducts,
    collectionHandle,
    collectionImage,
  } = props;

  //STATE
  const [activePanels, setActivePanels] = useState({ details: true });

  //FUNCTIONS
  const togglePanel = panel => {
    switch (panel) {
      case "details":
        setActivePanels({
          ...activePanels,
          details: true,
          size: false,
          delivery: false,
        });
        break;
      case "size":
        setActivePanels({
          ...activePanels,
          details: false,
          size: true,
          delivery: false,
        });
        break;
      case "delivery":
        setActivePanels({
          ...activePanels,
          details: false,
          size: false,
          delivery: true,
        });
        break;
    }
  };
  return (
    <>
      <div className="customTemplate">
        <div className="w-full flex flex-col-reverse md:flex-col imageContainer">
          <div>{mainImage}</div>
        </div>
        <div className="flex flex-col buyContainer">
          <div className="flex flex-col items-center">
            <div
              className="text-m uppercase font-bold"
              style={{ fontSize: "18px" }}
            >
              {shopifyProduct.node.title}
            </div>
            {collectionImage && (
              <div className="collection-logo-container">
                <Image
                  fill
                  priority={true}
                  style={{ objectFit: "contain" }}
                  sizes="100%"
                  src={collectionImage}
                  alt="logo-collection"
                />
              </div>
            )}
            <div className="mb-2">
              {/* <FormattedNumber
                style="currency" // eslint-disable-line
                value={
                  shopifyProduct.node.variants.edges[0].node.priceV2.amount
                }
                currency={
                  shopifyProduct.node.variants.edges[0].node.priceV2
                    .currencyCode
                }
                minimumFractionDigits={0}
              /> */}
              {Number(
                shopifyProduct.node.variants.edges[0].node.priceV2.amount
              )}
              €
            </div>
          </div>
          <div className="flex text-sm flex-col mb-5 text-center">
            {shopifyProduct.node.availableForSale &&
            !shopifyProduct.node.tags.includes("nfs") &&
            shopifyProduct.node.variants.edges[0].node.quantityAvailable > 0 ? (
              <>
                <div>
                  <Label style={{ width: "50%" }} onClick={buy}>
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
          <div className="grid grid-cols-2 gap-x-2 customColorPDP">
            {colorProducts.map(product => (
              <Link
                key={product.node.id}
                href={{
                  pathname: `/designers/${collectionHandle}/${
                    product.node.handle
                  }/color=${
                    product.node?.options?.find(
                      option => option.name === "Color"
                    )?.values
                  }`,
                }}
              >
                <div className="w-full flex flex-col items-center">
                  <div className="image-container">
                    <>
                      <Image
                        fill="true"
                        style={{ objectFit: "cover" }}
                        sizes="100%"
                        priority={true}
                        src={product.node.images.nodes[1].transformedSrc}
                        alt="product-image"
                      />
                    </>
                  </div>
                  <div className="text-sunglassesandframes-black text-xs font-bold italic raleway noToHead mt-2">
                    {product.node.vendor}
                  </div>
                  <div className="ml-1 text-xs uppercase font-bold mt-2">
                    {product.node.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Other info and main image */}
      </div>
      <div className="flex gap-8">
        <button
          className="text-xs menu-button"
          onClick={() => togglePanel("details")}
        >
          <FormattedMessage id="product.details" />
        </button>
        <button
          className="text-xs menu-button"
          onClick={() => togglePanel("size")}
        >
          <FormattedMessage id="product.size" />
        </button>
        <button
          className="text-xs menu-button"
          onClick={() => togglePanel("delivery")}
        >
          <FormattedMessage id="product.delivery.and.returns" />
        </button>
      </div>
      <hr />
      {activePanels.details && (
        <div
          className="my-4 text-xs whitespace-pre-line product-description"
          dangerouslySetInnerHTML={{
            __html: shopifyProduct.node.descriptionHtml.split("<br><br>")[0],
          }}
        />
      )}
      {activePanels.size && (
        <div
          className="my-4 text-xs whitespace-pre-line product-description"
          dangerouslySetInnerHTML={{
            __html: shopifyProduct.node.descriptionHtml.split("<br><br>")[1],
          }}
        />
      )}
      {activePanels.delivery && (
        <div
          className="my-4 text-xs whitespace-pre-line product-description"
          dangerouslySetInnerHTML={{
            __html: shopifyProduct.node.descriptionHtml.split("<br><br>")[0],
          }}
        />
      )}
      {relatedProducts.length > 0 && (
        <>
          <div className="my-20 text-xs text-center px-5">
            <FormattedMessage id="home.slider_monthly.text" />
          </div>
          <div
            className="overflow-x-scroll"
            style={{ marginTop: "5rem", marginBottom: "5rem" }}
          >
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-20">
              {relatedProducts.map((product, index) => (
                <Product
                  key={index}
                  product={product}
                  collectionHandle={collectionHandle}
                  fromAlgoliaSearch={false}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <style jsx="true">
        {`
          .button-price button {
            width: 100vw !important;
            height: 40px !important;
          }

          .collection-logo-container {
            position: relative;
            width: 90px;
            height: 30px;
          }

          .image-container {
            width: 68%;
            position: relative;
            height: 100px;
            overflow: hidden;
            animation: fadeIn 0.2s linear;
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

          .customColorPDP {
            width: 70%;
            align-self: center;
            margin-top: 15px;
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
