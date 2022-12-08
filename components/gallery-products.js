import React, { useState } from "react";
import Image from "next/image";

const GalleryProducts = ({ images }) => {
  const [imageList, setImageList] = useState([...images]);
  const changeView = item => {
    let imageListChange = [...images];
    const index = imageListChange.findIndex(
      image => image.transformedSrc === item.transformedSrc
    );
    imageListChange.unshift(imageListChange.splice(index, 1)[0]);
    setImageList(imageListChange);
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
              src={imageList[1].transformedSrc}
              placeholder="blur"
              blurDataURL={imageList[1].transformedSrc}
              alt="main-image"
            />
          </div>
          <div className="containerImageTubler">
            {imageList.slice(1, 4).map((item, index) => (
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
          height: 200px;
          width: 100%;
        }
        .containerMainImage {
          position: relative;
          width: 100%;
          height: 200px;
        }
        .containerImageTubler {
          display: flex;
          justify-content: space-between;
          gap: 2vw;
        }
        .imageTumblr {
          width: 50%;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default GalleryProducts;
