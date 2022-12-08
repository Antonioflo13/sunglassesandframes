import request from "./request";

async function getArticle(handle) {
  const QUERY = `
  {
  article(filter: {handle: {eq: "${handle}"}}) {
    id
    image {
      blurUpThumb
      url
    }
    imageheader {
      blurUpThumb
      url
    }
    imageheadermobile {
      blurUpThumb
      url
    }
    title
    subtitle
    description
    handle
    seo {
      description
      image {
        url
      }
      title
    }
    shopifyCollection
    shopifyProduct {
      product
    }
  }
}
  `;

  return await request("datoCMS", QUERY);
}

export default getArticle;
