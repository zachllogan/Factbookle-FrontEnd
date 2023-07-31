import { useRef } from "react";
import "../styles/LoginModal.css";
import Modal from "./Modal";

function LoginModal(props) {
  const loginRef = useRef();

  const handleLogin = () => {
    if (loginRef?.current?.value != "") {
      props.handleLogin(loginRef?.current?.value);
    }
  };

  const handleEnter = (event) => {
    //enter key
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <Modal className="login_dialog" show={props.show}>
      <div>
        <label>Enter Username: </label>
        <input className="login_box" ref={loginRef} onKeyDown={handleEnter} />
      </div>

      <button className="button login_button" onClick={handleLogin}>
        Login
      </button>
    </Modal>
  );
}

export default LoginModal;
