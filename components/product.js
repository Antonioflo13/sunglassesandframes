//REACT
import React from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";

const Product = ({ product, collectionHandle }) => {
  return (
    <>
      <Link
        href={{
          pathname: `/designers/${collectionHandle}/${product.node.handle}`,
          query: { cursor: product.cursor },
        }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="image-container">
            <Image
              fill="true"
              style={{ objectFit: "cover" }}
              sizes="100%"
              priority={true}
              placeholder="blur"
              blurDataURL={
                product.node.variants.edges[0].node.product.images.nodes[1]
                  .transformedSrc
              }
              src={
                product.node.variants.edges[0].node.product.images.nodes[1]
                  .transformedSrc
              }
              alt="product-image"
            />
          </div>
          <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead mt-2">
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
          }
        `}
      </style>
    </>
  );
};

export default Product;
