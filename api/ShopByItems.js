import request from "./request";

async function getShopByItems() {
  const query = `{
  shopByItem {
    items {
      id
      title
      item {
        id
        item
        handle
      }
    }
  }
}
`;

  return await request("datoCMS", query);
}

export default getShopByItems;
