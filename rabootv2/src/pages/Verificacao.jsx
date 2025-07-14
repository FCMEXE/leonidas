import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { motoristas, viagens } from '../data/database.jsx';
import './Verificacao.css';

export default function Verificacao() {
  const [doc, setDoc] = useState('');
  const [resultado, setResultado] = useState(null);
  const [verificado, setVerificado] = useState(false);

  const verificar = () => {
    // 1. Encontra o motorista pelo CNH ou CPF
    const motoristaEncontrado = motoristas.find(
      m => m.cnh === doc.trim() || m.cpf === doc.trim()
    );

    if (motoristaEncontrado) {
      // 2. Se encontrou o motorista, busca a viagem associada a ele
      const viagemEncontrada = viagens.find(
        v => v.matriculaMotorista === motoristaEncontrado.matricula
      );
      
      // 3. Combina os dados do motorista e da viagem em um único objeto
      const dadosCompletos = {
        ...motoristaEncontrado, // nome, cnh, cpf, matricula
        ...viagemEncontrada,   // placa, destino, tipoOperacao, etc.
      };
      setResultado(dadosCompletos);

    } else {
      setResultado(false);
    }

    setVerificado(true);
  };

  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Verificação">
          <Link to="/" className="nav-link">Menu</Link>
        </Navbar>
        <div className="container-verificacao">
            <h2>Consultar Motorista</h2>
            <p className="observacao">
              Digite o CNH ou CPF do motorista para consultar os dados da sua viagem atual.
            </p>
            <div className="grupo-verificacao">
                <input
                type="text"
                placeholder="Digite CNH ou CPF"
                value={doc}
                onChange={e => {
                    setDoc(e.target.value);
                    setVerificado(false);
                    setResultado(null);
                }}
                className="input-verificacao"
                />
                <button onClick={verificar} className="botao-verificar" disabled={!doc.trim()}>
                    Verificar
                </button>
            </div>

            {/* AQUI: Adicionamos mais campos ao card de resultado */}
            {verificado && resultado && (
                <div className="cartao-resultado" role="region" aria-live="polite">
                    <h3>Informações Encontradas</h3>
                    <p><strong>Nome:</strong> {resultado.nome}</p>
                    <p><strong>Matrícula:</strong> {resultado.matricula}</p>
                    <p><strong>CNH:</strong> {resultado.cnh}</p>
                    <p><strong>CPF:</strong> {resultado.cpf}</p>
                    <hr className="divisor" />
                    <p><strong>Empresa:</strong> {resultado.empresa || resultado.transportadora}</p>
                    <p><strong>Tipo de Operação:</strong> {resultado.tipoOperacao}</p>
                    <p><strong>Placa da Carreta:</strong> {resultado.placaCarreta}</p>
                    <p><strong>Tipo de Veículo:</strong> {resultado.tipoVeiculo}</p>
                    <p><strong>Origem:</strong> {resultado.origem || 'N/A'}</p>
                    <p><strong>Destino:</strong> {resultado.destino || 'N/A'}</p>
                    <p><strong>Paletes:</strong> {resultado.quantidadePaletes}</p>
                </div>
            )}

            {verificado && !resultado && (
                <p className="erro-verificacao" role="alert">CNH ou CPF não encontrado.</p>
            )}
        </div>
      </div>
    </div>
  );
}