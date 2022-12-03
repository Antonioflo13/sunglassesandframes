import request from "./request";

async function getAllProducts() {
  const QUERY = `
{
    products(first: 250) {
        edges {
          node {
            handle
          }
        }
    }
 }
`;

  return await request("shopify", QUERY);
}

export { getAllProducts };
