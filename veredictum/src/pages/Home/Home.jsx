import { Link } from 'react-router-dom';
import './Home.css';
import efeito from './../../assets/svg/efeito.svg';
import logo from './../../assets/svg/logo_veredictum.svg';
import imgHome from './../../assets/img/img-home.jpeg'; 

export default function Home() {
  return (
    <div className="home-card">
      <div className="home-info">
        <img src={efeito} alt="Efeito decorativo" />

        <div className="logo-row">
          <img src={logo} alt="Veredictum" />
          <span className="logo-title">Veredictum</span>
        </div>

        <div className="home-boas-vindas">
          <p className="boas-vindas">Boas-Vindas</p>
          <p className="subtitle">Veredictum: Gestão do Escritório de Advocacia</p>
          <div className="divider"></div>
          <p>Para acessar a plataforma, cadastre-se ou faça login com a conta existente</p>
        </div>

        <div className="button-row">
          <a href="/login"><button className="login-btn">Login</button></a>
          <a href="./pages/Cadastro/Cadastro.jsx"><button className="cadastro-btn">Cadastre-se</button></a>
        </div>
      </div>

      <div className="home-image">
        <img src={imgHome} alt="Prédio jurídico" />
      </div>
    </div>
  );
}

