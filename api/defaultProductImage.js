import request from "./request";

async function getDefaultProductImage() {
  const query = `{
    defaultProductImage {
        image {
          url
          blurUpThumb
        }
    }
}`;

  return await request("datoCMS", query);
}

export default getDefaultProductImage;
