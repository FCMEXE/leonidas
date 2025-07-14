// src/pages/Menu.jsx (VERSÃO CORRETA)
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './Menu.css';

export default function Menu() {
  return (
    // SEM O <Router> AQUI
    <div className="mobile-frame">
      <div className="mobile-screen">
        <Navbar titulo="Menu Principal" />
        <div className="menu-container">
          <h2 className="menu-title">Processos de Logística</h2>
          <Link to="/carregamento" className="menu-button carregamento-btn">
            Validação de Carregamento
          </Link>
          <Link to="/descarregamento" className="menu-button descarregamento-btn">
            Validação de Descarregamento
          </Link>
        
             <Link to="/verificacao" className="menu-button verificacao-btn">
            Verificar Motorista
          </Link>
        </div>
      </div>
    </div>
  );
}