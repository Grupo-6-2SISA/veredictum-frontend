import { Link } from 'react-router-dom';
import "./Cadastro.css";
import logo from './../../assets/svg/logo_veredictum.svg';
import voltarIcon from './../../assets/img/voltar-icon.png';
import imgCadastro from './../../assets/img/img-cadastro.png';

function Cadastro() {
 return (
    <>
      <div id="alert-container"></div>

      <div className="cadastro-image">
        <div className="image-text">
          <img src={imgCadastro} alt="" />
          <span className="subtitle-image">Já tem uma conta?</span>
          <span className="subtitle-image">Faça login aqui</span>
          <a href="./login.html" className="login-btn">Login</a>
        </div>
      </div>

      <div className="cadastro-info">
        <div className="voltar-icon">
          <a href="./home.html">
            <img src={voltarIcon} alt="Icone de voltar" />
          </a>
        </div>

        <div className="logo-row">
          <img src={logo} alt="Veredictum" />
          <span className="logo-title">Veredictum</span>
          <p className="subtitle-logo">Gestão do Escritório de Advocacia</p>
        </div>

        <form id="cadastro-form" className="login-form" noValidate>
          <div className="login-form-row">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" placeholder="Nome" required />
          </div>
          <div className="login-form-row">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="E-mail" required />
          </div>
          <div className="login-form-row">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" placeholder="Senha" required />
          </div>
          <button className="cadastro-btn" type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;

