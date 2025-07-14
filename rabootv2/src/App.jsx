import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';
import ValidacaoCarregamento from './pages/ValidacaoCarregamento.jsx';
import ValidacaoDescarregamento from './pages/ValidacaoDescarregamento.jsx';
import AvariasCarregamento from './pages/AvariasCarregamento.jsx';
import AvariasDescarregamento from './pages/AvariasDescarregamento.jsx';
import Verificacao from './pages/Verificacao.jsx'; // <-- Importa a nova página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/carregamento" element={<ValidacaoCarregamento />} />
        <Route path="/descarregamento" element={<ValidacaoDescarregamento />} />
        <Route path="/avarias-carregamento" element={<AvariasCarregamento />} />
        <Route path="/avarias-descarregamento" element={<AvariasDescarregamento />} />
        <Route path="/verificacao" element={<Verificacao />} /> {/* <-- Adiciona a nova rota */}
      </Routes>
    </Router>
  );
}

export default App;