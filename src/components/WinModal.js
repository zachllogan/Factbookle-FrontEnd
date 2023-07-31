import "../styles/WinModal.css";
import Modal from "./Modal";

function WinModal(props) {
  return (
    <Modal className="win_dialog" show={props.show}>
      <div>Congradulations!</div>
      <div>
        You got the answer, <span>{props.answer}</span>, in {props.num} guesses
      </div>
      <div>The average number of guesses for this game is {props.avg}</div>
      <div>
        Your average number of guesses over {props.gameCount} is{" "}
        {props.playerAvg}
      </div>
    </Modal>
  );
}

export default WinModal;
