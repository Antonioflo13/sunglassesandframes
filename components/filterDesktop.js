//REACT
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const FilterDesktop = () => {
  return (
    <>
      <div className="containerFilter mt-20">
        <div className="title-filter mb-5">FILTERS</div>
        <div className="containerFilterArrow mt-8">
          <div>Design</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Colors</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Size</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Shape</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Category</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Gender</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="containerFilterArrow mt-8">
          <div>Material</div>
          <FontAwesomeIcon
            icon={faAngleRight}
            width={10}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <style jsx="true">
        {`
          .containerFilterArrow {
            display: flex;
            justify-content: space-between;
            border-bottom: solid 1px #bebebe;
            padding-bottom: 10px;
          }

          .containerProduct {
            width: 100%;
          }

          .containerFilter {
            width: 30%;
          }
        `}
      </style>
    </>
  );
};

export default FilterDesktop;
