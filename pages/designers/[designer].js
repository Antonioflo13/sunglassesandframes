//REACT
import React, { useEffect, useRef, useState } from "react";
//NEXT
import Head from "next/head";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//API
import { getCollection } from "../../api/collections";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import Layout from "../../components/layout";
import Image from "next/image";
import Product from "../../components/product";
import LoadingImage from "../../components/loading-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const CollectionTemplate = ({ collection }) => {
  collection = collection.data.collection;
  const collectionHandle = collection.handle;

  //HOOKS
  const isDesktop = useMediaQuery(768);

  const isBrand =
    collection.handle !== "optical" && collection.handle !== "sunglasses";
  const title = `Sunglassesandframes - ${
    isBrand ? collection.title : collection.handle
  }`;

  //STATE
  const [products, setProducts] = useState([]);

  const [isLoadingImage, setIsLoadingImage] = useState(true);

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
  useEffect(() => {
    setProducts(collection.products.edges);
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
              <>
                {isLoadingImage && <LoadingImage />}
                <Image
                  fill="true"
                  style={{ objectFit: "cover" }}
                  src={collection.image.transformedSrc}
                  sizes="100%"
                  onLoadingComplete={() => setIsLoadingImage(false)}
                  priority={true}
                  alt="header-collection"
                />
              </>
            )}
          </div>
          <div className="container-text-filter">
            {collection.metafield && (
              <div className="collection-logo-container">
                <Image
                  fill
                  priority={true}
                  style={{ objectFit: "contain" }}
                  sizes="100%"
                  src={collection.metafield.value}
                  alt="logo-collection"
                />
              </div>
            )}
            <p style={{ textAlign: "justify" }}>
              {collection.description ? collection.description : null}
            </p>
          </div>
        </div>
        <div className="containerAll">
          <div className="containerFilter mt-20">
            <div className="title-filter mb-5">FILTERS</div>
            <div className="containerFilterArrow mt-8">
              <div>Design</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Colors</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Size</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Shape</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Category</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Gender</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="containerFilterArrow mt-8">
              <div>Material</div>
              <FontAwesomeIcon
                icon={faAngleRight}
                width={10}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {/* Products */}
          {products && (
            <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-20 containerProduct">
              {products.map(product => (
                <Product
                  key={product.node.id}
                  product={product}
                  collectionHandle={collectionHandle}
                />
              ))}
            </div>
          )}
        </div>
        <div ref={loadRef}></div>
      </AnimatedPage>
      <style jsx="true">
        {`
          .img-header-container {
            width: 50%;
            position: relative;
            height: 300px;
            border-radius: 10px;
            overflow: hidden;
          }

          .containerFilterArrow {
            display: flex;
            justify-content: space-between;
            border-bottom: solid 1px #bebebe;
            padding-bottom: 10px;
          }

          .containerAll {
            display: flex;
            flex-direction: row;
            column-gap: 5rem;
          }

          .containerProduct {
            width: 100%;
          }

          .containerFilter {
            width: 30%;
          }

          .container-plp {
            display: flex;
            gap: 2rem;
          }
          .container-text-filter {
            width: 50%;
          }

          .collection-logo-container {
            position: relative;
            width: 100px;
            height: 30px;
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
