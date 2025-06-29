import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Verificacao from './pages/Verificacao';
import ValidacaoCarga from './pages/ValidacaoCarga';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Verificacao />} />
      <Route path="/validacao-carga" element={<ValidacaoCarga />} />
    </Routes>
  );
}
