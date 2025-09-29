import { useNavigate } from 'react-router-dom';
import './Home.css';
import efeito from './../../assets/svg/efeito.svg';
import logo from './../../assets/svg/logo_veredictum.svg';
import imgHome from './../../assets/img/img-home.jpeg'; 

export default function Home() {
  const navigate = useNavigate();

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
          <a ><button onClick={() =>navigate ('/login')} className="btn-login">Login</button></a>
          <a><button onClick={() =>navigate ('/cadastro')} className="btn-cadastro">Cadastre-se</button></a>
        </div>
      </div>

      <div className="home-image">
        <img src={imgHome} alt="Prédio jurídico" />
      </div>
    </div>
  );
}

