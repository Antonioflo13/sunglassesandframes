//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import { useRouter } from "next/router";
//API
import { getProductsByCollections } from "../api/product";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

//NAVIGATE
import { FormattedNumber } from "react-intl";
//FORMAT MESSAGE
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import BottomSheet from "./bottom-sheet";
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
//STORE BOUTIQUES
import { stores } from "../data/stores";
//ICONS
import RowLeft from "../assets/images/product-page/angle-left.png";
import RowRight from "../assets/images/product-page/angle-right.png";
//COMPONENTS
import Label from "../components/label";
import ProductIcon from "../components/product-icon";
import SliderRelatedProducts from "../components/slider-related-products";
import Footer from "../components/footer";
import { css } from "emotion";
import Image from "next/image";

const MobileProductTemplate = props => {
  const {
    product,
    hasNextPage,
    cursor,
    shopifyProduct,
    buy,
    askForPrice,
    relatedProducts,
    collectionHandle,
    accordion,
    setAccordion,
  } = props;
  //STATE
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState(relatedProducts);
  const [swiperIndex, setSwiperIndex] = useState(
    relatedProducts.findIndex(
      relatedProduct => relatedProduct.handle === product.handle
    )
  );
  const [newCursor, setNewCursor] = useState(cursor);
  const [newHasNextPage, setNewHasNextPage] = useState(hasNextPage);
  const router = useRouter();
  //REF
  const swiperRef = useRef(null);

  //EFFECT
  useEffect(() => {
    if (swiperIndex > products.length - 2 && newHasNextPage) {
      getProductsByCollections(collectionHandle, 20, newCursor).then(
        response => {
          setNewCursor(response.data.collection.products.pageInfo.endCursor);
          setNewHasNextPage(
            response.data.collection.products.pageInfo.hasNextPage
          );
          const newProducts = response.data.collection.products.nodes;

          setProducts(oldProducts => [...oldProducts, ...newProducts]);
        }
      );
    }
  }, [swiperIndex]);

  //FUNCTIONS
  const slideTo = () => {};
  const swipeToProduct = swiper => {
    if (swiper === "prev") {
      setSwiperIndex(prevSwiperIndexPrev => {
        setSwiperIndex(prevSwiperIndexPrev - 1);
        router.push(
          `/collections/${collectionHandle}/${
            products[prevSwiperIndexPrev - 1].handle
          }`
        );
      });
    }
    if (swiper === "next") {
      setSwiperIndex(prevSwiperIndexPrev => {
        setSwiperIndex(prevSwiperIndexPrev + 1);
        router.push(
          `/collections/${collectionHandle}/${
            products[prevSwiperIndexPrev + 1].handle
          }`
        );
      });
    }
    if (swiper?.activeIndex) {
      setSwiperIndex(swiper?.activeIndex);
      router.push(
        `/collections/${collectionHandle}/${
          products[swiper?.activeIndex].handle
        }`
      );
    }
    // const indexSlide = 0;
    // let index = indexSlide;
    // if (swiper.swipeDirection === "prev" || swiper === "prev") {
    //   index = indexSlide === 0 ? relatedProducts.length - 1 : indexSlide - 1;
    // } else if (swiper.swipeDirection === "next" || swiper === "next") {
    //   index = indexSlide === relatedProducts.length - 1 ? 0 : indexSlide + 1;
    // }
    // if (index < shopifyProducts.length) {
    //   navigate(
    //     `/collections/${collectionHandle}/products/${shopifyProducts[index].handle}`
    //   );
    // }
  };

  const [heightPage, setHeightPage] = useState(0);
  useEffect(() => {
    setHeightPage(window.innerHeight);
  }, [window.innerHeight]);
  const bottomSheetRef = useRef();
  let bottomSheetScrollTop = bottomSheetRef.current?.scrollTop;
  useEffect(() => {
    bottomSheetScrollTop = 0;
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
        {products &&
          products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="sliderWrapper">
                <Swiper
                  id="swiper-image-pdp"
                  style={{ height: "100vh" }}
                  className="bg-indice-grey"
                  cssMode={true}
                  pagination={true}
                  direction={"vertical"}
                  loop={true}
                  slidesPerView={1}
                  modules={[Pagination]}
                >
                  {product.variants.edges[0].node.product.images.nodes.length >
                    0 &&
                    product.variants.edges[0].node.product.images.nodes.map(
                      (image, product) => (
                        <SwiperSlide key={product}>
                          <div className="image-container">
                            <Image
                              fill="true"
                              sizes="100%"
                              priority={true}
                              style={{
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                              src={image.originalSrc}
                              alt={image.originalSrc}
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
                  }}
                  isExpanded={expanded => setIsExpanded(expanded)}
                >
                  <div
                    ref={bottomSheetRef}
                    className="mb-10"
                    style={{
                      height: "100vh",
                      overflow: isExpanded ? "hidden" : "scroll",
                    }}
                  >
                    <div className="customStyle mb-10">
                      <div
                        className="flex justify-center"
                        style={{ padding: "10px 0" }}
                      >
                        <div className="slide-icon"></div>
                      </div>
                      <div className="w-full flex flex-col justify-start items-center">
                        <div className="text-sunglassesandframes-red text-xs font-bold italic mackay noToHead">
                          {product.vendor}
                        </div>
                        <div className="ml-1 text-xs uppercase font-bold mt-2">
                          {product.title}
                        </div>
                      </div>
                      <div className="text-center text-sm mb-5 mt-2">
                        {product.availableForSale &&
                        !product.tags.includes("nfs") &&
                        product.variants.edges[0].node.quantityAvailable > 0 ? (
                          <>
                            <FormattedNumber
                              style="currency" // eslint-disable-line
                              value={
                                product.variants.edges[0].node.priceV2.amount
                              }
                              currency={
                                product.variants.edges[0].node.priceV2
                                  .currencyCode
                              }
                              minimumFractionDigits={2}
                            />

                            <div>
                              <Label
                                style={{ width: "100%" }}
                                onClick={() =>
                                  buy(product.variants.edges[0].node.id)
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
                      <div className="mt-10">
                        <ProductIcon />
                      </div>
                      <div
                        className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      />
                      <div className="mt-5">
                        <div className="flex flex-col">
                          <div
                            className="containerAccordion"
                            onClick={() =>
                              setAccordion({
                                ...accordion,
                                size: !accordion.size,
                              })
                            }
                          >
                            <div className="font-bold uppercase text-sm">
                              <FormattedMessage id="product.size.title" />
                            </div>
                            {accordion.size ? (
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="containerIcon"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="containerIcon"
                              />
                            )}
                          </div>
                          {accordion.size && (
                            <>
                              <div className="text-xs">
                                <FormattedMessage id="product.." />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col mt-5">
                          <div
                            className="containerAccordion"
                            onClick={() =>
                              setAccordion({
                                ...accordion,
                                shipping: !accordion.shipping,
                              })
                            }
                          >
                            <div className="font-bold uppercase text-sm">
                              <FormattedMessage id="product.shipping.title" />
                            </div>
                            {accordion.shipping ? (
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="containerIcon"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="containerIcon"
                              />
                            )}
                          </div>
                          {accordion.shipping && (
                            <>
                              <div className="text-xs">
                                <FormattedMessage id="product.." />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {/*{relatedProducts.length > 0 && (*/}
                      {/*  <SliderRelatedProducts*/}
                      {/*    relatedProducts={relatedProducts}*/}
                      {/*    collectionHandle={collectionHandle}*/}
                      {/*  />*/}
                      {/*)}*/}
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
          position: relative;
          height: 100%;
        }

        .slide-icon {
          border: 2px solid grey;
          width: 30px;
          border-radius: 10px;
        }

        .rowLeft {
          position: absolute;
          bottom: 35%;
          left: 20px;
          z-index: 2;
        }

        .rowRight {
          position: absolute;
          bottom: 35%;
          right: 20px;
          z-index: 2;
        }

        .textStores {
          width: 100px;
          margin: 0 auto;
        }

        .available-store-img {
          border-radius: 20px;
          height: 55px;
          margin: 0 auto;
          width: 100px;
          object-fit: fill;
        }

        .containerAccordion {
          display: flex;
          justify-content: space-between;
        }
        .available-store-container {
          display: flex;
          width: 100%;
          text-align: center;
          gap: 1rem;
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
      r: chunk => <b className="text-sunglassesandframes-red">{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
