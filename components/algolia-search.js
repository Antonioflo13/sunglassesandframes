import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";
import { FormattedNumber } from "react-intl";
import Link from "next/link";

const AlgoliaSearch = () => {
  const searchClient = algoliasearch(
    "17WRZZ9Y8K",
    "c89f0d7433b24a99b93de0fce9cd0f8c"
  );
  return (
    <InstantSearch indexName="shopify_products" searchClient={searchClient}>
      <SearchBox />
      <div className="mt-8 w-full">
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};

function Hit(props) {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-12">
      <Link href={``}>
        <div className="w-full flex flex-col items-center">
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
          <div className="text-sunglassesandframes-red text-xs font-bold italic mackay noToHead mt-2">
            {props.hit.vendor}
          </div>
          <div className="ml-1 text-xs uppercase font-bold mt-2">
            {props.hit.title}
          </div>
          <p className="text-2xs">
            <FormattedNumber
              style="currency"
              value={props.hit.price}
              minimumFractionDigits={2}
            />
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AlgoliaSearch;
