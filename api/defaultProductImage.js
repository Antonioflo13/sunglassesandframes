import request from "./request";

async function getDefaultProductImage() {
  const query = `{
    defaultProductImage {
        image {
          url
        }
    }
}`;

  return await request("datoCMS", query);
}

export default getDefaultProductImage;
