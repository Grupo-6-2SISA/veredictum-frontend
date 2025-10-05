// import { useNavigate } from 'react-router-dom';
// import './Home.css';
// import efeito from './../../assets/svg/efeito.svg';
// import logo from './../../assets/svg/logo_veredictum.svg';
// import imgHome from './../../assets/img/img-home.jpeg'; 

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-card">
//       <div className="home-info">
//         <img src={efeito} alt="Efeito decorativo" />

//         <div className="logo-row">
//           <img src={logo} alt="Veredictum" />
//           <span className="logo-title">Veredictum</span>
//         </div>

//         <div className="home-boas-vindas">
//           <p className="boas-vindas">Boas-Vindas</p>
//           <p className="subtitle">Veredictum: Gestão do Escritório de Advocacia</p>
//           <div className="divider"></div>
//           <p>Para acessar a plataforma, cadastre-se ou faça login com a conta existente</p>
//         </div>

//         <div className="button-row">
//           <a ><button onClick={() =>navigate ('/login')} className="btn-login">Login</button></a>
//           <a><button onClick={() =>navigate ('/cadastro')} className="btn-cadastro">Cadastre-se</button></a>
//         </div>
//       </div>

//       <div className="home-image">
//         <img src={imgHome} alt="Prédio jurídico" />
//       </div>
//     </div>
//   );
// }

// 

import { useNavigate } from 'react-router-dom';
import efeito from './../../assets/svg/efeito.svg';
import logo from './../../assets/svg/logo_veredictum.svg';
import imgHome from './../../assets/img/img-home.jpeg';
import "./Home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#222] flex items-center justify-center p-6">

      <div className="w-full max-w-[1400px] bg-white rounded-lg flex flex-col lg:flex-row h-auto lg:h-[600px] shadow-lg">
        
        <div className="w-full h-full lg:w-1/2 flex flex-col pt-8 pb-8">
          <img src={efeito} alt="Efeito decorativo" className="w-24" />

          <div className="flex items-center mt-6 ml-6 lg:ml-[60px]">
            <img
              src={logo}
              alt="Veredictum"
              className="w-1/4 lg:w-1/5 h-auto mr-[-20px] lg:mr-[-40px]"
            />
            <span className="text-xl font-bold text-[#222]">Veredictum</span>
          </div>

          <div className="flex flex-col space-y-6 pl-0 lg:pl-16 mr-4">
            <p className="text-3xl lg:text-[2.5rem] font-bold text-[#222] leading-[100%]">
              Boas-Vindas
            </p>
            <p className="text-[#555] text-base lg:text-lg">
              Veredictum: Gestão do Escritório de Advocacia
            </p>

            {/* divider matches vanilla: 180px x 8px */}
            <div className="w-[180px] h-2 lg:h-2 bg-[#FFC300] rounded" />

            <p className="text-[#333]">
              Para acessar a plataforma, cadastre-se ou faça login com a conta existente
            </p>

            <div className="flex gap-[8px] ml-[60px] mt-[40px]">
              <button
                onClick={() => navigate('/login')}
                className="bg-[#111] text-white px-8 lg:px-10 py-9 lg:py-4 rounded-xl shadow hover:bg-[#d1d1d1] hover:text-black transition"
                style={{ height: '64px' }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/cadastro')}
                className="bg-white border-2 border-[#222] text-[#222] w-full lg:w-48 rounded-xl shadow hover:bg-[#616161] hover:text-white transition flex items-center justify-center"
                style={{ height: '64px' }}
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200/60 my-auto" />

        <div className="w-full lg:w-1/2 bg-[#DDE1E6] flex justify-center items-center rounded-b-lg lg:rounded-r-lg p-6 lg:p-0">
          <img
            src={imgHome}
            alt="Prédio jurídico"
            className="w-[90%] h-[90%] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;