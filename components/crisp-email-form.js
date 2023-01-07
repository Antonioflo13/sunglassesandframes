//REACT
import React, { useState } from "react";
//FRAMER
import { motion } from "framer-motion";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";

const CrispEmailForm = () => {
  //STATE
  const [email, setEmail] = useState("");

  //FUNCTIONS
  const validateEmail = email => {
    const validEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return false;
  };

  const doSendEmail = async () => {
    console.log("c");
    const response = await fetch(
      `https://api.crisp.chat/v1/website/${process.env.NEXT_PUBLIC_CRISP_ID_SITE}/conversation
`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:
          "97909153-3a2b-45e0-b234-a8f02ed84131:8fb928062ec13ebd03d02f701d9a8783edef4fa7d4339004f20375d94b2e7c81",
        referrerPolicy: "no-referrer",
        // body: JSON.stringify(data)
      }
    );
    console.log(response.json());
    return response.json();
  };
  return (
    <div className="flex flex-col mx-5">
      <div>
        <div className="text-center mb-5">
          <div>
            <div className="uppercase text-md font-bold">
              <FormattedMessage id="subscribe.title" />
            </div>
            <div className="text-sm">
              <FormattedMessage id="subscribe.description" />
            </div>
          </div>
        </div>
        <input
          type="email"
          placeholder={"Your e-mail address"}
          className="searchInput"
          pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
          required
          value={email}
          onChange={$event => setEmail($event.target.value)}
        />
      </div>
      <div>
        <motion.button
          className="w-full rounded-lg bg-sunglassesandframes-black py-2 px-4 leading-5 text-white font-bold text-base"
          style={{ height: "45px" }}
          disabled={validateEmail(email)}
          onClick={() => {
            doSendEmail();
            setEmail("");
          }}
        >
          <div className="flex justify-center align-center">
            <FormattedMessage id="subscribe.signup" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default CrispEmailForm;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
