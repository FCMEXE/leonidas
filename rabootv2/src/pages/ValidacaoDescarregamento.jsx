import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './ValidacaoDescarregamento.css'; // Importa o CSS

// 1. Banco de dados de exemplo ATUALIZADO com o campo 'tipoOperacao'
const remessasCadastradas = [
  {
    placa: 'ABC1234',
    tipoOperacao: 'Descarga de P.A.', // Produto Acabado
    tipoVeiculo: 'Carga Seca',
    origem: 'CDD Sorocaba',
    quantidadePaletes: '24',
    transportadora: 'Transvidal',
  },
  {
    placa: 'DEF5678',
    tipoOperacao: 'Devolução de Cliente',
    tipoVeiculo: 'Sider',
    origem: 'Cliente XYZ',
    quantidadePaletes: '5',
    transportadora: 'Comado',
  },
  {
    placa: 'GHI9012',
    tipoOperacao: 'Transferência entre Unidades',
    tipoVeiculo: 'Asa Delta',
    origem: 'Fábrica Jundiaí',
    quantidadePaletes: '18',
    transportadora: 'GP Log',
  }
];

export default function Descarregamento() {
  const turnos = ['Manhã', 'Tarde', 'Noite'];
  const locaisRecebimento = ['Almox', 'Armazem 01', 'Armazem 02', 'Chopp'];

  const [form, setForm] = useState({
    placaCarreta: '',
    // 2. Estado inicial modificado para aguardar a busca
    tipoOperacao: 'Aguardando Placa...',
    tipoVeiculo: '',
    origem: '',
    quantidadePaletes: '',
    matriculaConferenteOperacao: '',
    turno: '',
    localRecebimento: '',
    transportadora: '',
    aprovado: false,
    houveAvaria: '',
    motoristaAcompanhou: '',
    observacoes: '',
  });

  function handlePlacaChange(e) {
    const placaDigitada = e.target.value.toUpperCase();
    setForm(prev => ({ ...prev, placaCarreta: placaDigitada }));

    const remessa = remessasCadastradas.find(r => r.placa === placaDigitada);

    if (remessa) {
      // Se encontrou a placa, preenche o formulário
      setForm(prev => ({
        ...prev,
        // 3. Adicionado 'tipoOperacao' à busca
        tipoOperacao: remessa.tipoOperacao,
        tipoVeiculo: remessa.tipoVeiculo,
        origem: remessa.origem,
        quantidadePaletes: remessa.quantidadePaletes,
        transportadora: remessa.transportadora,
      }));
    } else {
      // Se não encontrou, limpa os campos
      setForm(prev => ({
        ...prev,
        // Limpa também o tipo de operação
        tipoOperacao: placaDigitada ? 'Placa não encontrada' : 'Aguardando Placa...',
        tipoVeiculo: '',
        origem: '',
        quantidadePaletes: '',
        transportadora: '',
      }));
    }
  }

  // Handler genérico para os outros campos do formulário
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Formulário de Descarregamento Enviado!');
    console.log(form);
  }

  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Descarregamento - Logística" linkTexto="Voltar" linkDestino="/" />
        <div className="container-validacao">
          <form className="form-validacao" onSubmit={handleSubmit}>

            <h2>Dados do Veículo e Operação</h2>
            <label>Placa da carreta:</label>
            <input
              type="text"
              name="placaCarreta"
              value={form.placaCarreta}
              onChange={handlePlacaChange}
              placeholder="Digite a placa para buscar dados"
              required
              style={{ textTransform: 'uppercase' }}
            />

            <label>Tipo de operação:</label>
            <input
              type="text"
              name="tipoOperacao"
              value={form.tipoOperacao}
              readOnly
            />

            {/* O restante do formulário permanece funcionalmente igual */}
            <label>Tipo de veículo:</label>
            <input
              type="text"
              name="tipoVeiculo"
              value={form.tipoVeiculo}
              readOnly
            />

            <label>Origem da carga:</label>
            <input
              type="text"
              name="origem"
              value={form.origem}
              readOnly
            />

            <label>Quantidade de paletes:</label>
            <input
              type="text"
              name="quantidadePaletes"
              value={form.quantidadePaletes}
              readOnly
            />
            
            <label>Transportadora:</label>
            <input 
              type="text" 
              name="transportadora" 
              value={form.transportadora} 
              readOnly
            />

            <h2>Dados da Conferência</h2>

            <label>Matrícula do conferente:</label>
            <input
              type="text"
              name="matriculaConferenteOperacao"
              value={form.matriculaConferenteOperacao}
              onChange={handleChange}
              placeholder="Digite sua matrícula"
              required
            />

            <label>Turno:</label>
            <select name="turno" value={form.turno} onChange={handleChange} required>
              <option value="">Selecione o turno</option>
              {turnos.map(turno => (
                <option key={turno} value={turno}>{turno}</option>
              ))}
            </select>

            <label>Local de recebimento:</label>
            <select name="localRecebimento" value={form.localRecebimento} onChange={handleChange} required >
              <option value="">Selecione o local</option>
              {locaisRecebimento.map(local => (
                <option key={local} value={local}>{local}</option>
              ))}
            </select>

            <label className="checkbox-label">
              <input type="checkbox" name="aprovado" checked={form.aprovado} onChange={handleChange} />
              Descarga conferida e aprovada?
            </label>
            <label>Houve avaria na carga?</label>
            <div className="radio-group">
              <label><input type="radio" name="houveAvaria" value="Sim" checked={form.houveAvaria === 'Sim'} onChange={handleChange}/>Sim</label>
              <label><input type="radio" name="houveAvaria" value="Não" checked={form.houveAvaria === 'Não'} onChange={handleChange}/>Não</label>
            </div>
            <label>Motorista acompanhou a descarga?</label>
            <div className="radio-group">
                <label><input type="radio" name="motoristaAcompanhou" value="Sim" checked={form.motoristaAcompanhou === 'Sim'} onChange={handleChange} />Sim</label>
                <label><input type="radio" name="motoristaAcompanhou" value="Não" checked={form.motoristaAcompanhou === 'Não'} onChange={handleChange} />Não</label>
             </div>
            <label>Observações:</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows="4"
              placeholder="Descreva avarias, divergências ou outras informações."
            />
            <button type="submit" className="btn-submit">Finalizar Descarregamento</button>
          </form>
        </div>
      </div>
    </div>
  );
}