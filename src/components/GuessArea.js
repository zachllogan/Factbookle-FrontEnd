import { useState } from "react";
import GuessItem from "./GuessItem";
import RankHintHeaderBar from "./RankHintHeaderBar";

function GuessArea(props) {
  const [pinned, setPinned] = useState([
    "Area",
    "Population",
    "Real GDP per capita",
    "Gini Index coefficient - distribution of family income",
    "Obesity - adult prevalence rate",
  ]);

  const addPin = (name) => {
    setPinned((pinned) => [...pinned, name]);
  };

  const removePin = (name) => {
    setPinned((pinned) =>
      pinned.filter((pin) => {
        return pin != name;
      })
    );
  };

  const guesses = props.guesses?.map((guess) => {
    const guessStats = props.stats?.find((stat) => {
      return stat?.country == guess;
    });
    return (
      <GuessItem
        key={guess}
        guess={guessStats}
        target={props.target}
        pinned={pinned}
        categories={props.categories}
        handlePin={addPin}
      />
    );
  });
  console.log(guesses);
  return (
    <div>
      <RankHintHeaderBar pinned={pinned} handleUnpin={removePin} />
      {guesses}
    </div>
  );
}

export default GuessArea;
