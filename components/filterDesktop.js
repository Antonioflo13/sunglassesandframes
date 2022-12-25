//REACT
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const FilterDesktop = () => {
  const [colors, setColors] = useState(false);
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
          {colors === false ? (
            <FontAwesomeIcon
              icon={faAngleRight}
              width={10}
              style={{ cursor: "pointer" }}
              onClick={() => setColors(true)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              width={15}
              style={{ cursor: "pointer" }}
              onClick={() => setColors(false)}
            />
          )}
        </div>
        {colors && (
          <div className="mt-5">
            <div>
              <input type="checkbox" />
              <label className="ml-2">Black</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Brown</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Red</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Blue</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Yellow</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Green</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Gold</label>
            </div>
            <div>
              <input type="checkbox" />
              <label className="ml-2">Silver</label>
            </div>
          </div>
        )}
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
