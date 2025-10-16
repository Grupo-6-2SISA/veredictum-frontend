import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import VisaoGeral from './pages/VisaoGeral/VisaoGeral.jsx';
// import Clientes from './pages/Clientes/Clientes.jsx';
import Agenda from './pages/Agenda/Agenda.jsx';
import Login from './pages/Login/Login.jsx';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha/>} />
        <Route path="/VisaoGeral" element={<VisaoGeral />} />
        {/* <Route path="/Clientes" element={<Clientes />} /> */}
        <Route path="/Agenda" element={<Agenda />} />
      </Routes>
    </Router>
  );
}

export default App;