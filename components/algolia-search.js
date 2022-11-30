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

import logo from "../assets/images/logo.png";
import Image from "next/image";
import createHandle from "../hooks/createHandle";

const AlgoliaSearch = props => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY
  );

  const HitProduct = props => {
    console.log(props.hit);
    return (
      <div onClick={props.onClose}>
        <Link href={`/designers/${props.hit.vendor}/${props.hit.handle}`}>
          <div className="w-full flex flex-col items-center text-center">
            <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
              <div className="absolute top-0 w-full h-full">
                <img
                  className="w-full h-full"
                  src={props.hit.image}
                  align="left"
                  alt={props.hit.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="hit-name">
              <Highlight
                attribute="vendor"
                hit={props.hit}
                // className="text-sunglassesandframes-red text-xs font-bold italic mackay noToHead mt-2"
              />
            </div>
            {/* {props.hit.vendor} */}
            {/* </Highlight> */}
            <div className="hit-name">
              <Highlight
                attribute="title"
                hit={props.hit}
                // className="ml-1 text-xs uppercase font-bold mt-2"
              />
            </div>
            {/* {props.hit.title} */}
            {/* </Highlight> */}
            <p className="mt-1">
              <FormattedNumber
                style="currency"
                value={props.hit.price}
                minimumFractionDigits={2}
              />
              {" €"}
            </p>
          </div>
        </Link>
      </div>
    );
  };

  const HitCollection = props => {
    return (
      <div onClick={props.onClose}>
        <Link href={`/designers/${props.hit.handle}`}>
          <div className="w-full flex flex-col items-center text-center">
            <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
              <div className="absolute top-0 w-full h-full">
                <img
                  className="w-full h-full"
                  src={props.hit.image}
                  align="left"
                  alt={props.hit.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            {/* {props.hit.vendor} */}
            {/* </Highlight> */}
            <div className="hit-name">
              <Highlight
                attribute="title"
                hit={props.hit}
                // className="ml-1 text-xs uppercase font-bold mt-2"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  };

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
                translations={{
                  stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                    return areHitsSorted && nbHits !== nbSortedHits
                      ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                      : ` Designer (${nbHits.toLocaleString()})`;
                  },
                }}
              />
            </h2>
            <InfiniteHits
              hasMore={false}
              hitComponent={({ hit }) => (
                <HitCollection hit={hit} onClose={props.onClose} />
              )}
            />
          </Index>
          <Index indexName="shopify_products">
            <h2 className="text-center uppercase text-gray-400">
              <Stats
                translations={{
                  stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                    return areHitsSorted && nbHits !== nbSortedHits
                      ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                      : ` Prodotti (${nbHits.toLocaleString()})`;
                  },
                }}
              />
            </h2>
            <InfiniteHits
              hitComponent={({ hit }) => (
                <HitProduct hit={hit} onClose={props.onClose} />
              )}
            />
          </Index>
        </div>
      )}
    </InstantSearch>
  );
};

export default AlgoliaSearch;
