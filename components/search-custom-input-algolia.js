import React from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

function CustomSearchBox(props) {
  const { query, refine } = useSearchBox(props);

  const searchHandler = event => {
    console.log(query);
    refine(event.currentTarget.value);
  };

  return (
    <>
      <label className="relative block w-[100%] md:w-[50%] m-auto">
        <FontAwesomeIcon
          className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 w-[1rem] h-[1rem]"
          icon={faSearch}
        />

        <input
          type="search"
          autoFocus
          onChange={searchHandler}
          className="border-2 border-black rounded-xl py-1 px-4 bg-white placeholder-gray-400 text-black appearance-none w-full block pl-12 focus:outline-none"
        />
      </label>
    </>
  );
}

export default CustomSearchBox;
