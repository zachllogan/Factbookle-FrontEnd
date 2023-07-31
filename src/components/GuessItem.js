import { useEffect, useRef, useState } from "react";
import "../styles/GuessItem.css";
import RankHintFull from "./RankHintFull";
import RankHintSm from "./RankHintSm";
import TipDiv from "./TipDiv";

function GuessItem(props) {
  var content;
  var nameRef = useRef();

  if (!props.expanded) {
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
                    description={stat?.statType.description}
                  />
                );
              })}
          </div>
        </div>
      );
    });
  }

  const handleNameClicked = () => {
    if (props.expanded) {
      props.expandGuess("", null);
    } else {
      props.expandGuess(props.guess?.country);
    }
  };

  useEffect(() => {
    if (props.expanded) {
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [props.expanded]);

  return (
    <div className={"guess_item" + (props.expanded ? " expanded" : "")}>
      <TipDiv tipText={props.guess?.country} overflowRef={nameRef}>
        <div
          className={
            "guess_name" +
            (props.guess?.country == props.target?.country ? " correct" : "")
          }
          onClick={handleNameClicked}
          ref={nameRef}
        >
          {props.count + ". " + props.guess?.country}
        </div>
      </TipDiv>
      <div className="guess_content">{content}</div>
    </div>
  );
}

export default GuessItem;
