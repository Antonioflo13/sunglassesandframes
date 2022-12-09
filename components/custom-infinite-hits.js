import { connectInfiniteHits } from "react-instantsearch-dom";
import Link from "next/link";
// import { Highlight } from "react-instantsearch-dom";
import createHandle from "../hooks/createHandle";
import { FormattedNumber } from "react-intl";

export const HitCollection = props => {
  console.log(props.hit);
  return (
    <div
      onClick={props.onClose}
      style={{ display: props.hit.image ? "block" : "none" }}
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
};

export const HitProduct = props => {
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
};

const InfiniteHits = ({ hits, hasMore, refineNext, type, onClose }) => (
  <div className="ais-InfiniteHits">
    <ol className="ais-InfiniteHits-list">
      {hits.map(hit => (
        <div
          className="ais-InfiniteHits-item"
          key={hit.id}
          style={{
            display:
              !hit.image || hit.variants_inventory_count === 0
                ? "none"
                : "block",
          }}
        >
          {type === "designer" && <HitCollection hit={hit} onClose={onClose} />}
          {type === "product" && <HitProduct hit={hit} onClose={onClose} />}
        </div>
      ))}
    </ol>
    <button
      className="ais-InfiniteHits-loadMore"
      disabled={!hasMore}
      style={{ display: hasMore ? "block" : "none" }}
      onClick={refineNext}
    >
      Show more
    </button>
  </div>
);

export const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);
