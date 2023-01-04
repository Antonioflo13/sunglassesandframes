import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { FormattedNumber } from "react-intl";

const SliderArticleCollection = ({ products, collectionHandle }) => {
  //STATE
  const [showSwiper, setShowSwiper] = useState(false);

  //EFFECT
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  return (
    <>
      {showSwiper && (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 90,
            },
          }}
        >
          {products &&
            products?.map(item => (
              <SwiperSlide key={item.node.id}>
                <Link
                  href={{
                    pathname: `/designers/${collectionHandle}/${item?.node?.handle}`,
                    query: { cursor: item?.cursor },
                  }}
                >
                  <div className="container-slider">
                    <Image
                      fill="true"
                      sizes="100%"
                      priority={true}
                      style={{ objectFit: "cover" }}
                      src={
                        item?.node?.variants?.edges[0]?.node?.product?.images
                          ?.nodes[1].transformedSrc
                      }
                      alt="product"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs uppercase font-bold">
                      {item?.node?.vendor}
                    </div>
                    <div className="text-sunglassesandframes-black text-xs font-bold raleway noToHead">
                      {item?.node?.title}
                    </div>
                    {item.node.availableForSale &&
                      !item.node.tags.includes("nfs") &&
                      item.node.totalInventory > 0 && (
                        <p className="text-2xs">
                          <FormattedNumber
                            style="currency"
                            value={
                              item.node.variants.edges[0].node.priceV2.amount
                            }
                            currency={
                              item.node.variants.edges[0].node.priceV2
                                .currencyCode
                            }
                            minimumFractionDigits={0}
                          />
                        </p>
                      )}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      <style jsx="true">
        {`
          .container-slider {
            cursor: pointer;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
            height: 150px;
          }
        `}
      </style>
    </>
  );
};

export default SliderArticleCollection;
