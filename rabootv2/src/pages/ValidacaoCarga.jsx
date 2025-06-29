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
        cnh: motorista.cnh,
        cpf: motorista.cpf,
        nomeMotorista: motorista.nome,
        caminhao: motorista.caminhao,
        tipoCarga: motorista.tipoCarga,
        empresa: motorista.empresa,
        matriculaConferente: matricula,
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
      <Navbar titulo="Validação de Carga - Barracão" linkTexto="Voltar para GP LOG" linkDestino="/" />

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
          <select
            name="tipoOperacao"
            value={form.tipoOperacao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Carga">Carga</option>
            <option value="Descarga">Descarga</option>
          </select>

          <label>Foto da placa da carreta - Coletor:</label>
          <input
            type="file"
            name="fotoPlacaCarreta"
            onChange={handleChange}
            accept="image/*"
          />
          <span className="file-name">{fileName(form.fotoPlacaCarreta)}</span>

          <label>Tipo de veículo - DT:</label>
          <select
            name="tipoVeiculo"
            value={form.tipoVeiculo}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {tipoVeiculos.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <h2>Condições do Veículo (Fotos)</h2>
          <div className="grid-fotos">
            {[
              { label: 'Internamente sujo?', name: 'internoSujoFoto' },
              { label: 'Lonas sujas ou rasgadas?', name: 'lonasFoto' },
              { label: 'Problemas de vedação ou vazamento?', name: 'vedacaoFoto' },
              { label: 'Tampa quebrada ou danificada?', name: 'tampaFoto' },
              { label: 'Assoalho molhado, sujo ou com buracos?', name: 'assoalhoFoto' },
              { label: 'Calhas/cantoneiras tortas/amassadas?', name: 'calhasFoto' },
              { label: 'Esqueleto/espinha danificada?', name: 'esqueletoFoto' },
              { label: 'Sinais de vetores ou pragas?', name: 'pragasFoto' },
              { label: 'Foto lado esquerdo vazio:', name: 'ladoEsquerdoVazioFoto' },
              { label: 'Foto lado direito vazio:', name: 'ladoDireitoVazioFoto' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label>{label}</label>
                <input
                  type="file"
                  name={name}
                  onChange={handleChange}
                  accept="image/*"
                />
                <span className="file-name">{fileName(form[name])}</span>
              </div>
            ))}
          </div>

          <h2>Dados do Conferente e Operação</h2>
          <label>Nome do conferente:</label>
          <input
            type="text"
            name="nomeConferente"
            value={form.nomeConferente}
            onChange={handleChange}
          />

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

          <label>Selecione o destino - DT:</label>
          <select
            name="destino"
            value={form.destino}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {destinos.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>

       

          <label>Quantidade de paletes com produto – DT:</label>
          <input
            type="number"
            name="quantidadePaletes"
            value={form.quantidadePaletes}
            onChange={handleChange}
            min="0"
          />

          <label>Foto lado direito aberto e carregado:</label>
          <input
            type="file"
            name="ladoDireitoCarregadoFoto"
            onChange={handleChange}
            accept="image/*"
          />
          <span className="file-name">{fileName(form.ladoDireitoCarregadoFoto)}</span>

          <label>Foto lado esquerdo aberto e carregado:</label>
          <input
            type="file"
            name="ladoEsquerdoCarregadoFoto"
            onChange={handleChange}
            accept="image/*"
          />
          <span className="file-name">{fileName(form.ladoEsquerdoCarregadoFoto)}</span>

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

          <h2>Assinaturas</h2>
          <label>Assinatura do motorista:</label>
          <input
            type="name"
            name="assinaturaMotorista"
            onChange={handleChange}
            
          />
          

          <label>Assinatura do conferente:</label>
          <input
            type="name"
            name="assinaturaConferente"
            onChange={handleChange}
        
          />
        

          <button type="submit" className="btn-submit">Enviar </button>
        </form>
      </div>
    </>
  );
}
