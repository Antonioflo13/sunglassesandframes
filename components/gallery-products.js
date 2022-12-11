import React, { useState } from "react";
import Image from "next/image";

const GalleryProducts = ({ images }) => {
  const imageList = [...images];
  const [firstImage, setFirstImage] = useState(imageList[1].transformedSrc);
  const changeView = item => {
    setFirstImage(item.transformedSrc);
  };

  return (
    <>
      {imageList.length > 0 && (
        <div>
          <div className="containerMainImage bg-white">
            <Image
              fill="true"
              sizes="100%"
              priority={true}
              style={{ objectFit: "contain", transform: "scale(1.5)" }}
              src={firstImage}
              alt="main-image"
            />
          </div>
          <div className="containerImageTubler">
            {imageList.splice(0, imageList.length - 1).map((item, index) => (
              <div
                className="carousel-image-container cursor-pointer w-7/12 flex justify-center bg-white"
                onClick={() => changeView(item)}
                key={index}
              >
                <Image
                  fill="true"
                  sizes="100%"
                  priority={true}
                  key={item.id}
                  style={{ objectFit: "contain" }}
                  className="imageTumblr"
                  src={item.transformedSrc}
                  alt="image-carousel"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx="true">{`
        .carousel-image-container {
          position: relative;
          height: 220px;
          width: 100%;
        }
        .containerMainImage {
          position: relative;
          width: 100%;
          height: 400px;
        }
        .containerImageTubler {
          display: flex;
          justify-content: space-between;
        }
        .imageTumblr {
          width: 50%;
        }
      `}</style>
    </>
  );
};

export default GalleryProducts;
