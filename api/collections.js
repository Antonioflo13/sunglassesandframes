import request from "./request";

async function getAllCollections() {
  const sunglassesandframes = `
{
    collections(
      sortKey: TITLE, first: 250
    ) {
      nodes {
        id
        handle
        title
        description
        products(first: 250) {
          nodes {
            handle
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

async function getCollection(collection) {
  const sunglassesandframes = `
{
  collection(handle: "${collection}") {
    id
    handle
    title
    description
    descriptionHtml
    image {
        src
    }
    products(first: 20) {
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

  let QUERY = null;
  switch (process.env.NEXT_QUERY) {
    case "sunglassesandframes":
      QUERY = sunglassesandframes;
      break;
  }

  return await request("shopify", QUERY);
}

export { getAllCollections, getCollection };
