//REACT
import React from "react";
//NEXT
import Head from "next/head";
import Image from "next/image";
//API
import getAllArticles from "../../api/articles";
import getArticle from "../../api/article";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import Layout from "../../components/layout";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import { getCollection } from "../../api/collections";
import SliderArticleCollection from "../../templates/slider-article-collection";
// import SliderArticleProducts from "../templates/slider-article-products";

const Article = ({ article, collectionProducts }) => {
  const isDesktop = useMediaQuery(768);
  const productsInArticle = [];
  article = article?.data?.article;
  const collectionHandle = collectionProducts.data.collection
    ? collectionProducts?.data?.collection.handle
    : null;
  collectionProducts = collectionProducts.data.collection
    ? collectionProducts?.data?.collection.products.edges
    : null;

  const title = `Indice - ${article?.handle}`;

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
              <div className="mt-10">
                {collectionProducts !== null && (
                  <SliderArticleCollection
                    products={collectionProducts}
                    collectionHandle={collectionHandle}
                  />
                )}
              </div>
            </div>
            {/*<SliderArticleProducts productsinArticle={productsinArticle} />*/}
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
  const collectionProducts = await getCollection(shopifyCollection, 20);
  return {
    props: { article, collectionProducts },
  };
}

export default Article;
