import "./App.css";
import GuessBox from "./components/GuessBox";
import Title from "./components/Title";
import GuessArea from "./components/GuessArea";
import { useCallback, useState, useEffect } from "react";
import WinModal from "./components/WinModal";
import LoginModal from "./components/LoginModal";

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
  const [target, setTarget] = useState(null);
  const [username, setUsername] = useState(null);
  const [player, setPlayer] = useState(null);
  const [pinned, setPinned] = useState([
    "Area",
    "Population",
    "Real GDP per capita",
    "Gini Index coefficient - distribution of family income",
    "Obesity - adult prevalence rate",
  ]);

  const addPin = (name) => {
    setPinned((pinned) => {
      return pinned.includes(name) ? pinned : [...pinned, name];
    });
  };

  const removePin = (name) => {
    setPinned((pinned) =>
      pinned.filter((pin) => {
        return pin != name;
      })
    );
  };

  useEffect(() => {
    setPlayer((player) => {
      return { ...player, pins: pinned?.join(";") };
    });
  }, [pinned]);

  useEffect(() => {
    if (player?.name && player?.playerId) {
      fetch("http://localhost:5678/Player", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });
    }
  }, [player]);

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
      setTarget(responses[42]);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchCountriesHandler();
  }, [fetchCountriesHandler]);

  const addGuess = (guess) => {
    if (guess == target.country) {
      console.log("Yes!!");
    }
    setGuesses((guesses) =>
      guesses.includes(guess) ? guesses : [guess, ...guesses]
    );
  };

  const fetchPlayerHandler = async (name) => {
    const response = await fetch("http://localhost:5678/Player/" + name);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    console.log(response);
    const responseTxt = await response.text();
    if (responseTxt == "") {
      const newPlayer = {
        name: name,
        pins: "Area;Population;Real GDP per capita;Gini Index coefficient - distribution of family income;Obesity - adult prevalence rate",
      };
      const post = await fetch("http://localhost:5678/Player", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });
      setPinned(post?.pins?.split(";"));
      setPlayer(await post.json());
    } else {
      const responseObj = JSON.parse(responseTxt);
      setPinned(responseObj?.pins?.split(";"));
      setPlayer(responseObj);
    }
    setUsername(name);
  };

  return (
    <div className="App">
      <Title />
      <GuessBox countries={countries} guesses={guesses} addGuess={addGuess} />
      <GuessArea
        categories={categories}
        guesses={guesses}
        stats={stats}
        target={target}
        pinned={pinned}
        addPin={addPin}
        removePin={removePin}
      />
      <WinModal
        show={guesses.includes(target?.country)}
        answer={target?.country}
        num={guesses?.length}
        avg={"{avg}"}
        playerAvg={"{playerAvg}"}
        gameCount={"{gameCount}"}
      />
      <LoginModal show={username == null} handleLogin={fetchPlayerHandler} />
    </div>
  );
}

export default App;
