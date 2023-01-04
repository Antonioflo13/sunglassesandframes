//REACT
import React, { useState } from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";
import LoadingImage from "./loading-image";
import useMediaQuery from "../hooks/useMediaQuery";

const Product = ({ product, collectionHandle }) => {
  //STATE
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  //HOOKS
  const isDesktop = useMediaQuery(768);

  return (
    <>
      <Link
        href={{
          pathname: `/designers/${collectionHandle}/${product.node.handle}`,
          query: !isDesktop
            ? {
                color: product.node?.options?.find(
                  option => option.name === "Color"
                )?.values,
                cursor: product.cursor,
              }
            : {
                color: product.node?.options?.find(
                  option => option.name === "Color"
                )?.values,
              },
        }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="image-container">
            <>
              {isLoadingImage && <LoadingImage />}
              <Image
                fill="true"
                style={{ objectFit: "cover" }}
                sizes="100%"
                priority={true}
                src={
                  product.node.variants.edges[0].node.product.images.nodes[1]
                    .transformedSrc
                }
                onLoadingComplete={() => setIsLoadingImage(false)}
                alt="product-image"
              />
            </>
          </div>
          <div className="text-sunglassesandframes-black text-xs font-bold italic raleway noToHead mt-2">
            {product.node.vendor}
          </div>
          <div className="ml-1 text-xs uppercase font-bold mt-2">
            {product.node.title}
          </div>
          <p className="text-2xs">
            {Number(product.node.variants.edges[0].node.priceV2.amount)} €
          </p>
        </div>
      </Link>
      <style jsx="true">
        {`
          .image-container {
            width: 100%;
            position: relative;
            height: 150px;
            overflow: hidden;
            animation: fadeIn 0.2s linear;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Product;
