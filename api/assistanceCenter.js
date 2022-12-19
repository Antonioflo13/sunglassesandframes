import request from "./request";

async function getAssistanceCenterInfo() {
  const QUERY = `{
     allAssistanceCenters {
        description
        headerImage {
          blurUpThumb
          url
        }
        collapsableMenu {
          id
          title
          description
        }
    }
}`;

  return await request("datoCMS", QUERY);
}

export default getAssistanceCenterInfo;
