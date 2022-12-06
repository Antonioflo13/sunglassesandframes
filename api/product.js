import request from "./request";

async function getProduct(product) {
  const QUERY = `
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
                transformedSrc(preferredContentType: WEBP)
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

  return await request("shopify", QUERY);
}

async function getProductsByCollections(collection, first, cursor) {
  const QUERY = `
{
  collection(handle: "${collection}") {
    products(first: ${first}, after: "${cursor}") {
        edges {
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
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
