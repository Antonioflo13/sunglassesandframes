import request from "./request";

async function getAllArticles() {
  const query = `
{
    allArticles(orderBy: _createdAt_ASC) {
          id
          title
          titlemagazine
          subtitle
          description
          handle
          imageArticlesList {
            blurUpThumb
            url
            alt
          }
          imageArticleSlider {
            blurUpThumb
            url
            alt
          }
    }
}
`;

  return await request("datoCMS", query);
}

export default getAllArticles;
