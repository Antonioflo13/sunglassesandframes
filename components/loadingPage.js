//REACT
import React from "react";
//NEXT
import Image from "next/image";
//IMAGES
import logo from "../assets/images/logo.png";

const LoadingPage = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <Image
          src={logo.src}
          fill="true"
          sizes="100%"
          priority={true}
          placeholder="blur"
          blurDataURL={logo.blurDataURL}
          alt="loading-logo"
        />
      </div>
      <style jsx="true">{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .logo-container {
          position: relative;
          width: 15%;
          height: 100px;
          animation: fadeIn 2s linear infinite;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
export default LoadingPage;
