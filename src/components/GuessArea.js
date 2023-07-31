import { useState } from "react";
import GuessItem from "./GuessItem";
import RankHintHeaderBar from "./RankHintHeaderBar";

function GuessArea(props) {
  const [expandedGuess, setExpandedGuess] = useState("");

  const guesses = props.guesses?.map((guess, i) => {
    const guessStats = props.stats?.find((stat) => {
      return stat?.country == guess;
    });
    return (
      <GuessItem
        key={guess}
        guess={guessStats}
        target={props.target}
        pinned={props.pinned}
        categories={props.categories}
        handlePin={props.addPin}
        expanded={guess == expandedGuess}
        expandGuess={setExpandedGuess}
        count={props.guesses.length - i}
      />
    );
  });
  return (
    <div>
      <RankHintHeaderBar pinned={props.pinned} handleUnpin={props.removePin} />
      {guesses}
    </div>
  );
}

export default GuessArea;
