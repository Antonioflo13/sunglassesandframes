import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingImage from "./loading-image";

const GalleryProducts = ({ images }) => {
  const imageList = [...images];
  //STATE
  const [firstImage, setFirstImage] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  //EFFECT
  useEffect(() => {
    if (images) {
      setFirstImage(images[1].transformedSrc);
    }
  }, [images]);

  //FUNCTIONS
  const changeView = item => {
    setFirstImage(item.transformedSrc);
  };

  return (
    <>
      {imageList.length > 0 && firstImage && (
        <div>
          {isLoadingImage && <LoadingImage />}
          <div className="containerMainImage bg-white">
            <Image
              fill="true"
              sizes="100%"
              priority={true}
              onLoadingComplete={() => setIsLoadingImage(false)}
              style={{ objectFit: "cover" }}
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
                {isLoadingImage && <LoadingImage />}
                <Image
                  fill="true"
                  sizes="100%"
                  priority={true}
                  key={item.id}
                  style={{ objectFit: "contain" }}
                  onLoadingComplete={() => setIsLoadingImage(false)}
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
          width: 75%;
          height: 350px;
          margin: 0 auto;
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
