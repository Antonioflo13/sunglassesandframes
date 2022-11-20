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
import AlgoliaSearchInput from "./AlgoliaSearchInput";

const AlgoliaSearch = () => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY
  );

  const Hit = props => {
    return (
      <div>
        <Link href={`/designers/${props.hit.vendor}/${props.hit.handle}`}>
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
  };

  return (
    <InstantSearch indexName="shopify_products" searchClient={searchClient}>
      {/* <SearchBox
        className="text-center"
        autoFocus
        reset
        translations={{
          submitTitle: "Submit your search query.",
          resetTitle: "Clear your search query.",
          placeholder: "Clicca qui!",
        }}
      /> */}
      <AlgoliaSearchInput />
      <div className="mt-8 w-full">
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearch;
