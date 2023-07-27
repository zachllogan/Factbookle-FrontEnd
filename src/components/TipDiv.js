import { useState } from "react";
import "../styles/TipDiv.css";

function TipDiv(props) {
  const [showTip, setShowTip] = useState(false);

  const handleShowTip = () => {
    setShowTip(true);
  };
  const handleHideTip = () => {
    setShowTip(false);
  };

  const shouldShowTip = () => {
    if (
      !props?.tipText ||
      (props?.overflowRef &&
        props?.overflowRef?.current?.clientWidth >=
          props?.overflowRef?.current?.scrollWidth)
    ) {
      return false;
    }
    return showTip;
  };

  return (
    <div
      className={"tipdiv" + (props.className ? " " + props.className : "")}
      onMouseEnter={handleShowTip}
      onMouseLeave={handleHideTip}
    >
      {props.children}
      <div
        className={"tip" + (props.rightSide ? " right_side" : "")}
        style={{ visibility: shouldShowTip() ? "visible" : "hidden" }}
      >
        {props.tipText}
      </div>
    </div>
  );
}

export default TipDiv;
