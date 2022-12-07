import React from "react";

const InfoMobile = () => {
  return (
    <>
      <div className="containerLineInfo">
        <div className="line" />
        <div className="containerInfo mt-5">
          <p>Need help?</p>
          <div className="info">
            <p>Whatsapp</p>
            <p>+39 339 46 44 407</p>
            <p>Available Monday to Friday, 09:00 - 18:00 EST</p>
          </div>
          <div className="info">
            <p>E-mail us</p>
            <p>info@sunglassesandframes.com</p>
          </div>
          <div className="info">
            <p>Assistance Center</p>
            <p>Anything you need to know is here</p>
          </div>
        </div>
      </div>
      <style jsx="true">
        {`
          .containerLineInfo {
            position: absolute;
            top: 35%;
            width: 100%;
          }
          .line {
            width: 100%;
            height: 1px;
            background: #c0c0c0;
          }

          .containerInfo {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .info {
            margin-top: 25px;
          }
        `}
      </style>
    </>
  );
};

export default InfoMobile;
