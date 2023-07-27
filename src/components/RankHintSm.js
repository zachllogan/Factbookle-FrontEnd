import "../styles/RankHintSm.css";

function RankHintSm(props) {
  var color = "red";
  if (props.diff == null) {
    color = "grey";
  } else if (props.diff <= 10 && props.diff >= -10) {
    color = "green";
  } else if (props.diff <= 50 && props.diff >= -50) {
    color = "yellow";
  }
  return (
    <div className="rank_sm" style={{ color: color }}>
      {props.rank == null
        ? "N/A"
        : props.rank +
          " " +
          (props.diff ? (props.diff > 0 ? "\u2193" : "\u2191") : "")}
    </div>
  );
}

export default RankHintSm;
