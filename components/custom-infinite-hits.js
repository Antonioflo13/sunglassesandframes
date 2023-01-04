import { connectInfiniteHits } from "react-instantsearch-dom";
import Link from "next/link";
// import { Highlight } from "react-instantsearch-dom";
import createHandle from "../hooks/createHandle";
import { FormattedNumber } from "react-intl";
import { InfiniteHits } from "./infiniteHits";
import { useRouter } from "next/router";

export const HitCollection = props => {
  console.log(props.hit);
  // if (props.hit.image) {
  return (
    <div
      onClick={props.onClose}
      // style={{ display: props.hit.image ? "block" : "none" }}
    >
      <Link href={`/designers/${props.hit.handle}`}>
        <div className="w-full flex flex-col items-center text-center">
          <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
            <div className="absolute top-0 w-full h-full rounded-xl overflow-hidden">
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
            <div className="ml-1 text-xs uppercase font-bold mt-2">
              {props.hit.title}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
  // }
};

export const HitProduct = props => {
  console.log(props.hit);
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
            <div className="text-sunglassesandframes-red text-xs font-bold raleway noToHead mt-2">
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

const InfiniteHitsParent = ({
  hits,
  hasMore,
  refineNext,
  type,
  onClose,
  searchText,
}) => {
  const router = useRouter();
  const goToSearchPage = link => {
    refineNext();
    onClose();
    router.push(link);
  };

  return (
    <div className="ais-InfiniteHits">
      <ol className="ais-InfiniteHits-list">
        {hits.map(hit => (
          <div
            className="ais-InfiniteHits-item"
            key={hit.id}
            // style={{
            //   display:
            //     !hit.image || hit.variants_inventory_count === 0
            //       ? "none"
            //       : "block",
            // }}
          >
            {type === "designer" && (
              <HitCollection hit={hit} onClose={onClose} />
            )}
            {type === "product" && <HitProduct hit={hit} onClose={onClose} />}
          </div>
        ))}
      </ol>
      <div className="flex justify-center mt-2 mb-4">
        {type === "designer" && (
          <button
            className="ais-InfiniteHits-loadMore"
            disabled={!hasMore}
            // style={{ display: hasMore ? "block" : "none" }}
            onClick={refineNext}
          >
            Show More
          </button>
        )}
        {type === "product" && (
          <button
            className="uppercase font-sans font-bold"
            disabled={!hasMore}
            style={{ display: hasMore ? "block" : "none" }}
            onClick={() => goToSearchPage(`/search?text=${searchText}`)}
          >
            <p className="relative font-bold pb-0">
              Show all results
              <p className="absolute top-[50%] translate-y-[-25%] left-[-5%] bg-yellow-300 w-[110%] h-[20%] rounded opacity-40"></p>
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export const CustomInfiniteHits = connectInfiniteHits(InfiniteHitsParent);
