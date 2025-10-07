import { Link } from 'react-router-dom';
import "./Cadastro.css";
import logo from './../../assets/svg/logo_veredictum.svg';
import voltarIcon from './../../assets/img/voltar-icon.png';

function Cadastro() {
  return (
    <div className="cadastro-container">
      <div className="left-side">
        <div className="login-content">
          <h2>Já tem uma conta?</h2>
          <h3>Faça login aqui</h3>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>

      <div className="right-side">
        <div className="back-button">
          <Link to="/">
            <img src={voltarIcon} alt="Voltar" />
          </Link>
        </div>

        <div className="logo-section">
          <img src={logo} alt="Veredictum" className="logo" />
          <h1>Veredictum</h1>
          <p>Gestão do Escritório de Advocacia</p>
        </div>

        <form className="register-form">
          <div className="form-field">
            <label>Nome</label>
            <input type="text" placeholder="Nome" />
          </div>
          <div className="form-field">
            <label>E-mail</label>
            <input type="email" placeholder="E-mail" />
          </div>
          <div className="form-field">
            <label>Senha</label>
            <input type="password" placeholder="Senha" />
          </div>
          <button type="submit" className="register-button"  onClick={() =>navigate ('/VisaoGeral')}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;

