import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Verificacao from './pages/Verificacao';
import ValidacaoCarga from './pages/ValidacaoCarga';
import Avarias from './pages/Avarias';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Verificacao />} />
      <Route path="/validacao-carga" element={<ValidacaoCarga />} />
      <Route path="/avarias" element={<Avarias />} />
    </Routes>
  );
}
