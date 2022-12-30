//REACT
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import Image from "next/image";
import FilterIcon from "../assets/images/filter-icon.png";

const FilterDesktop = ({ filterObj }) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let obj in filterObj) {
      arr.push({
        label: obj,
        value: filterObj[obj],
        isActive: false,
        active: [],
      });
    }
    arr = arr.filter(obj => obj.value.length > 1);

    setFilters(arr);
  }, [filterObj]);

  const toggleActiveFilters = value => {
    const newFilters = [...filters];
    let activeFilter = newFilters.find(filter => filter.label === value.label);
    if (
      newFilters.length > 0 &&
      newFilters.find(filter => filter.label === value.label).isActive === false
    ) {
      activeFilter.isActive = true;
      setFilters(newFilters);
    } else {
      activeFilter.isActive = false;
      setFilters(newFilters);
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
                {!filter.isActive ? (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    width={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleActiveFilters(filter)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    width={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleActiveFilters(filter)}
                  />
                )}
              </div>
              {filter.isActive && filter.value.length > 0 && (
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
