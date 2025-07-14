import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { motoristas, viagens } from '../data/database.jsx';
import './ValidacaoCarregamento.css';

export default function ValidacaoCarregamento() {
  // O state agora inclui todos os campos necessários
  const [form, setForm] = useState({
    matriculaMotorista: '',
    nomeMotorista: '',
    cnh: '',
    cpf: '',
    empresa: '',
    caminhao: '', // Adicionado conforme solicitado
    placaCarreta: '',
    tipoVeiculo: '',
    tipoCarga: '', // Adicionado conforme solicitado
    tipoOperacao: 'Aguardando Matrícula...',
    destino: '',
    quantidadePaletes: '',
  });

  // Busca dados do motorista e da viagem na base de dados central
  const handleMatriculaChange = (e) => {
    const matricula = e.target.value;
    setForm(prev => ({ ...prev, matriculaMotorista: matricula }));

    const motoristaEncontrado = motoristas.find(m => m.matricula === matricula);
    const viagemEncontrada = viagens.find(v => v.matriculaMotorista === matricula && v.tipoOperacao === 'Carregamento');

    if (motoristaEncontrado && viagemEncontrada) {
      setForm(prev => ({
        ...prev,
        nomeMotorista: motoristaEncontrado.nome,
        cnh: motoristaEncontrado.cnh,
        cpf: motoristaEncontrado.cpf,
        empresa: viagemEncontrada.empresa,
        caminhao: viagemEncontrada.tipoVeiculo, // Usando tipoVeiculo como "caminhão"
        placaCarreta: viagemEncontrada.placaCarreta,
        tipoVeiculo: viagemEncontrada.tipoVeiculo,
        tipoCarga: 'Produto Acabado', // Exemplo, pode vir da viagem também
        tipoOperacao: viagemEncontrada.tipoOperacao,
        destino: viagemEncontrada.destino,
        quantidadePaletes: viagemEncontrada.quantidadePaletes,
      }));
    } else {
      // Limpa todos os campos se não encontrar
      setForm({
        matriculaMotorista: matricula,
        nomeMotorista: '', cnh: '', cpf: '', empresa: '', caminhao: '', placaCarreta: '',
        tipoVeiculo: '', tipoCarga: '', tipoOperacao: matricula ? 'Viagem não encontrada' : 'Aguardando Matrícula...',
        destino: '', quantidadePaletes: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Validação de Carregamento enviada com sucesso!');
    console.log("Dados do Formulário:", form);
  };

  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Val. Carregamento">
          <Link to="/" className="nav-link">Menu</Link>
        </Navbar>
        <div className="container-validacao">
          <form className="form-validacao" onSubmit={handleSubmit}>
            <h2>Identificação da Viagem</h2>
            
            <label>Matrícula do Motorista:</label>
            <input type="text" name="matriculaMotorista" value={form.matriculaMotorista} onChange={handleMatriculaChange} placeholder="Digite a matrícula para buscar" required />
            
            <label>Nome do motorista:</label>
            <input type="text" name="nomeMotorista" value={form.nomeMotorista} readOnly />
            
            <label>CNH do motorista:</label>
            <input type="text" name="cnh" value={form.cnh} readOnly />

            <label>CPF do motorista:</label>
            <input type="text" name="cpf" value={form.cpf} readOnly />

            <label>Empresa:</label>
            <input type="text" name="empresa" value={form.empresa} readOnly />

            <label>Caminhão:</label>
            <input type="text" name="caminhao" value={form.caminhao} readOnly />
            
            <label>Placa da Carreta:</label>
            <input type="text" name="placaCarreta" value={form.placaCarreta} readOnly />

            <label>Tipo de carga:</label>
            <input type="text" name="tipoCarga" value={form.tipoCarga} readOnly />

            <label>Tipo de Operação:</label>
            <input type="text" name="tipoOperacao" value={form.tipoOperacao} readOnly />
            
            <div className="form-actions">
              <button type="submit" className="btn-submit">Confirmar Validação</button>
            </div>
          </form>

          <div className="checklist-actions">
            <p>Veículo possui não conformidades?</p>
            <Link to="/avarias-carregamento" className="btn-secondary">
              Registrar Avarias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}