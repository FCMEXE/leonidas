import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { viagens, turnos, locais } from '../data/database.jsx';
import './ValidacaoDescarregamento.css';

export default function ValidacaoDescarregamento() {
  const [form, setForm] = useState({
    placaCarreta: '',
    tipoOperacao: 'Aguardando Placa...',
    tipoVeiculo: '',
    origem: '',
    quantidadePaletes: '',
    transportadora: '',
    matriculaConferenteOperacao: '',
    turno: '',
    localRecebimento: '',
    aprovado: false,
    houveAvaria: '',
    motoristaAcompanhou: '',
    observacoes: '',
  });

  const handlePlacaChange = (e) => {
    const placaDigitada = e.target.value.toUpperCase();
    setForm(prev => ({ ...prev, placaCarreta: placaDigitada }));

    const viagemEncontrada = viagens.find(v => v.placaCarreta === placaDigitada);

    if (viagemEncontrada) {
      setForm(prev => ({
        ...prev,
        tipoOperacao: viagemEncontrada.tipoOperacao,
        tipoVeiculo: viagemEncontrada.tipoVeiculo,
        origem: viagemEncontrada.origem,
        quantidadePaletes: viagemEncontrada.quantidadePaletes,
        transportadora: viagemEncontrada.transportadora,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        tipoOperacao: placaDigitada ? 'Placa não encontrada' : 'Aguardando Placa...',
        tipoVeiculo: '',
        origem: '',
        quantidadePaletes: '',
        transportadora: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário de Descarregamento Enviado!');
    console.log("Dados do Formulário:", form);
  };

  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Val. Descarregamento">
          <Link to="/" className="nav-link">Menu</Link>
        </Navbar>
        <div className="container-validacao">
          <form className="form-validacao" onSubmit={handleSubmit}>
            <h2>Dados do Veículo e Operação</h2>
            <label>Placa da carreta:</label>
            <input
              type="text" name="placaCarreta" value={form.placaCarreta} onChange={handlePlacaChange}
              placeholder="Digite a placa para buscar" required style={{ textTransform: 'uppercase' }}
            />
            <label>Tipo de operação:</label>
            <input type="text" name="tipoOperacao" value={form.tipoOperacao} readOnly />
            <label>Tipo de veículo:</label>
            <input type="text" name="tipoVeiculo" value={form.tipoVeiculo} readOnly />
            <label>Origem da carga:</label>
            <input type="text" name="origem" value={form.origem} readOnly />
            <label>Quantidade de paletes:</label>
            <input type="text" name="quantidadePaletes" value={form.quantidadePaletes} readOnly />
            <label>Transportadora:</label>
            <input type="text" name="transportadora" value={form.transportadora} readOnly />

            <h2>Dados da Conferência</h2>
            <label>Matrícula do conferente:</label>
            <input type="text" name="matriculaConferenteOperacao" value={form.matriculaConferenteOperacao} onChange={handleChange} placeholder="Digite sua matrícula" required />
            <label>Turno:</label>
            <select name="turno" value={form.turno} onChange={handleChange} required>
              <option value="">Selecione o turno</option>
              {turnos.map(turno => (<option key={turno} value={turno}>{turno}</option>))}
            </select>
            <label>Local de recebimento:</label>
            <select name="localRecebimento" value={form.localRecebimento} onChange={handleChange} required>
              <option value="">Selecione o local</option>
              {locais.map(local => (<option key={local} value={local}>{local}</option>))}
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
              name="observacoes" value={form.observacoes} onChange={handleChange}
              rows="4" placeholder="Descreva avarias, divergências ou outras informações."
            />
            <div className="form-actions">
              <button type="submit" className="btn-submit">Finalizar Descarregamento</button>
            </div>
          </form>

          <div className="checklist-actions">
            <p>A carga recebida possui avarias?</p>
            <Link to="/avarias-descarregamento" className="btn-secondary-desc">
              Registrar Avarias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}