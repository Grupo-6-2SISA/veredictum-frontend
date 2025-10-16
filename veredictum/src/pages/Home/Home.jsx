import { useNavigate } from 'react-router-dom';
import efeito from './../../assets/svg/efeito.svg';
import logo from './../../assets/svg/logo_vectorized.svg';
import imgHome from './../../assets/img/img-home.jpeg';
import "./Home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#222] flex items-center justify-center">

      <div className="w-full max-w-[1400px] bg-white rounded-lg flex flex-col lg:flex-row h-auto lg:h-[600px] shadow-lg">
        
        <div className="w-full h-full lg:w-1/2 flex flex-col">
          <img src={efeito} alt="Efeito decorativo" className="w-30" />

          <div className="logo-row flex items-start mb-3">
            <img
              src={logo}
              alt="Veredictum"
              className="w-1/10 lg:w-1/16 h-auto mr-20 lg:mr-6 "
            />
            <span className="text-xl font-bold text-[#222] flex items-center justify-center">Veredictum</span>
          </div>

          <div className="home-boas-vindas flex flex-col ml-4 gap-5">
            <p className="text-xl font-bold text-[#222]">
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
                className="btn-login  bg-[#111] text-white px-8 lg:px-10 py-5 lg:py-2 rounded-xl shadow hover:bg-[#d1d1d1] hover:text-black transition"
                style={{ height: '48px' }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/cadastro')}
                className="bg-white border-2 border-[#222] text-[#222] w-full lg:w-48 rounded-xl shadow hover:bg-[#616161] hover:text-white transition flex items-center justify-center"
                style={{ height: '48px' }}
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200/60 my-auto" />

        <div className="w-full lg:w-1/2 bg-[#DDE1E6] flex justify-center items-center rounded-b-lg lg:rounded-r-lg">
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