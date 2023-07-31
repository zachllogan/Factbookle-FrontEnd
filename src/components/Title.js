import "../styles/Title.css";
import Logo from "./Logo";

function Title(props) {
  return (
    <div className="title_area">
      <Logo />
      <h1 className="title">FACTBOOKLE</h1>
      <Logo />
    </div>
  );
}

export default Title;
