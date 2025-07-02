import React, { useState } from 'react';
import { motoristas } from '../data/motoristas';
import Navbar from '../components/Navbar';
import { conferentes } from '../data/conferentes';

import './ValidacaoCarga.css';

const transportadoras = ['Comado', 'GP Log', 'Transvidal', 'Transpak', 'Gfrente'];
const turnos = ['Manhã', 'Tarde', 'Noite'];
const destinos = ['Destino 1', 'Destino 2', 'Destino 3']; // ajuste conforme necessidade
const tipoVeiculos = ['Carga seca', 'Sider', 'Asa delta'];

export default function ValidacaoCarga() {
  const [form, setForm] = useState({
    matriculaConferente: '',
    cnh: '',
    cpf: '',
    nomeMotorista: '',
    caminhao: '',
    tipoCarga: '',
    empresa: '',

    placaCarreta: '',
    tipoOperacao: '',
    fotoPlacaCarreta: null,
    tipoVeiculo: '',

    internoSujoFoto: null,
    lonasFoto: null,
    vedacaoFoto: null,
    tampaFoto: null,
    assoalhoFoto: null,
    calhasFoto: null,
    esqueletoFoto: null,
    pragasFoto: null,
    ladoEsquerdoVazioFoto: null,
    ladoDireitoVazioFoto: null,

    nomeConferente: '',
    matriculaConferenteOperacao: '',
    turno: '',
    localExpedicao: '',
    transportadora: '',
    aprovado: false,
    destino: '',
    numeroDT: '',
    quantidadePaletes: '',

    ladoDireitoCarregadoFoto: null,
    ladoEsquerdoCarregadoFoto: null,

    paleteEspecificacao: '',
    motoristaAcompanhou: '',
    observacoes: '',

    assinaturaMotorista: null,
    assinaturaConferente: null,
  });

  // Busca motorista ao digitar matrícula
 function handleMatriculaChange(e) {
  const matricula = e.target.value;
  setForm(prev => ({ ...prev, matriculaConferente: matricula }));

  const motorista = motoristas.find(m => m.matricula === matricula);

  if (motorista) {
    setForm(prev => ({
      ...prev,
      matriculaConferente: matricula,
      cnh: motorista.cnh || '',
      cpf: motorista.cpf || '',
      nomeMotorista: motorista.nome || '',
      caminhao: motorista.caminhao || '',
      tipoCarga: motorista.tipoCarga || '',
      empresa: motorista.empresa || '',
      // Dados da DT
      placaCarreta: motorista.placaCarreta || '',
      tipoVeiculo: motorista.tipoVeiculo || '',
      destino: motorista.destino || '',
      quantidadePaletes: motorista.quantidadePaletes || '',
      tipoOperacao: motorista.tipoOperacao || '', // ✅ adiciona aqui
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
      placaCarreta: '',
      tipoVeiculo: '',
      destino: '',
      quantidadePaletes: '',
      tipoOperacao: '', // limpa também
    }));
  }
}



  // Handle geral para inputs, selects, checkboxes e arquivos
  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  // Submit (por enquanto só alerta e log)
  function handleSubmit(e) {
    e.preventDefault();
    alert('Formulário enviado! (implemente envio real)');
    console.log(form);
  }

  // Mostrar nome do arquivo para uploads
  function fileName(file) {
    return file ? file.name : 'Nenhum arquivo selecionado';
  }

  return (
    <>
      <Navbar titulo="Validação de Carga - Logística" linkTexto="Voltar para GP LOG" linkDestino="/" />

      <div className="container-validacao">
        <form className="form-validacao" onSubmit={handleSubmit}>

          <h2>Dados do Motorista</h2>
          <label>Matrícula do conferente – Tela do SAP:</label>
          <input
            type="text"
            name="matriculaConferente"
            value={form.matriculaConferente}
            onChange={handleMatriculaChange}
            placeholder="Digite matrícula"
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

          <h2>Dados do Caminhão e Operação</h2>
          <label>Placa da carreta - DT:</label>
          <input
            type="text"
            name="placaCarreta"
            value={form.placaCarreta}
            onChange={handleChange}
            required
          />

          <label>Informar se é carregamento ou descarga de P.A:</label>
<input
  type="text"
  name="tipoOperacao"
  value={form.tipoOperacao}
  readOnly
/>

<label>Tipo de veículo - DT:</label>
<input
  type="text"
  name="tipoVeiculo"
  value={form.tipoVeiculo}
  readOnly
/>
          <h2>Dados do Conferente e Operação</h2>

          <label>Matrícula do conferente – Tela do SAP (repetido para confirmação):</label>
          <input
            type="text"
            name="matriculaConferenteOperacao"
            value={form.matriculaConferenteOperacao}
            onChange={handleChange}
          />

          <label>Informe o turno – Tela do SAP:</label>
          <select
            name="turno"
            value={form.turno}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {turnos.map(turno => (
              <option key={turno} value={turno}>{turno}</option>
            ))}
          </select>

          <label>Local de expedição - Tela SAP:</label>
          <input
            type="text"
            name="localExpedicao"
            value={form.localExpedicao}
            onChange={handleChange}
          />

          <label>Selecione a transportadora:</label>
          <select
            name="transportadora"
            value={form.transportadora}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {transportadoras.map(transp => (
              <option key={transp} value={transp}>{transp}</option>
            ))}
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="aprovado"
              checked={form.aprovado}
              onChange={handleChange}
            />
            O veículo está aprovado para o carregamento?
          </label>

         <label>Destino - DT:</label>
<input
  type="text"
  name="destino"
  value={form.destino}
  readOnly
/>


       

          <label>Quantidade de paletes com produto – DT:</label>
          <input
            type="text"
            name="quantidadePaletes"
            value={form.quantidadePaletes}
            onChange={handleChange}
              readOnly
           
          />

          <label>Paletes fora das especificações do GP? (SAP):</label>
          <input
            type="text"
            name="paleteEspecificacao"
            value={form.paleteEspecificacao}
            onChange={handleChange}
          />

          <label>Motorista acompanhou o carregamento? (SAP):</label>
          <input
            type="text"
            name="motoristaAcompanhou"
            value={form.motoristaAcompanhou}
            onChange={handleChange}
          />

          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            rows="3"
          />

      
        

          <button type="submit" className="btn-submit">Enviar </button>
        </form>
      </div>
    </>
  );
}
