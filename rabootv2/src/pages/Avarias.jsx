import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Avarias.css';

export default function Avarias() {
  const [form, setForm] = useState({});

  const perguntas = [
    { label: 'O veículo está internamente sujo?', name: 'internoSujo' },
    { label: 'Lonas sujas ou rasgadas?', name: 'lonas' },
    { label: 'Apresenta problemas de vedação ou vazamento?', name: 'vedacao' },
    { label: 'Tampa quebrada ou danificada?', name: 'tampa' },
    { label: 'Assoalho está molhado, sujo, com buracos ou placas soltas?', name: 'assoalho' },
    { label: 'Calhas/cantoneiras estão tortas/amassadas ou sem revestimento?', name: 'calhas' },
    { label: 'Esqueleto/espinha está danificada?', name: 'esqueleto' },
    { label: 'Carreta com sinais de vetores ou pragas?', name: 'pragas' },
    { label: 'Foto do lado esquerdo da carreta vazia:', name: 'esquerdoVazio' },
    { label: 'Foto do lado direito da carreta vazia:', name: 'direitoVazio' },
  ];

  const handleChange = (e) => {
    const { name, type, files, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : checked
    }));
  };

  return (
    <>
      <Navbar titulo="Avarias" linkTexto="Voltar" linkDestino="/" />
      <div className="avaria-fundo">
        <div className="molde-celular-sap">
          <h2>Checklist de Avarias</h2>

          {perguntas.map((pergunta) => (
            <div className="grupo-avaria" key={pergunta.name}>
              <label>{pergunta.label}</label>
              <input
                type="file"
                accept="image/*"
                name={`${pergunta.name}Foto`}
                onChange={handleChange}
              />
              <label className="nao-checkbox">
                <input
                  type="checkbox"
                  name={`${pergunta.name}Nao`}
                  checked={form[`${pergunta.name}Nao`] || false}
                  onChange={handleChange}
                />
                Não
              </label>
            </div>
          ))}

          <button className="btn-avarias-sap">Enviar Avarias</button>
        </div>
      </div>
    </>
  );
}
