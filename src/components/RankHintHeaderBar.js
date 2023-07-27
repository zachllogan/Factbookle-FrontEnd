import "../styles/RankHintHeaderBar.css";
import PinnableStat from "./PinnableStat";

function RankHintHeaderBar(props) {
  const pinnablestats = props.pinned?.map((pin) => {
    return (
      <PinnableStat
        key={pin}
        statname={pin}
        handleClicked={props.handleUnpin}
        showTip={true}
      />
    );
  });
  return <div className="hint_header">{pinnablestats}</div>;
}

export default RankHintHeaderBar;
