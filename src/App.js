import "./App.css";
import GuessBox from "./components/GuessBox";
import Title from "./components/Title";
import GuessArea from "./components/GuessArea";
import { useCallback, useState, useEffect } from "react";
import WinModal from "./components/WinModal";
import LoginModal from "./components/LoginModal";
import Modal from "./components/Modal";
import Logo from "./components/Logo";

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
  const [player, setPlayer] = useState(null);
  const [pinned, setPinned] = useState([
    "Area",
    "Population",
    "Real GDP per capita",
    "Gini Index coefficient - distribution of family income",
    "Obesity - adult prevalence rate",
  ]);
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState(null);
  const [game, setGame] = useState(null);

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

  useEffect(() => {
    setGame((game) => {
      return {
        ...game,
        guesses: guesses.map((guess, i) => {
          return { country: guess, guessOrder: i, gameId: game.gameId };
        }),
        numGuesses: guesses.length,
      };
    });
  }, [guesses]);

  useEffect(() => {
    if (game?.matchId && game?.playerId && game?.guesses) {
      console.log(game);
      fetch("http://localhost:5678/Game", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
    }
  }, [game]);

  const init = useCallback(async () => {
    try {
      //Get Country Data
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

      //Get Match Data
      const matchResponse = await fetch("http://localhost:5678/Match/all");
      if (!matchResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const MatchResponses = await matchResponse.json();
      const today = new Date().toISOString().slice(0, 10);
      const foundMatch = MatchResponses?.find((match) => {
        return match.date == today;
      });
      //Load found match data
      if (foundMatch) {
        setMatch(foundMatch);
        setTarget(
          responses.find((x) => {
            return x.country == foundMatch.country;
          })
        );
      }
      //Add new match if not present for the day
      else {
        const countiresLeft = responses.filter((x) => {
          return !MatchResponses?.find((match) => {
            return match.country == x.country;
          });
        });
        const randCountry =
          countiresLeft[Math.floor(Math.random() * countiresLeft.length)]
            .country;
        const newMatch = { date: today, country: randCountry };
        const post = await fetch("http://localhost:5678/Match", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMatch),
        });
        const postResponse = await post.json();
        setMatch(post);
        setTarget(
          responses.find((x) => {
            return x.country == post.country;
          })
        );
      }

      //Loading is finished
      setLoading(false);
    } catch (error) {}
  }, []);

  useEffect(() => {
    init();
  }, []);

  const addGuess = (guess) => {
    setGuesses((guesses) =>
      guesses.includes(guess) ? guesses : [guess, ...guesses]
    );
  };

  const fetchPlayerHandler = async (name) => {
    setLoading(true);
    //Fetch player from the name
    const response = await fetch("http://localhost:5678/Player/" + name);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseTxt = await response.text();
    var playerId = -1;

    //If no player registered under that name make one with default pins
    //And set the player & start pins
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
      const postResponse = await post.json();
      //setPinned should be before setPlayer because it  will trigger a player post otherwise
      setPinned(postResponse?.pins?.split(";"));
      setPlayer(postResponse);
      playerId = postResponse.playerId;
    }
    //Otherwise just update pins & player
    else {
      const responseObj = JSON.parse(responseTxt);
      setPinned(responseObj?.pins?.split(";"));
      setPlayer(responseObj);
      playerId = responseObj.playerId;
    }

    //Fetch the game associated with the current match & player
    const gameResponse = await fetch(
      "http://localhost:5678/Game/" + match?.matchId + "/" + playerId
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const gameResponseTxt = await gameResponse.text();
    //If there is no game record create one and update the game variable
    if (gameResponseTxt == "") {
      const newGame = {
        playerId: playerId,
        matchId: match?.matchId,
        numGuesses: 0,
      };
      console.log("before Post");
      const post = await fetch("http://localhost:5678/Game", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      const postResponse = await post.json();
      console.log("after Post");
      setGame(postResponse);
    }
    //Otherwise just update the game
    else {
      const responseObj = JSON.parse(gameResponseTxt);
      setGuesses(
        responseObj.guesses.map((guess) => {
          return guess.country;
        })
      );
      setGame(responseObj);
    }

    setLoading(false);
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
        matchId={match?.matchId}
        playerId={player?.playerId}
      />
      <LoginModal
        show={!loading && player?.name == null}
        handleLogin={fetchPlayerHandler}
      />
      <Modal className="clear" show={loading}>
        <Logo />
      </Modal>
    </div>
  );
}

export default App;
