import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motoristas } from '../data/motoristas';  // <-- importa daqui
import './Verificacao.css';

export default function Verificacao() {
  const [doc, setDoc] = useState('');
  const [resultado, setResultado] = useState(null);
  const [verificado, setVerificado] = useState(false);

  const verificar = () => {
    const encontrado = motoristas.find(
      m => m.cnh === doc.trim() || m.cpf === doc.trim()
    );
    setResultado(encontrado || false);
    setVerificado(true);
  };

  return (
    <>
      <Navbar 
        titulo="GP LOG" 
        linkTexto="Checklist Descarregamento" 
        linkDestino="/validacao-carga" 
      />

      <div className="container">
        <p className="observacao">
          <strong>Observação Cadastro Cliente:</strong> AS e tipo de Caminhão que atende ele. Tipo carroceria para AS - truck sider e carreta sider.
        </p>

        <input
          type="text"
          placeholder="Digite CNH ou CPF"
          value={doc}
          onChange={e => {
            setDoc(e.target.value);
            setVerificado(false);
            setResultado(null);
          }}
          className="input"
        />

        <button onClick={verificar} className="botao" disabled={!doc.trim()}>
          Verificar
        </button>

        {verificado && resultado && resultado !== false && (
          <div className="cartao-resultado" role="region" aria-live="polite">
            <h2>Informações do Motorista</h2>
            <p><strong>Nome:</strong> {resultado.nome}</p>
            <p><strong>Caminhão:</strong> {resultado.caminhao}</p>
            <p><strong>Empresa:</strong> {resultado.empresa}</p>
            <p><strong>Placa da carreta:</strong> {resultado.placaCarreta}</p>
            <p><strong>Destino:</strong> {resultado.destino}</p>
            <p><strong>Tipo de operação:</strong> {resultado.tipoOperacao}</p>
          </div>
        )}

        {verificado && resultado === false && (
          <p className="erro" role="alert">CNH ou CPF não encontrado.</p>
        )}
      </div>
    </>
  );
}
