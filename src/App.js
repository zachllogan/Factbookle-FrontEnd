import "./App.css";
import GuessBox from "./components/GuessBox";
import Title from "./components/Title";
import GuessArea from "./components/GuessArea";
import { useCallback, useState, useEffect } from "react";

function App() {
  const categories = [
    "Geography",
    "People and Society",
    "Environment",
    "Economy",
    "Energy",
    "Communications",
    "Transportation",
    "Military and Security",
  ];
  const [stats, setStats] = useState([]);
  const [countries, setCountries] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const fetchCountriesHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5678/Country/all");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responses = await response.json();

      setStats(responses);
      setCountries(
        responses.map((stat) => {
          return stat.country;
        })
      );
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchCountriesHandler();
  }, [fetchCountriesHandler]);

  const addGuess = (guess) => {
    setGuesses((guesses) => [...guesses, guess]);
  };

  return (
    <div className="App">
      <Title />
      <GuessBox countries={countries} addGuess={addGuess} />
      <GuessArea
        categories={categories}
        guesses={guesses}
        stats={stats}
        target={stats.length > 0 ? stats[68] : null}
      />
    </div>
  );
}

export default App;
