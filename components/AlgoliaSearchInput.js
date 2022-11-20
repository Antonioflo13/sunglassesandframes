import { connectSearchBox } from "react-instantsearch-dom";

//Add FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <label className="relative text-gray-400 focus-within:text-gray-600 block w-[100%] md:w-[70%] m-auto">
    <FontAwesomeIcon
      className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 w-[1.7rem] h-[1.7rem]"
      icon={faSearch}
    />

    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      placeholder="Search..."
      className="border-2 border-black rounded-xl py-2 px-4 bg-white placeholder-gray-400 text-black appearance-none w-full block pl-12 focus:outline-none"
    />
  </label>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
