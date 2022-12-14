import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import Link from "next/link";

const SliderArticleProducts = ({ productsinArticle }) => {
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
          {productsinArticle.map(item => (
            <SwiperSlide key={item.id}>
              {item.node.handle}
              <Link
                href={{
                  pathname: `/designers/${item.node.handle}`,
                }}
              >
                <div style={{ cursor: "pointer" }}>
                  <img
                    className="img-product"
                    src={item.node.images[1].transformedSrc}
                    alt="product"
                  />
                  <div className="text-sunglassesandframes-black text-xs font-bold italic raleway noToHead mt-2">
                    {item.node.vendor}
                  </div>
                  <div className="ml-1 text-xs uppercase font-bold mt-2">
                    {item.node.title}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx="true">{`
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
  );
};

export default SliderArticleProducts;
