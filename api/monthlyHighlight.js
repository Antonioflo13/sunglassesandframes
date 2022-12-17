import request from "./request";

async function getMonthlyHighlight() {
  const query = `{
    allMonthlyHighlights {
        text
        handle
        designer
        navbarImage {
          url
          blurUpThumb
        }
        designerPageImage {
          url
          blurUpThumb
        }
    }
}`;

  return await request("datoCMS", query);
}

export default getMonthlyHighlight;
