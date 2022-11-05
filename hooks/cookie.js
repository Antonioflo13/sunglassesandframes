import React, { useEffect } from "react";
import Script from "next/script";

const cookie = async language => {
  let script = await document.createElement("script");
  script.src = "https://cdn.iubenda.com/cs/iubenda_cs.js";
  script.async = true;
  document.body.appendChild(script);
  const setCookie = () => {
    const _iub = _iub || [];
    _iub.csConfiguration = {
      lang: language,
      siteId: 2172061,
      cookiePolicyId: 22164738,
      banner: {
        acceptButtonDisplay: true,
        customizeButtonDisplay: true,
        acceptButtonColor: "#800000",
        acceptButtonCaptionColor: "white",
        customizeButtonColor: "#212121",
        customizeButtonCaptionColor: "white",
        rejectButtonColor: "#0073CE",
        rejectButtonCaptionColor: "white",
        position: "float-bottom-center",
        textColor: "white",
        backgroundColor: "#000001",
        fontSizeBody: 12,
      },
    };
  };
  script.addEventListener("ended", event => {
    console.log(event);
    setCookie();
  });
};

export default cookie;
