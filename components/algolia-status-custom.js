import { connectStats } from "react-instantsearch-dom";

const Stats = ({
  processingTimeMS,
  nbHits,
  nbSortedHits,
  areHitsSorted,
  type,
  ...props
}) => (
  <p style={{ display: nbHits ? "block" : "none" }} {...props}>
    {areHitsSorted && nbHits !== nbSortedHits
      ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
      : `${type} (${nbHits.toLocaleString()})`}
  </p>
);

const CustomStats = connectStats(Stats);

export default CustomStats;
