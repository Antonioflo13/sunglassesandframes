import React from "react";
//FORMATTED MESSAGES
import { FormattedMessage } from "react-intl";
//ICONS
import Badge from "../assets/images/product-page/badge.png";
import Delivery from "../assets/images/product-page/delivery.png";
import HandShake from "../assets/images/product-page/hand-shake.png";
import Transaction from "../assets/images/product-page/transaction.png";
import Worldwide from "../assets/images/product-page/worldwide.png";

const ProductIcon = ({ fontSize }) => {
  const icons = [
    {
      icon: Badge,
      position: "1",
      alt: "Badge",
      description: "product.icon.original.certified",
    },
    {
      icon: Delivery,
      position: "2",
      alt: "Badge",
      description: "product.trackable.orders",
    },
    {
      icon: Transaction,
      position: "3",
      alt: "Badge",
      description: "product.secure.payment",
    },
    {
      icon: HandShake,
      position: "4",
      alt: "Badge",
      description: "product.money.back",
    },
    {
      icon: Worldwide,
      position: "5",
      alt: "Badge",
      description: "product.icon.worldwide.shipping",
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center w-full mb-4 compatto">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`"flex flex-col justify-center items-center mx-2 order-${icon.position}`}
          >
            <div className="flex justify-center">
              <img
                className="icon"
                key={index}
                src={icon.icon.src}
                alt={icon.alt}
              />
            </div>
            <div style={{ fontSize: fontSize }} className="text-container">
              <FormattedMessage id={icon.description} />
            </div>
          </div>
        ))}
      </div>
      <style jsx="true">{`
        .icon {
          width: 25px !important;
        }
        .text-container {
          font-size: 0.2rem;
          text-align: center;
        }

        .compatto {
          width: 66%;
          display: flex;
          align-self: center;
        }
        @media (min-width: 768px) {
          .icon {
            width: 30px;
          }
          .text-container {
            font-size: 0.55rem;
            color: #0a0a0a;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductIcon;
