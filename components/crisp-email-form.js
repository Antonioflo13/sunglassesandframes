//REACT
import React, { useState } from "react";
//FRAMER
import { motion } from "framer-motion";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";

const CrispEmailForm = () => {
  //STATE
  const [formMessage, setFormMessage] = useState({
    name: "",
    email: "",
    subject: "",
    segments: ["sunglassesandframes"],
    message: "",
  });

  //FUNCTIONS
  const validateEmail = email => {
    const validEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return validEmail === null;
  };

  const doSendEmail = async () => {
    console.log(formMessage);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formMessage),
    };
    fetch(`http://localhost:3000/api/crisp/sendMessage`, requestOptions)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setFormMessage({
          name: "",
          email: "",
          subject: "",
          segments: [],
          message: "",
        });
        console.log(data);
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div className="flex flex-col mx-5">
        <label htmlFor="">
          <FormattedMessage id="email.form.name" />
        </label>
        <input
          name="name"
          type="text"
          required
          value={formMessage.name}
          onChange={$event =>
            setFormMessage({ ...formMessage, name: $event.target.value })
          }
        />
        <label htmlFor="email">
          <FormattedMessage id="email.form.email" />
        </label>
        <input
          name="email"
          type="email"
          pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
          required
          value={formMessage.email}
          onChange={$event =>
            setFormMessage({ ...formMessage, email: $event.target.value })
          }
        />
        <label htmlFor="orderID">
          <FormattedMessage id="email.form.orderID" />
        </label>
        <input
          name="orderID"
          type="text"
          required
          value={formMessage.subject}
          onChange={$event =>
            setFormMessage({ ...formMessage, subject: $event.target.value })
          }
        />
        <label htmlFor="Message">
          <FormattedMessage id="email.form.message" />
        </label>
        <textarea
          name="Message"
          required
          value={formMessage.message}
          onChange={$event =>
            setFormMessage({ ...formMessage, message: $event.target.value })
          }
        />
        <div>
          <motion.button
            className="w-full rounded-lg bg-sunglassesandframes-black py-2 px-4 leading-5 text-white font-bold text-base"
            style={{ height: "45px" }}
            disabled={validateEmail(formMessage.email)}
            onClick={() => {
              doSendEmail();
            }}
          >
            <div className="flex justify-center align-center">
              <FormattedMessage id="email.form.submit" />
            </div>
          </motion.button>
        </div>
      </div>
      <style jsx="true">
        {`
          label {
            font-weight: bold;
          }
          input,
          textarea {
            width: 100%;
            margin-bottom: 10px;
            border: solid 1px;
            padding: 20px 10px;
            border-radius: 9px;
          }
          input {
            height: 23px;
          }
        `}
      </style>
    </>
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
