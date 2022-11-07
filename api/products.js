import request from "./request";

async function getAllProducts() {
  const sunglassesandframes = `
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

  let QUERY = null;
  switch (process.env.NEXT_QUERY) {
    case "sunglassesandframes":
      QUERY = sunglassesandframes;
      break;
  }

  return await request("shopify", QUERY);
}

export { getAllProducts };
