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
} from "react-instantsearch-dom";
import { FormattedNumber } from "react-intl";
import Link from "next/link";
import AlgoliaSearchInput from "./AlgoliaSearchInput";
import { CustomInfiniteHits } from "./custom-infinite-hits";

import logo from "../assets/images/logo.png";
import Image from "next/image";
import createHandle from "../hooks/createHandle";

const AlgoliaSearch = props => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY
  );

  const [activeSearch, setActiveSearch] = useState(false);

  const showProducts = value => {
    setActiveSearch(value && value.trim() !== "");
  };

  return (
    <InstantSearch indexName="shopify_products" searchClient={searchClient}>
      <Configure hitsPerPage={40} />
      <div className="flex justify-center items-center mb-3">
        <Link href="/">
          <Image src={logo.src} width={150} height={100} alt="logo" />
        </Link>
      </div>
      <div className="mb-5">
        <AlgoliaSearchInput isSearchActive={showProducts} />
      </div>

      {activeSearch && (
        <div className="mt-8 w-full">
          <Index indexName="shopify_collections">
            <h2 className="text-center uppercase text-gray-400">
              <Stats
                className="mb-5"
                translations={{
                  stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                    return areHitsSorted && nbHits !== nbSortedHits
                      ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                      : ` Designer (${nbHits.toLocaleString()})`;
                  },
                }}
              />
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
              <Stats
                className="mb-5"
                translations={{
                  stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                    return areHitsSorted && nbHits !== nbSortedHits
                      ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                      : ` Prodotti (${nbHits.toLocaleString()})`;
                  },
                }}
              />
            </h2>
            <CustomInfiniteHits
              hasMore={false}
              hits={props.hits}
              type="product"
              onClose={props.onClose}
            />
          </Index>
        </div>
      )}
    </InstantSearch>
  );
};

export default AlgoliaSearch;
