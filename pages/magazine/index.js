//REACT
import React, { useState, useEffect, useRef } from "react";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import Link from "next/link";
import Layout from "../../components/layout";
import getAllArticles from "../../api/articles";
import Head from "next/head";
import Image from "next/image";
import PageTitle from "../../components/page-title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const Index = ({ articles }) => {
  const isDesktop = useMediaQuery(768);

  // Array of all news articles
  const allArticles = articles.data.allArticles;

  // State for the list
  const [list, setList] = useState([...allArticles.slice(0, 9)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allArticles.length > 9);

  //Set a ref for the loading div
  const loadRef = useRef();

  // Handle intersection with load more div
  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore(true);
    }
  };

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
      const currentLength = list.length;
      const isMore = currentLength < allArticles.length;
      const nextResults = isMore
        ? allArticles.slice(currentLength, currentLength + 6)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]); //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allArticles.length;
    setHasMore(isMore);
  }, [list]); //eslint-disable-line

  return (
    <>
      <Layout>
        <Head>
          <title>sunglassesandframes - Magazine</title>
          <meta name="description" content="Magazine" />
        </Head>
        <AnimatedPage margins={true}>
          {isDesktop && (
            <div className="w-full md:w-1/2 my-8">
              <PageTitle
                breadcrumbs={[
                  ...[
                    { title: "breadcrumbs.magazine" },
                    {
                      title: "Archive",
                    },
                  ],
                ]}
                title=" "
                subtitle=" "
              />
            </div>
          )}
          <div className="container-articles">
            {list.map(item => (
              <Link
                exit={{ length: 0.15 }}
                entry={{ delay: 0.15, length: 0.3 }}
                href={{
                  pathname: "/magazine/[article]",
                  query: { article: item.handle },
                }}
                key={item.id}
              >
                <div className="article">
                  <div className="image-container">
                    <Image
                      fill="true"
                      sizes="100%"
                      priority={true}
                      placeholder="blur"
                      blurDataURL={item.imageheader.blurUpThumb}
                      style={{
                        objectFit: "cover",
                      }}
                      src={item.imageheader.url}
                      alt="image-header"
                    />
                  </div>
                  <div className="description-container">
                    <div>
                      <div className="article-title text-xs">
                        {item.titlemagazine}
                      </div>
                      <div className="text-xs">{item.subtitle}</div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faAngleRight} width={10} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div ref={loadRef}></div>
          </div>
        </AnimatedPage>
      </Layout>
      <style jsx="true">
        {`
          .container-articles {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 4em;
            row-gap: 4em;
          }

          .article {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: start;
            cursor: pointer;
            background-color: white;
            border-radius: 25px;
          }

          .description-container {
            width: 92%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            margin-left: 20px;
          }

          .article-title {
            text-transform: uppercase;
            text-align: center;
            font-size: 14px;
          }

          .image-container {
            position: relative;
            width: 100%;
            height: 230px;
            border-radius: 15px;
            overflow: hidden;
          }

          .article-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .container-articles {
              grid-template-columns: unset;
              margin-top: 50px;
            }
          }
        `}
      </style>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getAllArticles();
  return {
    props: { articles },
  };
}
export default Index;
