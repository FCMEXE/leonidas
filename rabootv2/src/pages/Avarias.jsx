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
    { label: 'Apresenta problemas de vedação ou vazamento?', name: 'vedacao' },
    { label: 'Tampa quebrada ou danificada?', name: 'tampa' },
    { label: 'Assoalho está molhado, sujo, com buracos ou placas soltas?', name: 'assoalho' },
    { label: 'Calhas/cantoneiras estão tortas/amassadas ou sem revestimento?', name: 'calhas' },
    { label: 'Esqueleto/espinha está danificada?', name: 'esqueleto' },
    { label: 'Carreta com sinais de vetores ou pragas?', name: 'pragas' },
  ];

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
    }));
  };

  const fileName = (file) => {
    return file ? file.name : 'Nenhum arquivo';
  };

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
      return newForm;
    });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados finais a serem enviados:", form);
    alert("Checklist de Avarias enviado com sucesso!");
    handleCloseModal();
  };

  return (
    <>
      <Navbar titulo="Avarias Dinâmico" linkTexto="Voltar" linkDestino="/" />
      <div className="avaria-fundo">
        <form className="molde-celular-sap" onSubmit={handleOpenModal}>
          <h2>Checklist Dinâmico</h2>

          <div className="form-content">
            <label>Selecione uma pergunta:</label>
            <div className="grupo-selecao-pergunta">
  <select
    value={selectedQuestion}
    onChange={e => setSelectedQuestion(e.target.value)}
  >
    <option value="">-- Selecione --</option>
    {perguntas.map(p => (
      <option key={p.name} value={p.name}>{p.label}</option>
    ))}
  </select>
  <button type="button" onClick={handleAddCard} className="btn-upload">Adicionar</button>
</div>


            {selectedCards.map((pergunta) => (
              <div className="grupo-avaria" key={pergunta.name}>
                <label>{pergunta.label}</label>
                <div className="input-container">
                  <input
                    type="file"
                    accept="image/*"
                    id={`${pergunta.name}Foto`}
                    name={`${pergunta.name}Foto`}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`${pergunta.name}Foto`} className="btn-upload">
                    Anexar...
                  </label>
                  <span className="file-name-checklist">{fileName(form[`${pergunta.name}Foto`])}</span>
                  <label className="nao-checkbox">
                    <input
                      type="checkbox"
                      name={`${pergunta.name}Nao`}
                      checked={form[`${pergunta.name}Nao`] || false}
                      onChange={handleChange}
                    />
                    Não se aplica
                  </label>
                 <button
  type="button"
  onClick={() => handleRemoveCard(pergunta.name)}
  className="btn-remover-card" // Usando a classe do seu CSS
>
  ✕
</button>
                </div>
              </div>
            ))}

            <button type="submit" className="btn-avarias-sap">Avançar</button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Checklist Final</h2>
            <div className="form-content">
              <form onSubmit={handleSubmit}>
                <label>Foto lado direito aberto e carregado:</label>
                <input
                  type="file"
                  name="ladoDireitoCarregadoFoto"
                  onChange={handleChange}
                  accept="image/*"
                />

                <label>Foto lado esquerdo aberto e carregado:</label>
                <input
                  type="file"
                  name="ladoEsquerdoCarregadoFoto"
                  onChange={handleChange}
                  accept="image/*"
                />

                <div className="grupo-assinatura">
                  <h3>Assinaturas</h3>
                  <label>Nome do motorista:</label>
                  <input
                    type="text"
                    name="assinaturaMotorista"
                    value={form.assinaturaMotorista || ''}
                    onChange={handleChange}
                  />

                  <label>Nome do conferente:</label>
                  <input
                    type="text"
                    name="assinaturaConferente"
                    value={form.assinaturaConferente || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={handleCloseModal}>Cancelar</button>
                  <button type="submit" className="btn-primary">Confirmar e Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}