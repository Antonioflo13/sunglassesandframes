import { connectSearchBox } from "react-instantsearch-dom";

//Add FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  // <form noValidate role="search">
  //   {/* <div className="flex items-center w-full mb-[15px]">
  //     <FontAwesomeIcon
  //       className="padding-[10px] w-[16px] absolute left-10"
  //       icon={faSearch}
  //     />
  //     <input
  //       type="search"
  //       value={currentRefinement}
  //       onChange={event => refine(event.currentTarget.value)}
  //       className="border-2 border-black rounded-lg p-2 pl-30 w-[100%] md:w-[70%]"
  //       autoFocus
  //     />
  //   </div> */}
  //   <div class="relative text-gray-600 focus-within:text-gray-400">
  //     <span class="absolute inset-y-0 left-0 flex items-center pl-2">
  //       <FontAwesomeIcon
  //         className="padding-[10px] w-[16px] absolute left-10 p-1 focus:outline-none focus:shadow-outline"
  //         icon={faSearch}
  //       />
  //     </span>
  //     <input
  //       type="search"
  //       value={currentRefinement}
  //       onChange={event => refine(event.currentTarget.value)}
  //       // className="border-2 border-black rounded-lg p-2 pl-30 w-[100%] md:w-[70%]"
  //       autoFocus
  //       className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
  //       placeholder="Search..."
  //       autocomplete="off"
  //     />
  //   </div>
  // </form>
  <label class="relative text-gray-400 focus-within:text-gray-600 block w-[100%] md:w-[70%] m-auto">
    <FontAwesomeIcon
      class="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 w-[1.7rem] h-[1.7rem]"
      icon={faSearch}
    />

    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      placeholder="Search..."
      class="border-2 border-black rounded-xl py-2 px-4 bg-white placeholder-gray-400 text-black appearance-none w-full block pl-12 focus:outline-none"
    />
  </label>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
