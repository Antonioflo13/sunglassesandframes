//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import Head from "next/head";
import Image from "next/image";
//API
import getAllArticles from "../../api/articles";
import getArticle from "../../api/article";
import { getCollection } from "../../api/collections";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import Layout from "../../components/layout";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import { getProduct } from "../../api/product";
import Product from "../../components/product";

const Article = ({ article, collection }) => {
  article = article?.data?.article;
  collection = collection ? collection?.data?.collection : null;
  const collectionHandle = collection ? collection.handle : null;

  //SEO
  const title = `Sunglassesandframes - ${article?.handle}`;

  //HOOKS
  const isDesktop = useMediaQuery(768);

  //STATE
  const [products, setProducts] = useState([]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(false);

  // Cursor
  const [cursor, setCursor] = useState("");

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
  useEffect(() => {
    if (collection) {
      setProducts(collection.products.edges);
      setHasMore(collection.products.pageInfo.hasNextPage);
      setCursor(collection.products.pageInfo.endCursor);
    }
  }, [collection]);
  //Initialize the intersection observer API
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "500px",
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
                        blurDataURL={article.imageArticleDetail.blurUpThumb}
                        src={article.imageArticleDetail.url}
                        alt={article.imageArticleDetail.alt}
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
                        blurDataURL={article.imageArticleDetail.blurUpThumb}
                        src={article.imageArticleDetail.url}
                        alt={article.imageArticleDetail.alt}
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
                    <p style={{ textAlign: "justify" }}>
                      {article.description.length > 0
                        ? article.description
                        : null}
                    </p>
                  </div>
                </div>
              </div>
              {/* Products */}
              {products && (
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-20">
                  {products.map(product => (
                    <Product
                      key={product.node.id}
                      product={product}
                      collectionHandle={collectionHandle}
                    />
                  ))}
                </div>
              )}
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
                height: 300px;
                border-radius: 10px;
                overflow: hidden;
              }
              .header-description-container {
                margin-top: 20px;
              }
              .title-container {
                margin-bottom: 10px;
                text-align: center;
              }
              .container-accordions {
                margin-top: 3rem;
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
                  gap: 2rem;
                }
                .header-image-container {
                  width: 50%;
                }
                .header-description-container {
                  width: 50%;
                  margin-top: 10px;
                }
                .title-container {
                  margin-bottom: 10px;
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
  const shopifyArticleProducts = article?.data?.article.shopifyProduct;
  const shopifyCollection = article?.data?.article?.shopifyCollection;
  let collection = null;
  let products = [];
  if (shopifyCollection) {
    collection = await getCollection(shopifyCollection, 20);
  }
  if (shopifyArticleProducts.length) {
    const shopifyProducts = shopifyArticleProducts.map(
      product => product.product
    );
    for (const shopifyProduct of shopifyProducts) {
      const product = await getProduct(shopifyProduct);
      const images = product.data.product
        ? product.data.product.variants.edges[0].node.product.images.nodes
        : null;
      if (images && images.length) {
        products.push({ node: product.data.product });
      }
    }
  }
  if (collection && collection.data.collection && products) {
    collection.data.collection.products.edges = [
      ...products,
      ...collection.data.collection.products.edges,
    ];
  }

  if (!collection && products.length > 0) {
    collection = products;
  }

  return {
    props: { article, collection },
  };
}

export default Article;
