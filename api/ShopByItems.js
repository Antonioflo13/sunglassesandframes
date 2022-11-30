import request from "./request";

async function getShopByItems() {
  const query = `{
  shopByItem {
    items {
      title
      item {
        item
      }
    }
  }
}
`;

  return await request("datoCMS", query);
}

export default getShopByItems;
