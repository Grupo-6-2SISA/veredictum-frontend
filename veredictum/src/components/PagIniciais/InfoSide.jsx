import { Link } from "react-router-dom";
import logo from "./../../assets/svg/logo_veredictum.svg";
import voltarIcon from "./../../assets/img/voltar-icon.png";

function InfoSide({ children }) {
  return (
    <>
      <div className="back-button">
        <Link to="/">
          <img src={voltarIcon} alt="Voltar" />
        </Link>
      </div>

      <div className="logo-section">
        <img src={logo} alt="Veredictum" className="logo" />
        <span className="spanLogo">Veredictum</span>
        <p>Gestão do Escritório de Advocacia</p>
      </div>

      {children}
    </>
  );
}

export default InfoSide;
