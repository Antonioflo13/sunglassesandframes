import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LinkMenu from "../components/linkMenu";
import useMediaQuery from "../hooks/useMediaQuery";

const SliderMenu = ({ allShopBy }) => {
  const isDesktop = useMediaQuery(1024);

  return (
    <>
      <div className="titleSliderMenu" style={{ textAlign: "center" }}>
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
                <SwiperSlide key={key}>
                  <LinkMenu to={item.handle} image={item.backgroundImage.url}>
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
          gap: 60px;
          padding-bottom: 7rem;
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

        .titleSliderMenu {
          margin-top: 3rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 767px) {
          .titleSliderMenu {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default SliderMenu;
