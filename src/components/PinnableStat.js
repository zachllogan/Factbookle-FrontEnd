import "../styles/PinnableStat.css";

function PinnableStat(props) {
  const handleClicked = () => {
    props.handleClicked(props.statname);
  };

  return (
    <div className="pinnable_stat">
      <button className="pin" onClick={handleClicked}>
        &#128392;
      </button>
      <div className="stat_name">{props.statname}</div>
    </div>
  );
}

export default PinnableStat;
