import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperarSenha" element={<RecuperarSenha/>} />

      {/* Rotas protegidas */}
      <Route path="/VisaoGeral" element={
        <ProtectedRoute>
          <VisaoGeral />
        </ProtectedRoute>
      } />
      <Route path="/Dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/PainelControle" element={
        <ProtectedRoute requireAdmin={true}>
          <PainelControle />
        </ProtectedRoute>
      } />
      <Route path="/GestaoDespesas" element={
        <ProtectedRoute>
          <GestaoDespesas />
        </ProtectedRoute>
      } />
      <Route path="/NotasFiscais" element={
        <ProtectedRoute>
          <NotasFiscais />
        </ProtectedRoute>
      } />
      <Route path="/Clientes" element={
        <ProtectedRoute>
          <Clientes />
        </ProtectedRoute>
      } />
      <Route path="/Agenda" element={
        <ProtectedRoute>
          <Agenda />
        </ProtectedRoute>
      } />
      <Route path="/LogEnvioEmail" element={
        <ProtectedRoute>
          <LogEnvioEmail />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;