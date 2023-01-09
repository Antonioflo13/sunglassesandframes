//REACT
import React, { useState } from "react";
//MAILCHIMP
import MailchimpSubscribe from "react-mailchimp-subscribe";
//FRAMER
import { motion } from "framer-motion";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";

const SubscribeForm = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  //STATE
  const [email, setEmail] = useState("");

  //FUNCTIONS
  const validateEmail = email => {
    const validEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return validEmail === null;
  };

  return (
    <>
      <div className="mc__form-container">
        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <div>
              <div />
              {/*{status === "sending" && (*/}
              {/*  <div style={{ color: "blue" }}>sending...</div>*/}
              {/*)}*/}
              {/*{status === "error" && (*/}
              {/*  <div*/}
              {/*    style={{ color: "red" }}*/}
              {/*    dangerouslySetInnerHTML={{ __html: message }}*/}
              {/*  />*/}
              {/*)}*/}
              {/*{status === "success" && (*/}
              {/*  <div style={{ color: "green" }}>Subscribed !</div>*/}
              {/*)}*/}
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
                      subscribe({ EMAIL: email.trim() });
                      setEmail("");
                    }}
                  >
                    <div className="flex justify-center align-center">
                      <FormattedMessage id="subscribe.signup" />
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <style jsx="true">
        {`
          input {
            width: 100%;
            margin-bottom: 10px;
            border: solid 1px;
            padding: 20px 10px;
            border-radius: 9px;
            height: 23px;
          }
        `}
      </style>
    </>
  );
};

export default SubscribeForm;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
