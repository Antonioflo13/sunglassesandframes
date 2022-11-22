import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import Link from "next/link";
import Image from "next/image";

const SliderHomeCollection = ({
  monthlyHighlightCollection,
  defaultProductImage,
}) => {
  const collectionHandle = monthlyHighlightCollection?.data?.collection?.handle;
  const [isVisible, setIsVisible] = useState(false);
  monthlyHighlightCollection =
    monthlyHighlightCollection.data?.collection?.products?.edges;
  defaultProductImage =
    defaultProductImage?.data?.defaultProductImage?.image?.url;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    isVisible && (
      <>
        <div className="mt-20 mb-10 text-center uppercase">
          <FormattedMessage id="home.slider_monthly.title" />
        </div>
        <div className="sliderCollection">
          <Swiper
            slidesPerView={2.3}
            centeredSlides={true}
            spaceBetween={90}
            loop={true}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 90,
                centeredSlides: false,
                loop: true,
              },
            }}
          >
            {monthlyHighlightCollection?.map((item, id) => (
              <SwiperSlide key={id}>
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
                      className="img-product"
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
        <style jsx="true">{`
          .container-slider {
            cursor: pointer;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
            height: 300px;
          }
          @media (max-width: 768px) {
            .container-slider {
              cursor: pointer;
              width: 160px;
            }
          }
          .sliderCollection {
            padding-bottom: 40px;
            max-width: 90rem;
            margin-left: auto;
            margin-right: auto;
          }

          .swiper-wrapper {
            transform: translate3d(-1328.28px, 0px, 0px);
          }

          .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </>
    )
  );
};

export default SliderHomeCollection;

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
