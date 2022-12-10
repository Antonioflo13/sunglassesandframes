import React from "react";
import Zendesk from "react-zendesk";
const ZENDESK_KEY = "d689288b-51bb-4733-9fcc-a91a2cf8f3ac";

// Take contact form as an example
// Let's customise our contact form appearance, launcher and add prefill content
const setting = {
  color: {
    theme: "#000",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};

const ZenDesk = () => {
  return (
    <Zendesk
      defer
      zendeskKey={ZENDESK_KEY}
      {...setting}
      onLoaded={() => console.log("zendesk is loaded")}
    />
  );
};

export default ZenDesk;
