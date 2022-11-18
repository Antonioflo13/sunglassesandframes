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

const MobileProductTemplate = props => {
  const {
    productHandle,
    product,
    shopifyProduct,
    hasMore,
    cursor,
    buy,
    askForPrice,
    relatedProducts,
    collectionHandle,
  } = props;

  //STATE
  const productIndex = relatedProducts.findIndex(
    relatedProduct => relatedProduct.node.handle === productHandle
  );

  const [isExpanded, setIsExpanded] = useState(false);

  const [products, setProducts] = useState(relatedProducts);

  const [hasNextPage, setHasNextPage] = useState(hasMore);

  const [newCursor, setNewCursor] = useState(cursor);

  const [swiperIndex, setSwiperIndex] = useState(
    products.findIndex(
      relatedProduct => relatedProduct.node.handle === productHandle
    )
  );
  const router = useRouter();

  //EFFECT
  useEffect(() => {
    if (swiperIndex === products.length - 2 && hasNextPage) {
      getProductByCollection(collectionHandle, 20, newCursor).then(response => {
        const newProducts = response.data.collection.products.edges;
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

  //FUNCTIONS
  const swipeToProduct = swiper => {
    if (swiper?.activeIndex) {
      if (swiper.activeIndex > products.length - 1) {
        console.log(swiper?.activeIndex);
        setSwiperIndex(0);
        router.push(
          `/collections/${collectionHandle}/${products[0].node.handle}?cursor=${newCursor}`,
          undefined,
          { shallow: true }
        );
      } else {
        setSwiperIndex(swiper?.activeIndex - 1);
        router.push(
          `/collections/${collectionHandle}/${
            products[swiper?.activeIndex - 1].node.handle
          }?cursor=${newCursor}`,
          undefined,
          { shallow: true }
        );

      }
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

  const getProductByCollection = async (collectionHandle, first, cursor) =>
    await getCollection(collectionHandle, first, cursor);

  const [heightPage, setHeightPage] = useState(0);
  useEffect(() => {
    setHeightPage(window.innerHeight);
  }, [window.innerHeight]);
  const bottomSheetRef = useRef();
  let bottomSheetScrollTop = bottomSheetRef.current?.scrollTop;
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
        {products &&
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
                  {product.node.variants.edges[0].node.product.images.nodes
                    .length > 0 &&
                    product.node.variants.edges[0].node.product.images.nodes.map(
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
                        <div className="text-sunglassesandframes-red text-xs font-bold italic mackay noToHead">
                          {product.node.vendor}
                        </div>
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
                              minimumFractionDigits={2}
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
                      <div className="mt-10">
                        <ProductIcon />
                      </div>
                      <div
                        className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.node.descriptionHtml,
                        }}
                      />
                      <div
                        className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.node.descriptionHtml,
                        }}
                      />
                      <div
                        className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.node.descriptionHtml,
                        }}
                      />
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
          width: 95%;
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
