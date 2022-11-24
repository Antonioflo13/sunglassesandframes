import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
} from "react-instantsearch-dom";
import { FormattedNumber } from "react-intl";
import Link from "next/link";
import AlgoliaSearchInput from "./AlgoliaSearchInput";

import logo from "../assets/images/logo.png";
import Image from "next/image";

const AlgoliaSearch = () => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY
  );

  const Hit = props => {
    return (
      <div>
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
            <p className="text-2xs">
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
      <div className="flex justify-center items-center mb-3">
        <Link href="/">
          <Image src={logo.src} width={150} height={100} alt="logo" />
        </Link>
      </div>
      <div className="mb-5">
        <AlgoliaSearchInput />
      </div>
      <Stats />
      <SortBy
        defaultRefinement="shopify_products"
        items={[
          { value: "shopify_products", label: "Featured" },
          { value: "shopify_products_price_asc", label: "Price asc." },
          { value: "shopify_products_price_desc", label: "Price desc." },
        ]}
      />
      <div className="mt-8 w-full">
        <Hits hitComponent={Hit} />
      </div>
      <div className="pagination flex justify-center p-5">
        <Pagination showLast />
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearch;
