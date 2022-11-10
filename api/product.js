import request from "./request";

async function getProduct(product) {
  const sunglassesandframes = `
{
  product(handle: "${product}"){
    id
    handle
    title
    description
    descriptionHtml
    vendor
    availableForSale
    tags
    variants(first: 250) {
      edges {
        node {
          id
          quantityAvailable
          priceV2 {
            amount
            currencyCode
          }
          product {
            images(first: 250) {
              nodes {
                id
                originalSrc
              }
            }
            variants(first: 250) {
              nodes {
                id
              }
            }
          }
        }
      }
    }
  }
}
`;

  let QUERY = null;
  switch (process.env.NEXT_QUERY) {
    case "sunglassesandframes":
      QUERY = sunglassesandframes;
      break;
  }

  return await request("shopify", QUERY);
}

async function getProductsByCollections(collection, first, cursor) {
  const QUERY = `
{
  collection(handle: "${collection}") {
    products(first: ${first}, after: ${cursor}) {
        pageInfo {
          hasNextPage
        }
        nodes {
          id
        handle
        title
        description
        descriptionHtml
        vendor
        availableForSale
        tags
        variants(first: 250) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              product {
                images(first: 250) {
                  nodes {
                    id
                    originalSrc
                  }
                }
                variants(first: 250) {
                  nodes {
                    id
                  }
                }
              }
            }
          }
        }
    }
    }
  }
}
`;

  return await request("shopify", QUERY);
}

export { getProduct, getProductsByCollections };
