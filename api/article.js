import request from "./request";

async function getArticle(handle) {
  const QUERY = `
  {
  article(filter: {handle: {eq: "${handle}"}}) {
    id
    imageArticleDetail {
      blurUpThumb
      url
      alt
    }
    title
    subtitle
    description
    handle
    seo {
      description
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
