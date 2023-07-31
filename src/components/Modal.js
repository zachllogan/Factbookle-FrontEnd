import "../styles/Modal.css";

function Modal(props) {
  return (
    <div
      className="modal_shroud"
      style={{ visibility: props.show ? "visible" : "hidden" }}
    >
      <div className={"modal " + (props.className ? props.className : "")}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
