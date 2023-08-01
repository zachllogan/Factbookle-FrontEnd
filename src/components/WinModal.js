import { useCallback, useEffect, useState } from "react";
import "../styles/WinModal.css";
import Modal from "./Modal";

function WinModal(props) {
  const [avg, setAvg] = useState(-1);
  const [playerAvg, setPlayerAvg] = useState(-1);
  const [gameCount, setGameCount] = useState(-1);

  const fetchStats = useCallback(async (matchId, playerId) => {
    const response = await fetch(
      "http://localhost:5678/Game/stats/" + matchId + "/" + playerId
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responses = await response.json();
    setAvg(responses[0]);
    setPlayerAvg(responses[1]);
    setGameCount(responses[2]);
  }, []);

  useEffect(() => {
    if (props.matchId && props.playerId) {
      fetchStats(props.matchId, props.playerId);
    }
  }, [props.show]);

  return (
    <Modal className="win_dialog" show={props.show}>
      <div>Congradulations!</div>
      <div>
        You got the answer, <span>{props.answer}</span>, in {props.num} guesses
      </div>
      <div>The average number of guesses for this game is {avg}</div>
      <div>
        Your average number of guesses over {gameCount} games is {playerAvg}
      </div>
    </Modal>
  );
}

export default WinModal;
