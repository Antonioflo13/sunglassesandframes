import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
// import Custom

import algoliasearch from "algoliasearch/lite";
import {
  Highlight,
  InstantSearch,
  SearchBox,
  Snippet,
  Configure,
} from "react-instantsearch-hooks-web";

import { InfiniteHits } from "../../components/infiniteHits";
import createHandle from "../../hooks/createHandle";
import { FormattedNumber } from "react-intl";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY!
);

const SearchPage = () => {
  const [textSearch, setTextSearch] = useState("");
  const router = useRouter();
  const { text } = router.query;
  console.log(textSearch);

  useEffect(() => {
    setTextSearch(text as string);
  }, [text]);

  // const queryHook = (query: any, search: any) => {
  //   console.log(query);
  //   console.log(text);
  //   search(text);
  // };
  return (
    <Layout itemsNavbar={undefined}>
      <div className="mt-20">
        <InstantSearch indexName="shopify_products" searchClient={searchClient}>
          {/* <SearchBox queryHook={queryHook} /> */}
          <Configure hitsPerPage={8} query={textSearch as string} />
          <InfiniteHits hitComponent={Hit} key={textSearch} />
        </InstantSearch>
      </div>
    </Layout>
  );
};

export const Hit = props => {
  // console.log(props.hit);
  // if (props.hit.variants_inventory_count > 0 || props.hit.image) {
  return (
    <div onClick={props.onClose}>
      <Link
        href={`/designers/${createHandle(props.hit.vendor)}/${
          props.hit.handle
        }`}
      >
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
            <div className="text-sunglassesandframes-red text-xs font-bold mackay noToHead mt-2">
              {props.hit.vendor}
            </div>
          </div>
          <div className="hit-name">
            <div className="ml-1 uppercase font-bold mt-1">
              {props.hit.title}
            </div>
          </div>
          {/* {props.hit.title} */}
          {/* </Highlight> */}
          <p className="mt-1">
            <FormattedNumber
              style="currency"
              value={props.hit.price}
              minimumFractionDigits={2}
            />
            {"€"}
          </p>
        </div>
      </Link>
    </div>
  );
  // }
};

export default SearchPage;
