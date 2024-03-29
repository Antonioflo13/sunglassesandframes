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
import FilterDesktop from "../../components/filterDesktop";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//Filter Icon
import FilterIcon from "../../assets/images/filter-icon.png";

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
  const [filterObj, setFilterObj] = useState({});
  const [filters, setFilters] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [removeValueFromFilter, setRemoveValueToFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState({
    hasMore: collection.products.pageInfo.hasNextPage,
  });

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

  const onFilterHandler = filtersArray => {
    let arr = [];
    for (let filter of filtersArray) {
      if (filter.active.length) {
        arr.push({ filterLabel: filter.label, filterValue: filter.active });
      }
    }
    setFilters(arr);
  };

  const filterProducts = () => {
    let productsArray = [...products];

    let arr = [];
    let allFilteredProducts = [];
    for (let filter of filters) {
      switch (filter.filterLabel) {
        case "Color":
        case "Materiale":
        case "Taglia":
        case "Shape":
          for (let value of filter.filterValue) {
            let filtered = productsArray.filter(product => {
              const options = product.node.options.find(
                el => el.name === filter.filterLabel
              );
              if (options) {
                return options.values.includes(value);
              } else {
                return false;
              }
            });
            if (filtered.length > 0) {
              arr.push(filtered);
            }
          }
          continue;
        case "Design":
          for (let value of filter.filterValue) {
            let filtered = productsArray.filter(
              product => product.node.vendor === value
            );
            if (filtered.length > 0) {
              arr.push(filtered);
            }
          }
          continue;
        case "Category":
        case "Gender":
          for (let value of filter.filterValue) {
            let filtered = productsArray.filter(product => {
              const tags = product.node.tags;
              if (tags) {
                return tags.includes(value);
              } else {
                return false;
              }
            });
            if (filtered.length > 0) {
              arr.push(filtered);
            }
          }
          continue;
        default:
          return [];
      }
    }

    for (let filteredProducts of arr) {
      for (let product of filteredProducts) {
        allFilteredProducts.push(product);
      }
    }
    if (filters.length > 1 && arr.length > 1) {
      let duplicates = allFilteredProducts.filter(
        (a, i, aa) =>
          aa.indexOf(a) === i &&
          aa.lastIndexOf(a) !== i &&
          aa.filter(p => p.node.id === a.node.id).length === filters.length
      );
      setProductsFiltered(duplicates);
    } else {
      let prods = [...new Set(allFilteredProducts)];
      setProductsFiltered(prods);
    }
    // }
  };
  // EFFECT
  useEffect(() => {
    filterProducts();
  }, [filters]);

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
    if (hasMore.hasMore) {
      getProductByCollection().then(response => {
        const newProducts = response.data.collection.products.edges;
        const isMore = response.data.collection.products.pageInfo.hasNextPage;
        const cursor = response.data.collection.products.pageInfo.endCursor;
        setCursor(cursor);
        setHasMore({ hasMore: isMore });
        setProducts(oldProducts => [...oldProducts, ...newProducts]);
        setLoadMore(false);
      });
    }
  }, [hasMore]);

  const mapArray = ({
    arrProducts,
    OptionsOrTags,
    type,
    key,
    logic,
    tagArray,
  }) => {
    let filtered = [];
    if (OptionsOrTags) {
      if (type === "options") {
        arrProducts.map(product => {
          const option = product.node[type].find(el => el.name === key);
          if (option) {
            for (let element of option.values) {
              filtered.push(element);
            }
          }
        });
      } else {
        arrProducts.map(product => {
          const tags = product.node.tags;
          if (tags) {
            for (let element of tags) {
              if (tagArray.includes(element)) {
                filtered.push(element);
              }
            }
          }
        });
      }
    } else {
      filtered = arrProducts.map(logic);
    }
    let setFiltered = [...new Set(filtered)];
    return setFiltered;
  };

  // Filter Products
  useEffect(() => {
    let color = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "options",
      key: "Color",
    });
    let design = mapArray({
      arrProducts: products,
      OptionsOrTags: false,
      logic: product => product.node.vendor,
    });
    let size = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "options",
      key: "Taglia",
    });
    let shape = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "options",
      key: "Stile",
    });
    let gender = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "tags",
      tagArray: ["Man", "Woman", "Unisex"],
    });
    let category = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "tags",
      tagArray: ["SUNGLASSES", "FRAMES"],
    });
    let material = mapArray({
      arrProducts: products,
      OptionsOrTags: true,
      type: "options",
      key: "Materiale",
    });

    setFilterObj({
      ...filterObj,
      design,
      Color: color,
      Taglia: size,
      shape,
      category,
      gender,
      material,
    });
  }, [products]);

  const removeValueFromFilterHandler = (label, value) => {
    setRemoveValueToFilter({ label, value });
  };

  const availabileProducts = filters.length > 0 ? productsFiltered : products;

  const openFiltersModal = () => {
    setShowFilters(true);
    document.body.classList.remove("overflow-auto");
    document.body.classList.add("overflow-hidden");
  };

  const closeFiltersModal = () => {
    setShowFilters(false);
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-auto");
  };

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
          <div className="container-text">
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
        {isDesktop ? (
          <div className="containerAll mt-20">
            <FilterDesktop
              filterObj={filterObj}
              filterHandler={onFilterHandler}
              removeValue={removeValueFromFilter}
            />
            <div className="w-full">
              <div className="flex w-full flex-wrap">
                {filters.length > 0 &&
                  filters.map(filter => (
                    <>
                      {filter.filterValue.map(value => (
                        <div
                          className="m-3 px-3 py-1 border border-black rounded-xl flex"
                          onClick={() =>
                            removeValueFromFilterHandler(
                              filter.filterLabel,
                              value
                            )
                          }
                        >
                          <FontAwesomeIcon
                            style={{
                              marginRight: "5px",
                              width: 24,
                              height: 24,
                            }}
                            icon={faXmark}
                          />
                          <span>{value}</span>
                        </div>
                      ))}
                    </>
                  ))}
              </div>
              {availabileProducts && (
                <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-20 containerProduct">
                  {availabileProducts.map(product => (
                    <Product
                      key={product.node.id}
                      product={product}
                      collectionHandle={collectionHandle}
                      fromAlgoliaSearch={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div
              className={`fixed w-screen h-screen top-0 left-0 transition-all duration-300 px-5 bg-white visible opacity-100 overflow-scroll p-5 searchModal ${
                showFilters ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <FilterDesktop
                filterObj={filterObj}
                filterHandler={onFilterHandler}
                removeValue={removeValueFromFilter}
                hideModal={closeFiltersModal}
              />
            </div>
            <div className="mt-20">
              <button
                className="text-center border border-black rounded-xl block w-full uppercase p-2 sticky top-[60px] z-30"
                onClick={openFiltersModal}
              >
                <Image
                  src={FilterIcon}
                  alt="filter-icon"
                  width={16}
                  height={16}
                  className="inline mr-5"
                />
                Filter By
              </button>
              {availabileProducts && (
                <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-16 gap-y-10 md:gap-y-20 containerProduct">
                  {availabileProducts.map(product => (
                    <Product
                      key={product.node.id}
                      product={product}
                      collectionHandle={collectionHandle}
                      fromAlgoliaSearch={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
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

          .containerAll {
            display: flex;
            flex-direction: row;
            column-gap: 5rem;
          }

          .containerProduct {
            width: 100%;
          }

          .container-plp {
            display: flex;
            gap: 2rem;
          }

          .collection-logo-container {
            position: relative;
            width: 100px;
            height: 30px;
          }

          .container-text {
            width: 50%;
          }

          .fullScreenBackgroundSearch {
            background-color: rgb(FF FF FF);
            z-index: 99;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            position: absolute;
          }
          .searchModal {
            z-index: 9999999;
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
