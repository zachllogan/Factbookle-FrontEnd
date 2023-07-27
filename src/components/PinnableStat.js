import { useRef } from "react";
import "../styles/PinnableStat.css";
import TipDiv from "./TipDiv";

function PinnableStat(props) {
  const nameRef = useRef();

  const handleClicked = () => {
    props.handleClicked(props.statname);
  };

  return (
    <TipDiv tipText={props.statname} overflowRef={nameRef}>
      <div className="pinnable_stat">
        <button className="pin" onClick={handleClicked}>
          &#128392;
        </button>
        <div className="stat_name" ref={nameRef}>
          {props.statname}
        </div>
      </div>
    </TipDiv>
  );
}

export default PinnableStat;
