//REACT
import React, { useEffect, useState } from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";
import LoadingImage from "./loading-image";
import useMediaQuery from "../hooks/useMediaQuery";
import createHandle from "../hooks/createHandle";

const Product = ({ product, collectionHandle, fromAlgoliaSearch = false }) => {
  //STATE
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [mapProduct, setMapProduct] = useState({});
  //HOOKS
  const isDesktop = useMediaQuery(768);
  //FUNCTIONS
  const mapsProduct = () => {
    switch (fromAlgoliaSearch) {
      case true:
        setMapProduct({
          path: `/designers/${createHandle(product.vendor)}/${product.handle}`,
          handle: product.handle,
          vendor: product.vendor,
          title: product.title,
          amount: product.price,
          // options: product.options || null,
          cursor: null,
          image: product.image,
        });
        break;
      case false:
        setMapProduct({
          path: `/designers/${collectionHandle}/${product.node.handle}`,
          handle: product.node.handle,
          vendor: product.node.vendor,
          title: product.node.title,
          amount: product.node.variants.edges[0].node.priceV2.amount,
          options: product.node?.options || null,
          cursor: product.cursor || null,
          image:
            product.node.variants.edges[0].node.product.images.nodes[1]
              .transformedSrc,
        });
    }
  };
  //EFFECT
  useEffect(() => {
    mapsProduct();
  }, [product]);

  return (
    <>
      {mapProduct.image && (
        <Link
          href={{
            pathname: mapProduct.path,
            query: !isDesktop
              ? {
                  color: mapProduct.options?.find(
                    option => option.name === "Color"
                  )?.values,
                  cursor: mapProduct.cursor,
                }
              : {
                  color: mapProduct.options?.find(
                    option => option.name === "Color"
                  )?.values,
                },
          }}
        >
          <div className="w-full flex flex-col text-center items-center">
            <div className="image-container">
              <>
                {isLoadingImage && <LoadingImage />}
                <Image
                  className="custon"
                  fill="true"
                  style={{ objectFit: "cover" }}
                  sizes="100%"
                  priority={true}
                  src={mapProduct.image}
                  onLoadingComplete={() => setIsLoadingImage(false)}
                  alt="product-image"
                />
              </>
            </div>
            <div className="text-sunglassesandframes-black text-xs font-bold italic raleway noToHead mt-2">
              {mapProduct.vendor}
            </div>
            <div className="ml-1 text-xs uppercase font-bold mt-2">
              {mapProduct.title}
            </div>
            <p className="text-2xs">{Number(mapProduct.amount)} €</p>
          </div>
        </Link>
      )}
      <style jsx="true">
        {`
          .image-container {
            width: 90%;
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
