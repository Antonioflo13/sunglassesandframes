import request from "./request";

async function getMonthlyHighlight() {
  const query = `{
    allMonthlyHighlights {
        text
        handle
        designer
        backgroundimage {
          url
        }
    }
}`;

  return await request("datoCMS", query);
}

export default getMonthlyHighlight;
