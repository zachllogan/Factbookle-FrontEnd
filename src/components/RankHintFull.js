import "../styles/RankHintFull.css";
import PinnableStat from "./PinnableStat";

function RankHintFull(props) {
  var color = "red";
  if (props.diff == null) {
    color = "grey";
  } else if (props.diff <= 10 && props.diff >= -10) {
    color = "green";
  } else if (props.diff <= 50 && props.diff >= -50) {
    color = "yellow";
  }
  return (
    <div className="rank_full">
      <PinnableStat statname={props.statname} handleClicked={props.handlePin} />
      <div style={{ color: color }}>
        {props.rank == null
          ? "N/A"
          : props.rank +
            " - " +
            props.stat +
            props.unit +
            " " +
            (props.diff ? (props.diff > 0 ? "\u2193" : "\u2191") : "")}
      </div>
    </div>
  );
}

export default RankHintFull;
