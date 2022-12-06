//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
//API
import getAllArticles from "../../api/articles";
import getArticle from "../../api/article";
import { getCollection } from "../../api/collections";
//INTL
import { FormattedNumber } from "react-intl";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import Layout from "../../components/layout";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";

const Article = ({ article, collection }) => {
  const isDesktop = useMediaQuery(768);
  // const productsInArticle = [];
  article = article?.data?.article;
  const collectionHandle = collection.data.collection
    ? collection?.data?.collection.handle
    : null;
  collection = collection.data.collection ? collection?.data?.collection : null;

  const title = `Sunglassesandframes - ${article?.handle}`;

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

  useEffect(() => {
    if (products.length) {
      setProducts(
        products.filter(
          product =>
            product.node.variants.edges[0].node.product.images.nodes.length > 0
        )
      );
    }
  }, []);

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      getProductByCollection().then(response => {
        const newProducts = response.data.collection.products.edges.filter(
          newProduct =>
            newProduct.node.variants.edges[0].node.product.images.nodes.length >
            0
        );
        const isMore = response.data.collection.products.pageInfo.hasNextPage;
        const cursor = response.data.collection.products.pageInfo.endCursor;
        setCursor(cursor);
        setHasMore(isMore);
        setProducts(oldProducts => [...oldProducts, ...newProducts]);
        setLoadMore(false);
      });
    }
  }, [loadMore, hasMore]); //eslint-disable-line

  // Object.entries(article).forEach(item => {
  //   if (item[0].includes("product")) {
  //     if (item[1] !== "") {
  //       const titleItem = item[1].toUpperCase();
  //       const filterResultSlider = data.allShopifyProduct.edges.find(
  //         item => item.node.title === titleItem
  //       );
  //       productsInArticle.push(filterResultSlider);
  //     }
  //   }
  // });

  return (
    <>
      {article && (
        <Layout>
          <Head>
            <title>{title}</title>
            <meta name="description" content={article?.seo.description} />
            <meta name="title" content={article?.seo.title} />
          </Head>
          <AnimatedPage margins={true}>
            <div className="page-container">
              {isDesktop && (
                <div className="w-full md:w-1/2 my-8">
                  <PageTitle
                    breadcrumbs={[
                      ...[
                        { title: "breadcrumbs.magazine", link: "/magazine" },
                        {
                          title: article?.handle,
                        },
                      ],
                    ]}
                    title=" "
                    subtitle=" "
                  />
                </div>
              )}
              <div className="header-container">
                <div className="header-image-container">
                  {isDesktop ? (
                    <div className="img-header-container">
                      <Image
                        fill="true"
                        priority={true}
                        style={{ objectFit: "cover" }}
                        sizes="100%"
                        placeholder="blur"
                        blurDataURL={article.imageheader.blurUpThumb}
                        src={article.imageheader.url}
                        alt={article.imageheader.url}
                      />
                    </div>
                  ) : (
                    <div className="img-header-container">
                      <Image
                        fill="true"
                        priority={true}
                        style={{ objectFit: "cover" }}
                        sizes="100%"
                        placeholder="blur"
                        blurDataURL={article.imageheader.blurUpThumb}
                        src={article.imageheader.url}
                        alt={article.imageheader.url}
                      />
                    </div>
                  )}
                </div>
                <div className="header-description-container">
                  <div className="title-container">
                    <h1 className="uppercase font-bold">{article.title}</h1>
                    <p className="text-xs">{article.subtitle}</p>
                  </div>
                  <div>
                    <p>
                      {article.description.length > 0
                        ? article.description
                        : null}
                    </p>
                  </div>
                </div>
              </div>
              {/* Products */}
              <div className="mt-8 w-full">
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-12">
                  {products.map((product, index) => (
                    <Product
                      key={index}
                      product={product}
                      collection={collection}
                    />
                  ))}
                </div>
              </div>
              <div ref={loadRef}></div>
            </div>
          </AnimatedPage>
          <style jsx="true">
            {`
              .page-container {
                margin-top: 50px;
                margin-bottom: 20px;
              }
              .header-container {
                display: flex;
                flex-direction: column;
              }
              .header-image-container {
                position: relative;
                width: 100%;
                height: 200px;
                border-radius: 10px;
                overflow: hidden;
              }
              .header-description-container {
                margin-top: 20px;
              }
              .title-container {
                margin-bottom: 20px;
                text-align: center;
              }
              .container-accordions {
                margin-top: 40px;
              }
              .container-accordion {
                display: flex;
                gap: 10px;
                align-items: center;
              }
              .icon {
                cursor: pointer;
              }
              @media (min-width: 768px) {
                .page-container {
                  margin-top: 20px;
                }
                .header-container {
                  display: flex;
                  flex-direction: row;
                  gap: 10px;
                }
                .header-image-container {
                  width: 50%;
                }
                .header-description-container {
                  width: 50%;
                  margin-top: unset;
                }
                .title-container {
                  margin-bottom: 20px;
                  text-align: unset;
                }
              }
            `}
          </style>
        </Layout>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.data.allArticles.splice(0, 5).map(article => {
    return {
      params: {
        article: article.handle,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const handle = context.params.article;
  const article = await getArticle(handle);
  const shopifyCollection = article?.data?.article?.shopifyCollection;
  const collection = await getCollection(shopifyCollection, 20);
  return {
    props: { article, collection },
  };
}

export default Article;

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
                  product.node.variants.edges[0].node.product.images.nodes[0]
                    .originalSrc
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
