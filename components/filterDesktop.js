//REACT
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import Image from "next/image";
import FilterIcon from "../assets/images/filter-icon.png";

const FilterDesktop = ({ filterObj }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let obj in filterObj) {
      arr.push({ label: obj, value: filterObj[obj] });
    }
    setFilters(arr);
  }, [filterObj]);

  useEffect(() => {
    console.log({ activeFilters, filters });
  }, [activeFilters]);

  const toggleActiveFilters = value => {
    if (activeFilters.length > 0 && activeFilters.includes(value)) {
      setActiveFilters(prevState => prevState.filter(el => el !== value));
    } else {
      setActiveFilters([...activeFilters, value]);
    }
  };
  return (
    <>
      <div className="containerFilter mt-20">
        <div className="title-filter mb-5">
          <Image
            src={FilterIcon}
            alt="filter-icon"
            width={24}
            height={24}
            className="inline mr-5"
          />
          FILTERS
        </div>
        {filters.length > 0 &&
          filters.map(filter => (
            <div key={filter.label}>
              <div className="containerFilterArrow mt-8">
                <div>
                  {filter.label.charAt(0).toUpperCase() + filter.label.slice(1)}
                </div>
                {!activeFilters.includes(filter.label) ? (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    width={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleActiveFilters(filter.label)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    width={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleActiveFilters(filter.label)}
                  />
                )}
              </div>
              {activeFilters.includes(filter.label) && filter.value.length > 0 && (
                <div className="mt-5">
                  {filter.value.map(val => (
                    <div key={val}>
                      <input type="checkbox" />
                      <label className="ml-2">{val}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
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
