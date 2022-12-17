import request from "./request";

async function getAllCollections() {
  const QUERY = `
{
    collections(
      sortKey: TITLE, first: 250
    ) {
      nodes {
        id
        handle
        title
        description
        products(first: 1) {
          nodes {
            handle
          }
        }
      }
    }
 }
`;

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
        id
        transformedSrc(preferredContentType: WEBP)
    }
    seo {
      description
      title
    }
    metafield(namespace: "custom", key: "logo") {
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
          options {
            name
            values
          }
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
