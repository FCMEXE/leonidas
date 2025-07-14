import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Você precisa ter esse componente
import { motoristas } from '../data/motoristas';
import './ValidacaoCarregamento.css'; // Importa o novo CSS

export default function ValidacaoCarregamento() {
  const [form, setForm] = useState({
    matriculaConferente: '',
    cnh: '',
    cpf: '',
    nomeMotorista: '',
    caminhao: '',
    tipoCarga: '',
    empresa: '',
    // outros campos específicos de carregamento aqui...
  });

  function handleMatriculaChange(e) {
    const matricula = e.target.value;
    setForm(prev => ({ ...prev, matriculaConferente: matricula }));

    const motorista = motoristas.find(m => m.matricula === matricula);

    if (motorista) {
      setForm(prev => ({
        ...prev,
        cnh: motorista.cnh || '',
        cpf: motorista.cpf || '',
        nomeMotorista: motorista.nome || '',
        caminhao: motorista.caminhao || '',
        tipoCarga: motorista.tipoCarga || '',
        empresa: motorista.empresa || '',
      }));
    } else {
      setForm(prev => ({
        ...prev,
        cnh: '',
        cpf: '',
        nomeMotorista: '',
        caminhao: '',
        tipoCarga: '',
        empresa: '',
      }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Carregamento enviado!');
    console.log(form);
  }

  return (
    // Adicionamos a estrutura do celular aqui
    <div className="mobile-frame">
      <div className="mobile-screen">
        {/* Seu componente Navbar precisa ser adaptado para usar as classes CSS */}
        <Navbar titulo="Validação de Carregamento" linkTexto="Voltar" linkDestino="/" />
        
        <div className="container-validacao">
          <form onSubmit={handleSubmit}>

            <label>Matrícula do Motorista:</label>
            <input
              type="text"
              name="matriculaConferente"
              value={form.matriculaConferente}
              onChange={handleMatriculaChange}
              placeholder="Digite matrícula para buscar"
              required
            />

            <label>Nome do motorista - SAP:</label>
            <input type="text" name="nomeMotorista" value={form.nomeMotorista} readOnly />

            <label>CNH do motorista:</label>
            <input type="text" name="cnh" value={form.cnh} readOnly />

            <label>CPF do motorista:</label>
            <input type="text" name="cpf" value={form.cpf} readOnly />

            <label>Caminhão:</label>
            <input type="text" name="caminhao" value={form.caminhao} readOnly />

            <label>Tipo de carga:</label>
            <input type="text" name="tipoCarga" value={form.tipoCarga} readOnly />

            <label>Empresa:</label>
            <input type="text" name="empresa" value={form.empresa} readOnly />

            {/* Outros campos específicos do carregamento */}

            <button type="submit" className="btn-submit">Enviar Carregamento</button>
          </form>
        </div>
      </div>
    </div>
  );
}