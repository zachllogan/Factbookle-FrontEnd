import { useRef } from "react";
import "../styles/PinnableStat.css";
import TipDiv from "./TipDiv";

function PinnableStat(props) {
  const nameRef = useRef();

  const handleClicked = () => {
    props.handleClicked(props.statname);
  };

  const content = (
    <div className="pinnable_stat">
      <button className="pin" onClick={handleClicked}>
        &#128392;
      </button>
      <div className="stat_name" ref={nameRef}>
        {props.statname}
      </div>
    </div>
  );

  return props.showTip ? (
    <TipDiv tipText={props.statname} overflowRef={nameRef}>
      {content}
    </TipDiv>
  ) : (
    content
  );
}

export default PinnableStat;
