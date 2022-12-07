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

async function getCollection(collection, first, cursor) {
  const QUERY = `
{
  collection(handle: "${collection}") {
    id
    handle
    title
    description
    descriptionHtml
    image {
        transformedSrc(preferredContentType: WEBP)
    }
    seo {
      description
      title
    }
    metafield(namespace: "logo", key: "custom.logo") {
      value
    }
    products(first: ${first}, ${cursor ? `after: "${cursor}"` : ""}) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          handle
          title
          description
          descriptionHtml
          vendor
          availableForSale
          tags
          totalInventory
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
                      transformedSrc(preferredContentType: WEBP)
                      originalSrc
                      id
                    }
                  }
                  seo {
                    description
                    title
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
}
`;

  return await request("shopify", QUERY, "collections");
}

export { getAllCollections, getCollection };
