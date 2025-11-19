import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import VisaoGeral from './pages/VisaoGeral/VisaoGeral.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PainelControle from "./pages/PainelControle/PainelControle.jsx";
import GestaoDespesas from './pages/GestadoDespesas/GestaoDespesas.jsx';
import NotasFiscais from './pages/NotasFiscais/NotasFiscais.jsx';
import Clientes from './pages/Clientes/Clientes.jsx';
import Agenda from './pages/Agenda/Agenda.jsx';
import Login from './pages/Login/Login.jsx';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha.jsx';
import LogEnvioEmail from './pages/LogEnvioEmail/LogEnvioEmail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha/>} />
        <Route path="/VisaoGeral" element={<VisaoGeral />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PainelControle" element={<PainelControle />} />
        <Route path="/GestaoDespesas" element={<GestaoDespesas />} />
        <Route path="/NotasFiscais" element={<NotasFiscais />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Agenda" element={<Agenda />} />
        <Route path="/LogEnvioEmail" element={<LogEnvioEmail />} />
      </Routes>
    </Router>
  );
}

export default App;