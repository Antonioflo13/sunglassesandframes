//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import { useRouter } from "next/router";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

//NAVIGATE
import { FormattedNumber } from "react-intl";
//FORMAT MESSAGE
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import BottomSheet from "./bottom-sheet";
//COMPONENTS
import Label from "../components/label";
import ProductIcon from "../components/product-icon";
import SliderRelatedProducts from "../components/slider-related-products";
import Footer from "../components/footer";
import { css } from "emotion";
import Image from "next/image";
import { getCollection } from "../api/collections";
import InfoMobile from "../components/infoMobile";

const MobileProductTemplate = props => {
  const {
    productHandle,
    hasMore,
    cursor,
    color,
    product,
    buy,
    askForPrice,
    relatedProducts,
    mobileProducts,
    collectionHandle,
    collectionImage,
  } = props;

  //ROUTER
  const router = useRouter();

  //HEIGHT
  const [heightPage, setHeightPage] = useState(window.innerHeight);

  //STATE
  const [isExpanded, setIsExpanded] = useState(false);

  const [products, setProducts] = useState(mobileProducts);

  const [hasNextPage, setHasNextPage] = useState(hasMore);

  const [newCursor, setNewCursor] = useState(cursor);

  const [newColor, setNewColor] = useState(color);

  const [swiperIndex, setSwiperIndex] = useState(
    mobileProducts.findIndex(product => product.node.handle === productHandle)
  );

  const bottomSheetRef = useRef();

  let bottomSheetScrollTop = bottomSheetRef.current?.scrollTop;

  //FUNCTIONS
  const swipeToProduct = swiper => {
    if (swiper?.activeIndex) {
      if (swiper.activeIndex > products.length - 1) {
        console.log(swiper?.activeIndex);
        setSwiperIndex(0);
        router.push(
          `/designers/${collectionHandle}/${products[0].node.handle}${
            newColor ? `?color=${newColor}` : ""
          }${newCursor ? `&cursor=${newCursor}` : ""}`,
          undefined,
          { shallow: true }
        );
      } else {
        setSwiperIndex(swiper?.activeIndex);
        setNewCursor(products[swiper?.activeIndex].cursor);
        setNewColor(
          products[swiper?.activeIndex].node?.options?.find(
            option => option.name === "Color"
          )?.values[0]
        );
        router.push(
          `/designers/${collectionHandle}/${
            products[swiper?.activeIndex - 1].node.handle
          }/${newColor ? `?color=${newColor}` : ""}${
            newCursor ? `&cursor=${newCursor}` : ""
          }`,
          undefined,
          { shallow: true }
        );
      }
    }
  };

  const getProductByCollection = async (collectionHandle, first, cursor) =>
    await getCollection(collectionHandle, first, cursor);

  //EFFECT
  // useEffect(() => {
  //   if (!cursor) {
  //     console.log(cursor);
  //     setProducts([product]);
  //   }
  // }, [cursor]);

  //CHANGE INDEX IMAGE
  useEffect(() => {
    if (mobileProducts) {
      const copyMobileProducts = JSON.parse(JSON.stringify(mobileProducts));
      let arr = [];
      for (const product of copyMobileProducts) {
        const [firstImage, secondImage] =
          product.node.variants.edges[0].node.product.images.nodes;
        const copyArray =
          product.node.variants.edges[0].node.product.images.nodes;
        copyArray.splice(0, 1, secondImage);
        copyArray.splice(1, 1, firstImage);
        product.node.variants.edges[0].node.product.images.nodes = copyArray;
        arr.push(product);
      }
      setProducts(arr);
    }
  }, [mobileProducts]);

  useEffect(() => {
    if (swiperIndex === products.length - 2 && hasNextPage) {
      console.log(swiperIndex);
      getProductByCollection(collectionHandle, 20, newCursor).then(response => {
        const newProducts = response.data.collection.products.edges;
        console.log(newProducts);
        const isMore = response.data.collection.products.pageInfo.hasNextPage;
        setHasNextPage(isMore);
        setProducts(oldProducts => [...oldProducts, ...newProducts]);
      });
    }

    if (swiperIndex === products.length - 2 && !hasNextPage) {
      getProductByCollection(collectionHandle, 20).then(response => {
        const newProducts = response.data.collection.products.edges;
        const isMore = response.data.collection.products.pageInfo.hasNextPage;
        setHasNextPage(isMore);
        setNewCursor(products[swiperIndex].cursor);
        setProducts(oldProducts => [...oldProducts, ...newProducts]);
      });
    }
  }, [swiperIndex]);

  useEffect(() => {
    setHeightPage(window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    if (!isExpanded) {
      bottomSheetScrollTop = 0;
      document.getElementsByClassName("swiper-button-next")[0].style.zIndex = 0;
      document.getElementsByClassName("swiper-button-prev")[0].style.zIndex = 0;
    } else {
      bottomSheetScrollTop = 0;
      document.getElementsByClassName(
        "swiper-button-next"
      )[0].style.zIndex = 10;
      document.getElementsByClassName(
        "swiper-button-prev"
      )[0].style.zIndex = 10;
    }
  }, [isExpanded]);

  return (
    <div>
      <Swiper
        initialSlide={swiperIndex}
        allowSlideNext={isExpanded}
        allowSlidePrev={isExpanded}
        onActiveIndexChange={swipeToProduct}
        navigation={true}
        modules={[Navigation]}
        loop={true}
      >
        {products.length > 0 &&
          products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="sliderWrapper">
                <Swiper
                  id="swiper-image-pdp"
                  style={{ height: "100vh" }}
                  cssMode={true}
                  pagination={true}
                  direction={"vertical"}
                  loop={true}
                  slidesPerView={1}
                  modules={[Pagination]}
                >
                  <div className="title-product">
                    <span>{products[swiperIndex].node.vendor}</span>
                    <span className="font-bold">
                      {products[swiperIndex].node.title}
                    </span>
                  </div>
                  {product.node.variants.edges[0].node.product.images.nodes.map(
                    image => (
                      <SwiperSlide
                        style={{ display: "flex", justifyContent: "center" }}
                        key={image.id}
                      >
                        <div className="image-container">
                          <Image
                            width={100}
                            height={100}
                            sizes="100%"
                            priority={true}
                            style={{
                              objectFit: "contain",
                              objectPosition: "center",
                              width: "100%",
                              height: "88%",
                            }}
                            src={image.transformedSrc}
                            alt={image.transformedSrc}
                          />
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
              <div
                className={css`
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  pointer-events: none;
                  z-index: 1;
                `}
              >
                <BottomSheet
                  defaultMode="collapsed"
                  height={heightPage}
                  style={{
                    pointerEvents: "all",
                    overflow: isExpanded ? "hidden" : "scroll",
                    background: "white",
                  }}
                  isExpanded={expanded => setIsExpanded(expanded)}
                >
                  <div
                    className="mb-10"
                    style={{
                      height: "100vh",
                    }}
                  >
                    <div
                      className="customStyle mb-10"
                      style={{
                        borderTop: "1px solid black",
                        borderRadius: "10px",
                      }}
                      ref={bottomSheetRef}
                    >
                      <div
                        className="flex justify-center"
                        style={{ padding: "10px 0" }}
                      >
                        <div className="slide-icon"></div>
                      </div>
                      <div className="w-full flex flex-col justify-start items-center">
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
                        <div className="ml-1 text-xs uppercase font-bold mt-2">
                          {product.node.title}
                        </div>
                      </div>
                      <div className="text-center text-sm mb-5 mt-2">
                        {product.node.availableForSale &&
                        !product.node.tags.includes("nfs") &&
                        product.node.variants.edges[0].node.quantityAvailable >
                          0 ? (
                          <>
                            <FormattedNumber
                              style="currency" // eslint-disable-line
                              value={
                                product.node.variants.edges[0].node.priceV2
                                  .amount
                              }
                              currency={
                                product.node.variants.edges[0].node.priceV2
                                  .currencyCode
                              }
                              minimumFractionDigits={0}
                            />

                            <div>
                              <Label
                                style={{ width: "100%" }}
                                onClick={() =>
                                  buy(product.node.variants.edges[0].node.id)
                                }
                              >
                                <FormattedMessage id="product.buy" />
                              </Label>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-xs whitespace-pre-line product-description">
                              <FormattedMessage id="product.specialEdition" />
                            </div>

                            <div>
                              <Label
                                style={{ width: "100%" }}
                                onClick={askForPrice}
                              >
                                <FormattedMessage id="product.contact_us" />
                              </Label>
                            </div>
                          </>
                        )}
                      </div>
                      <ProductIcon />
                      <div
                        className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.node.descriptionHtml,
                        }}
                      />
                    </div>
                    {relatedProducts.length > 0 && (
                      <SliderRelatedProducts
                        relatedProducts={relatedProducts}
                        collectionHandle={collectionHandle}
                      />
                    )}
                    <div className="customStyle">
                      <InfoMobile />
                    </div>
                    <Footer />
                  </div>
                </BottomSheet>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <style jsx="true">{`
        .image-container {
          display: flex;
          height: 100%;
          width: 70%;
        }

        .collection-logo-container {
          position: relative;
          width: 100px;
          height: 30px;
        }

        .title-product {
          position: absolute;
          bottom: 55%;
          font-size: 10px;
          left: -40px;
          z-index: 99999;
          transform: rotate(270deg);
        }

        .slide-icon {
          border: 2px solid grey;
          width: 30px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MobileProductTemplate;

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
