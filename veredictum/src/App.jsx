import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import VisaoGeral from './pages/VisaoGeral/VisaoGeral.jsx';
import Agenda from './pages/Agenda/Agenda.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/VisaoGeral" element={<VisaoGeral />} />
        <Route path="/Agenda" element={<Agenda />} />
      </Routes>
    </Router>
  );
}

export default App;