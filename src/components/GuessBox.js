import { useRef, useState } from "react";
import "../styles/GuessBox.css";

function GuessBox(props) {
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  const handleChange = (event) => {
    const text = event.target.value.toLowerCase();
    const possibles = props.countries.filter((country) => {
      return country.toLowerCase().includes(text);
    });
    if (possibles.length <= 5) {
      setSuggestions(possibles);
    } else {
      setSuggestions([]);
    }
  };

  const handleEnter = (event) => {
    //enter key
    if (event.keyCode === 13) {
      const text = event.target.value.toLowerCase();
      const possibles = props.countries.filter((country) => {
        return country.toLowerCase().includes(text);
      });
      const match = props.countries.find((country) => {
        return country.toLowerCase() == text;
      });
      if (match) {
        props.addGuess(match);
        inputRef.current.value = "";
        setSuggestions([]);
      } else if (possibles.length == 1) {
        props.addGuess(possibles[0]);
        inputRef.current.value = "";
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClicked = (event) => {
    const text = event.target.innerText;
    setSuggestions([]);
    inputRef.current.value = "";
    props.addGuess(text);
  };

  const suggestionItems = suggestions.map((suggestion) => {
    return (
      <div
        key={suggestion}
        className={
          props.guesses.includes(suggestion) ? "guessed_suggestion" : ""
        }
        onClick={handleSuggestionClicked}
      >
        {suggestion}
      </div>
    );
  });

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        className="guess_box"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <div
        className="suggestion_box"
        style={{ visibility: suggestions.length == 0 ? "hidden" : "unset" }}
      >
        {suggestionItems}
      </div>
    </div>
  );
}

export default GuessBox;
