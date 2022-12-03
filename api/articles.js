import request from "./request";

async function getAllArticles() {
  const query = `
{
    allArticles(orderBy: _createdAt_ASC) {
          id
          title
          titlemagazine
          description
          handle
          imageheader {
            url
            blurUpThumb
          }
          imageheadermobile {
            url
            blurUpThumb
          }
    }
}
`;

  return await request("datoCMS", query);
}

export default getAllArticles;
