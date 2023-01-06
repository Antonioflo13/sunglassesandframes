//REACT
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import Image from "next/image";
import FilterIcon from "../assets/images/filter-icon.png";
import useMediaQuery from "../hooks/useMediaQuery";
import {
  faAngleLeft,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const FilterDesktop = ({
  filterObj,
  filterHandler,
  removeValue,
  hideModal,
}) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let obj in filterObj) {
      arr.push({
        label: obj.charAt(0).toUpperCase() + obj.slice(1),
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

  const toggleStringArrayToFilters = (event, obj, string) => {
    let filtersArray = [...filters];
    let filterObj = filtersArray.find(filter => filter.label === obj.label);
    if (!event.target.checked) {
      filterObj.active = filterObj.active.filter(act => act !== string);
    } else {
      filterObj.active.unshift(string);
    }
    setFilters(filtersArray);
  };

  useEffect(() => {
    filterHandler(filters);
  }, [filters]);

  useEffect(() => {
    if (removeValue) {
      const arr = [...filters];
      const obj = arr.find(filter => filter.label === removeValue.label);
      if (obj) {
        obj.active = obj.active.filter(act => act !== removeValue.value);
        setFilters(arr);
      }
    }
  }, [removeValue]);

  const isDesktop = useMediaQuery(768);

  return (
    <>
      {filters.length > 0 && (
        <div className={isDesktop ? "containerFilter" : "mt-10"}>
          {!isDesktop && (
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faAngleLeft}
                width={10}
                style={{ cursor: "pointer", marginBottom: "32px" }}
                onClick={hideModal}
              />
              {/* <div className="title-filter">
                <Image
                  src={FilterIcon}
                  alt="filter-icon"
                  width={24}
                  height={24}
                  className="inline mr-5"
                />
                FILTERS
              </div> */}
            </div>
          )}
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
                    {filter.label !== "Taglia"
                      ? filter.label.charAt(0).toUpperCase() +
                        filter.label.slice(1)
                      : "Size"}
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
                        <label
                          htmlFor={val}
                          // onClick={e =>
                          //   toggleStringArrayToFilters(e, filter, val)
                          // }
                        >
                          <input
                            type="checkbox"
                            // defaultChecked={filter.active.includes(val)}
                            checked={filter.active.includes(val)}
                            onChange={e =>
                              toggleStringArrayToFilters(e, filter, val)
                            }
                            id={val}
                            name={val}
                            className="mr-1"
                          />
                          {val}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          {!isDesktop && (
            <button
              className="text-center border border-black rounded-xl w-full uppercase p-2 mt-5 flex justify-center items-center"
              onClick={hideModal}
            >
              <FontAwesomeIcon
                icon={faCheckDouble}
                width={16}
                height={16}
                style={{ cursor: "pointer", marginRight: 10 }}
                onClick={hideModal}
              />
              Apply
            </button>
          )}
        </div>
      )}

      <style jsx="true">
        {`
          .iconFilter {
            width: 15px;
            margin-top: 5px;
            height: 15px;
          }
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
