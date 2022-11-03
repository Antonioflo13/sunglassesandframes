import Client from "shopify-buy";
import { getCookie, setCookie } from "../utils/cookie";

const shopifyBuildClient = async (action, language, items) => {
  const buildClient = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESSTOKEN,
    language: language,
  });

  switch (action) {
    case "createCheckout":
      const { id, webUrl } = await buildClient.checkout.create();
      setCookie("checkoutId", id, 90);
      setCookie("checkoutWebUrl", webUrl, 90);
      break;
    case "updateCheckout":
      let checkoutId = getCookie("checkoutId");
      return await buildClient.checkout.addLineItems(checkoutId, items);
  }

};

export default shopifyBuildClient;
