import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Avarias.css';

export default function AvariasDinamico() {
  const [form, setForm] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const perguntas = [
    { label: 'O veículo está internamente sujo?', name: 'internoSujo' },
    { label: 'Lonas sujas ou rasgadas?', name: 'lonas' },
    { label: 'Apresenta problemas de vedação?', name: 'vedacao' },
    { label: 'Tampa quebrada ou danificada?', name: 'tampa' },
    { label: 'Assoalho com problemas?', name: 'assoalho' },
    { label: 'Calhas/cantoneiras danificadas?', name: 'calhas' },
    { label: 'Esqueleto/espinha danificada?', name: 'esqueleto' },
    { label: 'Sinais de vetores ou pragas?', name: 'pragas' },
  ];

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
    }));
  };

  const fileName = (file) => file ? file.name : 'Nenhum arquivo';

  const handleAddCard = () => {
    if (!selectedQuestion) return;
    const exists = selectedCards.find(p => p.name === selectedQuestion);
    if (!exists) {
      const pergunta = perguntas.find(p => p.name === selectedQuestion);
      setSelectedCards([...selectedCards, pergunta]);
    }
    setSelectedQuestion('');
  };

  const handleRemoveCard = (name) => {
    setSelectedCards(prev => prev.filter(p => p.name !== name));
    setForm(prev => {
      const newForm = { ...prev };
      delete newForm[`${name}Foto`];
      delete newForm[`${name}Nao`];
      // 2. Garante que a observação também seja removida do estado
      delete newForm[`${name}Obs`]; 
      return newForm;
    });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados finais a serem enviados:", form);
    alert("Checklist de Avarias enviado com sucesso!");
    handleCloseModal();
  };

  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Checklist de Avarias" linkTexto="Voltar" linkDestino="/" />

        <div className="container-avarias">
          <form className="form-avarias" onSubmit={handleOpenModal}>
            <h2>Registrar Não Conformidades</h2>

            <label>Selecione uma avaria para registrar:</label>
            <div className="grupo-selecao-pergunta">
              <select value={selectedQuestion} onChange={e => setSelectedQuestion(e.target.value)}>
                <option value="">Clique para selecionar...</option>
                {perguntas.map(p => <option key={p.name} value={p.name}>{p.label}</option>)}
              </select>
              <button type="button" onClick={handleAddCard} className="btn-adicionar">Adicionar</button>
            </div>

            {selectedCards.map((pergunta) => (
              <div className="grupo-avaria" key={pergunta.name}>
                <label>{pergunta.label}</label>
                <div className="input-container">
                  <input type="file" accept="image/*" id={`${pergunta.name}Foto`} name={`${pergunta.name}Foto`} onChange={handleChange} style={{ display: 'none' }} />
                  <label htmlFor={`${pergunta.name}Foto`} className="btn-upload">Anexar Foto</label>
                  <span className="file-name-checklist">{fileName(form[`${pergunta.name}Foto`])}</span>
                  <label className="nao-checkbox">
                    <input type="checkbox" name={`${pergunta.name}Nao`} checked={form[`${pergunta.name}Nao`] || false} onChange={handleChange} />
                    N/A
                  </label>
                  <button type="button" onClick={() => handleRemoveCard(pergunta.name)} className="btn-remover-card">✕</button>
                </div>

                {/* 1. Campo de observação adicionado aqui */}
                <textarea
                  name={`${pergunta.name}Obs`}
                  value={form[`${pergunta.name}Obs`] || ''}
                  onChange={handleChange}
                  placeholder="Descreva a avaria ou detalhes adicionais..."
                  className="obs-textarea"
                />
              </div>
            ))}

            <button type="submit" className="btn-avarias-sap">Avançar para Finalizar</button>
          </form>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <h2>Finalização do Checklist</h2>
                
                <label>Foto lado direito (carregado):</label>
                <input type="file" name="ladoDireitoCarregadoFoto" onChange={handleChange} accept="image/*"/>

                <label>Foto lado esquerdo (carregado):</label>
                <input type="file" name="ladoEsquerdoCarregadoFoto" onChange={handleChange} accept="image/*"/>

                <h3>Assinaturas</h3>
                <label>Assinatura do motorista:</label>
                <input type="text" name="assinaturaMotorista" value={form.assinaturaMotorista || ''} onChange={handleChange}/>

                <label>Assinatura do conferente:</label>
                <input type="text" name="assinaturaConferente" value={form.assinaturaConferente || ''} onChange={handleChange}/>

                <div className="modal-actions">
                  <button type="button" onClick={handleCloseModal} className="btn-cancelar">Cancelar</button>
                  <button type="submit" className="btn-confirmar">Confirmar e Enviar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}