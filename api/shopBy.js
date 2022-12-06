import request from "./request";

async function getShopBy() {
  const query = `
{
  allShopBies {
    handle
    id
    item
    backgroundImage {
      url
      blurUpThumb
    }
  }
}
`;

  return await request("datoCMS", query);
}

export default getShopBy;
