import request from "./request";

async function getProductsByHandle(handle) {
  const QUERY = `
{
  products(query: "${handle}", first: 10) {
    edges {
      node {
        id
        handle
        vendor
        title
        totalInventory
        images(first: 10) {
          nodes {
            transformedSrc(preferredContentType: WEBP)
          }
        }
        options(first: 10) {
          name
          values
        }
      }
    }
  }
}
`;

  return await request("shopify", QUERY, "products");
}

export { getProductsByHandle };
