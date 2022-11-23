import React from "react";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import LinkMenu from "../components/linkMenu";
import useMediaQuery from "../hooks/useMediaQuery";

const SliderMenu = ({ allShopBy }) => {
  const isDesktop = useMediaQuery(1024);
  return (
    <>
      <div className="mt-20 mb-10" style={{ textAlign: "center" }}>
        SHOP BY
      </div>
      {isDesktop ? (
        <div className="sliderMenu">
          {allShopBy?.map((item, key) => (
            <LinkMenu
              key={key}
              to={item.handle}
              image={item.backgroundImage.url}
            >
              <div className="uppercase">{item.item}</div>
            </LinkMenu>
          ))}
        </div>
      ) : (
        <div className="sliderMenuMobile">
          <Swiper
            slidesPerView={2.4}
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
          >
            <div style={{ cursor: "pointer" }}>
              {allShopBy?.map((item, key) => (
                <SwiperSlide>
                  <LinkMenu
                    key={key}
                    to={item.handle}
                    image={item.backgroundImage.url}
                  >
                    <div className="uppercase">{item.item}</div>
                  </LinkMenu>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      )}
      <style jsx="true">{`
        .sliderMenu {
          display: flex;
          justify-content: center;
          gap: 70px;
          padding-bottom: 40px;
          margin-left: auto;
          margin-right: auto;
          overflow-x: scroll;
          -ms-overflow-style: none; /* for Internet Explorer, Edge */
          scrollbar-width: none; /* for Firefox */
        }

        .sliderMenu::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }

        .sliderMenuMobile {
          padding-bottom: 40px;
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
  );
};

export default SliderMenu;
