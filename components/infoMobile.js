import React from "react";

const InfoMobile = () => {
  return (
    <>
      <div className="containerLineInfo">
        <div className="line" />
        <div className="containerInfo mt-5">
          <div>Need help?</div>
          <div className="info">
            <div className="text-sunglassesandframes-black font-bold raleway">
              Whatsapp us
            </div>
            <div>+39 339 46 44 407</div>
            <div style={{ fontSize: "13px" }}>
              Available Monday to Friday, 09:00 - 18:00 EST
            </div>
          </div>
          <div className="info">
            <div className="text-sunglassesandframes-black font-bold raleway">
              E-mail us
            </div>
            <div>info@sunglassesandframes.com</div>
          </div>
          <div className="info">
            <div className="text-sunglassesandframes-black font-bold raleway">
              Assistance Center
            </div>
            <div>Anything you need to know is here</div>
          </div>
        </div>
      </div>
      <style jsx="true">
        {`
          .containerLineInfo {
            margin: 20px 0;
          }
          .line {
            width: 100%;
            height: 1px;
            background: #c0c0c0;
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
