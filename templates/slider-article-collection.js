import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

const SliderArticleCollection = ({ products, collectionHandle }) => {
  //STATE
  const [defaultProductImage, setDefaultProductImage] = useState("");

  //EFFECT
  useEffect(() => {
    setDefaultProductImage(localStorage.getItem("defaultProductImage"));
  }, []);

  return (
    <>
      <div className="sliderCollection">
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
              <SwiperSlide key={item.id}>
                <Link
                  href={{
                    pathname: `/designers/${collectionHandle}/${item?.node?.handle}`,
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
                          ?.nodes.length > 0
                          ? item?.node?.variants?.edges[0]?.node?.product
                              ?.images?.nodes[0].originalSrc
                          : defaultProductImage
                      }
                      alt="product"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs uppercase font-bold">
                      {item?.node?.vendor}
                    </div>
                    <div className="text-sunglassesandframes-black text-xs font-bold mackay noToHead">
                      {item?.node?.title}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
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
