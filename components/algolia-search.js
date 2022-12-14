import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  RefinementList,
  SortBy,
  Pagination,
  InfiniteHits,
  Index,
  // RefinementList,
} from "react-instantsearch-dom";
import Link from "next/link";
import AlgoliaSearchInput from "./AlgoliaSearchInput";
import { CustomInfiniteHits } from "./custom-infinite-hits";
import CustomStats from "./algolia-status-custom";

import logo from "../assets/images/logo.png";
import Image from "next/image";

const AlgoliaSearch = props => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY
  );

  const [activeSearch, setActiveSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const showProducts = value => {
    // setActiveSearch(true);
    setSearchText(value);
    setActiveSearch(value && value.trim() !== "" && value.length >= 3);
  };

  return (
    <InstantSearch indexName="shopify_products" searchClient={searchClient}>
      <Configure hitsPerPage={4} />
      {/* <CurrentRefinements
        transformItems={items =>
          items.filter(item => item.inventory_quantity > 0)
        }
      /> */}
      <div>
        <div className="flex justify-center items-center mb-3">
          <Link href="/">
            <Image src={logo.src} width={150} height={100} alt="logo" />
          </Link>
        </div>
        <div className="mb-5">
          <AlgoliaSearchInput isSearchActive={showProducts} />
        </div>
      </div>

      {activeSearch && (
        <div className="mt-8 w-full">
          <Index indexName="shopify_collections">
            <h2 className="text-center uppercase text-gray-400">
              <CustomStats type="Designer" className="mb-3" />
            </h2>
            <CustomInfiniteHits
              hasMore={false}
              hits={props.hits}
              type="designer"
              onClose={props.onClose}
            />
          </Index>
          <Index indexName="shopify_products">
            <h2 className="text-center uppercase text-gray-400">
              <CustomStats type="Products" className="mb-3" />
            </h2>
            <CustomInfiniteHits
              hasMore={false}
              hits={props.hits}
              type="product"
              searchText={searchText}
              onClose={props.onClose}
            />
          </Index>
        </div>
      )}
    </InstantSearch>
  );
};

export default AlgoliaSearch;
