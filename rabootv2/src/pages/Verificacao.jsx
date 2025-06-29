import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const motoristas = [
  { cnh: '123456', cpf: '11122233344', nome: 'João Silva', caminhao: 'Truck 01', tipoCarga: 'Carga seca', empresa: 'GP Log' },
  { cnh: '987654', cpf: '55566677788', nome: 'Maria Souza', caminhao: 'Carreta 02', tipoCarga: 'Sider', empresa: 'Comado' },
  // adicione mais motoristas conforme necessário
];

export default function Verificacao() {
  const [doc, setDoc] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carroceria, setCarroceria] = useState('');

  const verificar = () => {
    const encontrado = motoristas.find(m => m.cnh === doc || m.cpf === doc);
    setResultado(encontrado || false);
  };

  return (
    <>
      <Navbar 
        titulo="GP LOG" 
        linkTexto="Ir para Validação de Carga" 
        linkDestino="/validacao-carga" 
      />

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>
        <p><strong>Observação Cadastro Cliente:</strong> AS e tipo de Caminhão que atende ele. Tipo carroceria para AS - truck sider e carreta sider.</p>

        <input
          type="text"
          placeholder="Digite CNH ou CPF"
          value={doc}
          onChange={e => setDoc(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem', fontSize: '1rem' }}
        />

        <select
          value={carroceria}
          onChange={e => setCarroceria(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem', fontSize: '1rem' }}
        >
          <option value="">Selecione o tipo de carroceria</option>
          <option value="Truck Sider">Truck Sider</option>
          <option value="Carreta Sider">Carreta Sider</option>
          <option value="Baú">Baú</option>
          <option value="Graneleiro">Graneleiro</option>
          <option value="Prancha">Prancha</option>
        </select>

        <button 
          onClick={verificar} 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Verificar
        </button>

        {resultado && resultado !== false && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#222', color: '#ccc', borderRadius: '6px' }}>
            <h2>Informações do Motorista</h2>
            <p><strong>Nome:</strong> {resultado.nome}</p>
            <p><strong>Caminhão:</strong> {resultado.caminhao}</p>
            <p><strong>Tipo de carga:</strong> {resultado.tipoCarga}</p>
            <p><strong>Empresa:</strong> {resultado.empresa}</p>
            <p><strong>Carroceria selecionada:</strong> {carroceria || 'Nenhuma'}</p>
          </div>
        )}

        {resultado === false && (
          <p style={{ marginTop: '1rem', color: 'red' }}>CNH ou CPF não encontrado.</p>
        )}
      </div>
    </>
  );
}
