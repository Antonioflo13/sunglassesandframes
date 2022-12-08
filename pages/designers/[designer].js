//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import Link from "next/link";
import Head from "next/head";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//API
import { getCollection } from "../../api/collections";
//INTL
import { FormattedNumber } from "react-intl";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import Layout from "../../components/layout";
import Image from "next/image";

const CollectionTemplate = ({ collection }) => {
  collection = collection.data.collection;

  //HOOKS
  const isDesktop = useMediaQuery(768);

  const isBrand =
    collection.handle !== "optical" && collection.handle !== "sunglasses";
  const title = `Sunglassesandframes - ${
    isBrand ? collection.title : collection.handle
  }`;

  //STATE
  const [products, setProducts] = useState(collection.products.edges);

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(
    collection.products.pageInfo.hasNextPage
  );

  // Cursor
  const [cursor, setCursor] = useState(collection.products.pageInfo.endCursor);

  //Set a ref for the loading div
  const loadRef = useRef();

  //FUNCTIONS
  const getProductByCollection = async () =>
    await getCollection(collection.handle, 20, cursor);

  // Handle intersection with load more div
  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore(true);
    }
  };

  //EFFECT
  //Initialize the intersection observer API
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }
  }, []);

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      getProductByCollection().then(response => {
        const newProducts = response.data.collection.products.edges;
        const isMore = response.data.collection.products.pageInfo.hasNextPage;
        const cursor = response.data.collection.products.pageInfo.endCursor;
        setCursor(cursor);
        setHasMore(isMore);
        setProducts(oldProducts => [...oldProducts, ...newProducts]);
        setLoadMore(false);
      });
    }
  }, [loadMore, hasMore]); //eslint-disable-line

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={isBrand ? collection.description : null}
        />
      </Head>
      <AnimatedPage margins={true} grey={true}>
        <div className="my-8">
          {isDesktop && (
            <PageTitle
              breadcrumbs={[
                ...(isBrand
                  ? [
                      {
                        title: "breadcrumbs.designers",
                        link: "/designers",
                      },
                      {
                        title: collection.title,
                      },
                    ]
                  : [
                      {
                        title: `collection.${collection.handle}_breadcrumbs`,
                      },
                    ]),
              ]}
              title=" "
              subtitle=" "
            />
          )}
        </div>
        {/* Info */}
        <div className="container-plp">
          <div className="img-header-container">
            {collection.image && (
              <Image
                fill="true"
                style={{ objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={collection.image.transformedSrc}
                sizes="100%"
                priority={true}
                src={collection.image.transformedSrc}
                alt="header-collection"
              />
            )}
          </div>
          <div className="container-textfilter">
            <p>{collection.description ? collection.description : null}</p>
          </div>
        </div>
        {/* Products */}
        <div className="mt-8 w-full">
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-12">
            {products.map((product, index) => (
              <Product key={index} product={product} collection={collection} />
            ))}
          </div>
        </div>
        <div ref={loadRef}></div>
      </AnimatedPage>
      <style jsx="true">
        {`
          .img-header-container {
            width: 50%;
            position: relative;
            height: 250px;
            border-radius: 10px;
            overflow: hidden;
          }

          .container-plp {
            display: flex;
            gap: 3rem;
          }
          .container-textfilter {
            width: 50%;
          }
          @media (max-width: 768px) {
            .img-headerCollection {
              height: 200px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default CollectionTemplate;

export async function getServerSideProps({ params }) {
  const collectionHandle = params.designer;
  const collection = await getCollection(collectionHandle, 20);
  return {
    props: { collection },
  };
}

const Product = ({ product, collection }) => {
  return (
    <Link
      href={{
        pathname: `/designers/${collection.handle}/${product.node.handle}`,
        query: { cursor: product.cursor },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
          <div className="absolute top-0 w-full h-full">
            {product.node.variants.edges[0].node.product.images.nodes.length >
              0 && (
              <img
                className="w-full h-full"
                src={
                  product.node.variants.edges[0].node.product.images.nodes[1]
                    .transformedSrc
                }
                alt="product-image"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </div>
        <div className="text-sunglassesandframes-black text-xs font-bold italic mackay noToHead mt-2">
          {product.node.vendor}
        </div>
        <div className="ml-1 text-xs uppercase font-bold mt-2">
          {product.node.title}
        </div>
        {product.node.availableForSale &&
          !product.node.tags.includes("nfs") &&
          product.node.variants.edges[0].node.product.quantityAvailable > 0 && (
            <p className="text-2xs">
              <FormattedNumber
                style="currency"
                value={
                  product.node.variants.edges[0].node.product.priceV2.amount
                }
                currency={
                  product.node.variants.edges[0].node.product.priceV2
                    .currencyCode
                }
                minimumFractionDigits={0}
              />
            </p>
          )}
      </div>
    </Link>
  );
};
