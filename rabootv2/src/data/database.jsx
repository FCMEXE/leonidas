// src/data/database.jsx

// --- Entidades Principais ---

export const motoristas = [
  // Motoristas originais
  { matricula: '1001', nome: 'Carlos Silva', cnh: '123456789', cpf: '111.222.333-44' },
  { matricula: '1002', nome: 'Mariana Costa', cnh: '987654321', cpf: '444.555.666-77' },
  
  // Novos motoristas adicionados a partir das suas informações
  { matricula: '1', nome: 'Carlos Oliveira', cnh: '345678901', cpf: '1' },
  { matricula: '2', nome: 'Ana Souza', cnh: '987654321', cpf: '2' },
  { matricula: '3', nome: 'Pedro Santos', cnh: '123123123', cpf: '34567890123' },
  { matricula: '4', nome: 'Mariana Costa', cnh: '456456456', cpf: '45678901234' },
  { matricula: '5', nome: 'Ricardo Almeida', cnh: '789789789', cpf: '56789012345' },
];

export const viagens = [
  // Viagens originais
  {
    id: 'V001', matriculaMotorista: '1001', placaCarreta: 'ABC1234',
    tipoOperacao: 'Carregamento', tipoVeiculo: 'Carga Seca', empresa: 'GP Log',
    destino: 'CDD Sorocaba', quantidadePaletes: '24',
  },
  {
    id: 'V002', placaCarreta: 'DEF5678', matriculaMotorista: '1002',
    tipoOperacao: 'Descarga de P.A.', tipoVeiculo: 'Sider', origem: 'Fábrica Jundiaí',
    quantidadePaletes: '22', transportadora: 'Comado',
  },

  // Novas viagens criadas a partir das suas informações
  {
    id: 'V003', matriculaMotorista: '1', placaCarreta: 'DEF5678',
    tipoOperacao: 'Carregamento', tipoVeiculo: 'Baú', empresa: 'LogiExpress',
    destino: 'Almox', quantidadePaletes: '28',
  },
  {
    id: 'V004', matriculaMotorista: '2', placaCarreta: 'GHI9012',
    tipoOperacao: 'Descarga de P.A.', tipoVeiculo: 'Refrigerado', empresa: 'TransLog',
    origem: 'Cliente ABC', destino: 'Armazem 01', quantidadePaletes: '20', transportadora: 'TransLog',
  },
  {
    id: 'V005', matriculaMotorista: '3', placaCarreta: 'JKL3456',
    tipoOperacao: 'Carregamento', tipoVeiculo: 'Cegonheira', empresa: 'Veloz Cargas',
    destino: 'Armazem 02', quantidadePaletes: 'N/A',
  },
  {
    id: 'V006', matriculaMotorista: '4', placaCarreta: 'MNO7890',
    tipoOperacao: 'Descarga de P.A.', tipoVeiculo: 'Graneleiro', empresa: 'AgroTransportes',
    origem: 'Fazenda Boa Vista', destino: 'Chopp', quantidadePaletes: 'N/A', transportadora: 'AgroTransportes',
  },
  {
    id: 'V007', matriculaMotorista: '5', placaCarreta: 'PQR1234',
    tipoOperacao: 'Carregamento', tipoVeiculo: 'Sider', empresa: 'Distribuidora Rápida',
    destino: 'Armazem 01', quantidadePaletes: '32',
  },
];


// --- Dados de Configuração / Listas ---

export const perguntasAvarias = [
  { label: 'Veículo internamente sujo?', name: 'internoSujo' },
  { label: 'Lonas sujas ou rasgadas?', name: 'lonas' },
  { label: 'Problemas de vedação?', name: 'vedacao' },
  { label: 'Tampa quebrada ou danificada?', name: 'tampa' },
  { label: 'Assoalho com problemas?', name: 'assoalho' },
  { label: 'Calhas/cantoneiras danificadas?', name: 'calhas' },
  { label: 'Sinais de vetores ou pragas?', name: 'pragas' },
];

// Adicionei as novas empresas à lista de transportadoras para consistência
export const transportadoras = [
    'Comado', 'GP Log', 'Transvidal', 'Transpak', 'Gfrente', 
    'LogiExpress', 'TransLog', 'Veloz Cargas', 'AgroTransportes', 'Distribuidora Rápida'
];

export const turnos = ['Manhã', 'Tarde', 'Noite'];
export const locais = ['Almox', 'Armazem 01', 'Armazem 02', 'Chopp', 'CDD Sorocaba', 'Fábrica Jundiaí'];