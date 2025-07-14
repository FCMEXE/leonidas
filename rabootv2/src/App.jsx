import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Verificacao from './pages/Verificacao';
import Avarias from './pages/Avarias';
import ValidacaoCarregamento from './pages/ValidacaoCarregamento';
import ValidacaoDescarregamento from './pages/ValidacaoDescarregamento'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Verificacao />} />
      <Route path="/avarias" element={<Avarias />} />

            <Route path="/carregamento" element={<ValidacaoCarregamento />} />
            <Route path="/descarregamento" element={<ValidacaoDescarregamento />} />
    </Routes>
  );
}
