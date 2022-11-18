//REACT
import React from "react";

//API
import { getProduct } from "../../api/product";
import { getCollection } from "../../api/collections";
//STORE
import { setDialogContactShow } from "../../store/modules/dialogContact";
import { setDialogContactProduct } from "../../store/modules/dialogContact";
import { setShowCart, setCartContent } from "../../store/modules/cart";
import { useDispatch, useSelector } from "react-redux";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
import shopifyBuildClient from "../../hooks/shopifyBuildClient";
//UTILS
import { getCookie } from "../../utils/cookie";
//COMPONENTS
import GalleryProducts from "../../components/gallery-products";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import DesktopProduct from "../../templates/desktop-product";
import MobileProduct from "../../templates/mobile-product";
import Layout from "../../components/layout";
import Head from "next/head";

const Product = ({
  resProduct,
  CollectionProducts,
  collectionHandle,
  productHandle,
  cursor,
  hasMore,
}) => {

  const product = {node:resProduct.data.product};

  //STORE
  const language = useSelector(state => state.language.value);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);


  const relatedProducts = CollectionProducts.data.collection.products.edges;

  const mainImage = (
    <GalleryProducts
      images={product.node.variants.edges[0].node.product.images.nodes}
    />
  );

  const title = `Sunglassesandframes - ${productHandle}`;

  //FUNCTIONS
  const buy = async productId => {
    let checkoutId = getCookie("checkoutId");

    if (!checkoutId) {
      await shopifyBuildClient("createCheckout", language);
    }
    const items = {
      variantId: productId || product.variants.edges[0].node.id,
      quantity: 1,
    };
    const updatedCheckout = await shopifyBuildClient(
      "updateCheckout",
      language,
      items
    );

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    dispatch(setCartContent(JSON.stringify(cartContent)));
    dispatch(setShowCart(true));
  };

  const askForPrice = () => {
    dispatch(setDialogContactShow(true));
    dispatch(
      setDialogContactProduct({ title: product.title, vendor: product.vendor })
    );
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={productHandle} />
      </Head>
      <AnimatedPage margins={true} noAnimate={true} fullHeight={true}>
        {isDesktop && (
          <div className="flex">
            <div className="w-full md:w-1/ mt-8">
              <PageTitle
                breadcrumbs={[
                  {
                    title: "breadcrumbs.designers",
                    link: "/designers",
                  },

                  {
                    title: product.node.vendor,
                    link: "/designers/" + collectionHandle,
                  },
                  {
                    title: product.node.title,
                    link: "/designers/" + productHandle,
                  },
                ]}
                title=" "
              />
            </div>
          </div>
        )}
        {isDesktop ? (
          <DesktopProduct
            shopifyProduct={product}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            relatedProducts={relatedProducts}
            collectionHandle={collectionHandle}
          />
        ) : (
          <MobileProduct
            productHandle={productHandle}
            product={product}
            hasMore={hasMore}
            cursor={cursor}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            relatedProducts={relatedProducts}
            collectionHandle={collectionHandle}
          />
        )}
      </AnimatedPage>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const collectionHandle = query.product[0];
  const productHandle = query.product[1];
  const cursor = query.cursor;
  const resProduct = await getProduct(productHandle);
  let CollectionProducts = await getCollection(collectionHandle, 20, cursor);
  const hasMore = CollectionProducts.data.collection.products.pageInfo.hasNextPage;
  const productNode = {node: resProduct.data.product};
  CollectionProducts.data.collection.products.edges.unshift(productNode);


  return {
    props: {
      resProduct,
      CollectionProducts,
      collectionHandle,
      productHandle,
      hasMore,
      cursor,
    },
  };
}

export default Product;