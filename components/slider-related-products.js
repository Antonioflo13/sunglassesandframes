import React from "react";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import Link from "next/link";

const sliderRelatedProducts = props => {
  const { relatedProducts, collectionHandle } = props;
  return (
    <>
      <div className="mb-16">
        <div className="mt-16 text-2xs font-bold">
          <FormattedMessage id="product.related_products_title" />
        </div>
        <div>
          <Swiper
            id="swiper-related-products"
            slidesPerView={2}
            centeredSlides={true}
            spaceBetween={90}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 90,
                centeredSlides: false,
                loop: true,
              },
            }}
          >
            {relatedProducts?.map(item => (
              <SwiperSlide key={item.id}>
                <Link
                  href={{
                    pathname: `/designers/[designer]/[product]`,
                    query: {
                      designer: collectionHandle,
                      product: item.handle,
                    },
                  }}
                >
                  <div className="container-slider">
                    <img
                      className="img-product"
                      src={
                        item.node.variants.edges[0].node.product.images.nodes[1]
                          .transformedSrc
                      }
                      alt="product"
                    />
                    <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead">
                      {item.node.vendor}
                    </div>
                    <div className="text-xs uppercase font-bold">
                      {item.node.title}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx="true">{`
        .container-slider {
          cursor: pointer;
          text-align: center;
          width: 100%;
        }
        @media (max-width: 768px) {
          .container-slider {
            cursor: pointer;
            width: 160px;
          }
        }
      `}</style>
    </>
  );
};

export default sliderRelatedProducts;

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
