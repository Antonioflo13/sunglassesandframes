import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string;
};

const Crisp = require("crisp-api");
const CrispClient = new Crisp();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const BODY: {
    name: string;
    email: string;
    subject: string;
    segments: [string];
    message: string;
  } = req.body;

  CrispClient.authenticateTier(
    "plugin",
    process.env.CRISP_INDENTIFIER,
    process.env.CRISP_KEY
  );

  CrispClient.website
    .createNewConversation(process.env.NEXT_PUBLIC_CRISP_ID_SITE)
    .then((session: { session_id: string }) => {
      updateConversationMeta(session.session_id);
      console.log("Conversation created:", session.session_id);
    })
    .catch((error: { code: number }) => {
      res.status(error.code).json({ response: "Connection error" });
      console.error("Error sending message:", error);
    });

  const sendMessageInConversation = (sessionId: string) => {
    CrispClient.website
      .sendMessageInConversation(
        process.env.NEXT_PUBLIC_CRISP_ID_SITE,
        sessionId,
        {
          type: "text",
          from: "user",
          origin: "email",
          content: BODY.message,
        }
      )
      .then((message: object) => {
        console.log("Message sent:", message);
        res.status(200).json({ response: "Message sent" });
      })
      .catch((error: { code: number }) => {
        res.status(error.code).json({ response: "Connection error" });
        console.error("Error sending message:", error);
      });
  };
  const updateConversationMeta = (sessionId: string) => {
    CrispClient.website
      .updateConversationMetas(
        process.env.NEXT_PUBLIC_CRISP_ID_SITE,
        sessionId,
        {
          nickname: BODY.name,
          email: BODY.email,
          segments: BODY.segments,
        }
      )
      .then((response: object) => {
        console.log("Update meta:", response);
        sendMessageInConversation(sessionId);
      })
      .catch((error: { code: number }) => {
        res.status(error.code).json({ response: "Connection error" });
        console.error("Error Update meta:", error);
      });
  };
}
