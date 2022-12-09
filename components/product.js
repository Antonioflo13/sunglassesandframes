import Link from "next/link";
import React from "react";

const Product = ({ product, collectionHandle }) => {
  return (
    <Link
      href={{
        pathname: `/designers/${collectionHandle}/${product.node.handle}`,
        query: { cursor: product.cursor },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ paddingTop: "57.6%" }}>
          <div
            className="absolute top-0 w-full h-full"
            style={{ height: "150px" }}
          >
            <img
              className="w-full h-full"
              src={
                product.node.variants.edges[0].node.product.images.nodes[1]
                  .transformedSrc
              }
              alt="product-image"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead mt-2">
          {product.node.vendor}
        </div>
        <div className="ml-1 text-xs uppercase font-bold mt-2">
          {product.node.title}
        </div>
        {/* {product.node.variants.edges[0].node.product.quantityAvailable > 0 && ( */}
        <p className="text-2xs">
          {Number(product.node.variants.edges[0].node.priceV2.amount)} €
        </p>
        {/* )} */}
      </div>
    </Link>
  );
};

export default Product;
