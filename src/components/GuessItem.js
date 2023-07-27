import { useState } from "react";
import "../styles/GuessItem.css";
import RankHintFull from "./RankHintFull";
import RankHintSm from "./RankHintSm";

function GuessItem(props) {
  const [expanded, setExpanded] = useState(false);
  var content;

  if (!expanded) {
    content = props.pinned.map((pin) => {
      const guessRank = props.guess?.stats.find((stat) => {
        return stat?.statType.name == pin;
      })?.ranking;
      const targetRank = props.target?.stats.find((stat) => {
        return stat?.statType.name == pin;
      })?.ranking;
      return (
        <RankHintSm
          key={pin}
          rank={guessRank}
          diff={guessRank && targetRank ? targetRank - guessRank : null}
        />
      );
    });
  } else {
    content = props.categories.map((category) => {
      return (
        <div key={category}>
          <div className="category_label">{category}</div>
          <div>
            {props.guess?.stats
              .filter((stat) => {
                return stat?.statType.category == category;
              })
              .map((stat) => {
                const targetRank = props.target?.stats.find((statT) => {
                  return statT?.statType.name == stat?.statType.name;
                })?.ranking;
                return (
                  <RankHintFull
                    key={stat.statType.name}
                    statname={stat.statType.name}
                    rank={stat?.ranking}
                    stat={stat?.value}
                    diff={
                      stat?.ranking && targetRank
                        ? targetRank - stat?.ranking
                        : null
                    }
                    unit={stat.statType.unit}
                    handlePin={props.handlePin}
                  />
                );
              })}
          </div>
        </div>
      );
    });
  }

  const handleNameClicked = () => {
    setExpanded((expanded) => !expanded);
    //props.unexpandOthers(props.guess?.country);
  };

  return (
    <div className={"guess_item" + (expanded ? " expanded" : "")}>
      <div className="guess_name" onClick={handleNameClicked}>
        {props.guess?.country}
      </div>
      <div className="guess_content">{content}</div>
    </div>
  );
}

export default GuessItem;
