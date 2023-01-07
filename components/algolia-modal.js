//REACT
import React from "react";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setAlgoliaModalShow } from "../store/modules/algoliaModal";
//ALGOLIA
import AlgoliaSearch from "./algolia-search";
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const AlgoliaModal = () => {
  const dispatch = useDispatch();
  const showAlgoliaModal = useSelector(state => state.algoliaModal.value);

  const closeSearchModal = () => {
    dispatch(setAlgoliaModalShow(!showAlgoliaModal));
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-auto");
  };

  return (
    <>
      <div
        id="search-overlay"
        className={`fullScreenBackgroundSearch absolute w-screen h-screen top-0 left-0 z-50 overflow-y-scroll transition-all duration-300 ${
          showAlgoliaModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeSearchModal}
      >
        <div>
          <FontAwesomeIcon
            style={{ marginLeft: "2px", width: 15 }}
            className="cursor-pointer absolute right-10 top-10"
            icon={faXmark}
            onClick={closeSearchModal}
          />
        </div>
        <div className="bg-white p-4" onClick={e => e.stopPropagation()}>
          <AlgoliaSearch onClose={closeSearchModal} />
        </div>
      </div>
      <style jsx="true">{`
        .fullScreenBackgroundSearch {
          background-color: rgb(0 0 0/25%);
          z-index: 99;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
        }
      `}</style>
    </>
  );
};

export default AlgoliaModal;
