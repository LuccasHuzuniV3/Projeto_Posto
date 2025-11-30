// src/components/Sidebar.jsx

import React from 'react';
import { FaGasPump, FaSignOutAlt, FaBars, FaChevronLeft } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';

import '../css/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
      {/* CABEÇALHO: Logo e Botão de Toggle na mesma linha */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {/* Só mostra o texto se estiver aberto */}
          {isOpen && (
            <h1 className="logo-text">
              <span>POSTO</span><span className="logo-text-highlight">MERCADO</span>
            </h1>
          )}
        </div>

        {/* Botão Limpo e Transparente */}
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaBars />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? 'nav-link-dashboard active' : 'nav-link-dashboard'}
          title={!isOpen ? "Dashboard" : ""}
        >
          <div className="icon-container"><GoHome size={24} /></div>
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* --- SEÇÕES (Só mostram título se aberto) --- */}
        
        {/* PREÇOS */}
        <div className="nav-section">
          {isOpen && <h2 className="section-title">PREÇOS</h2>}
          <ul className="nav-list">
            <li>
              <NavLink to="/precos" end className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Comparativo" : ""}>
                <div className="link-content">{isOpen ? "Comparativo" : "Comp"}</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/historico/precos" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Histórico" : ""}>
                <div className="link-content">{isOpen ? "Histórico" : "Hist"}</div>
              </NavLink>
            </li>
          </ul>
        </div>
        
        {/* FORNECEDORES */}
        <div className="nav-section">
          {isOpen && <h2 className="section-title">FORNECEDORES</h2>}
          <ul className="nav-list">
            <li>
              <NavLink to="/fornecedores/cadastrar" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Cadastrar" : ""}>
                <div className="link-content">{isOpen ? "Cadastrar" : "Cad"}</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/fornecedor/listar" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Listar" : ""}>
                 <div className="link-content">{isOpen ? "Listar" : "List"}</div>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RELATÓRIOS */}
        <div className="nav-section">
          {isOpen && <h2 className="section-title">RELATÓRIOS</h2>}
          <ul className="nav-list">
            <li>
              <NavLink to="/relatorios/semanal" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Semanal" : ""}>
                 <div className="link-content">{isOpen ? "Semanal" : "Sem"}</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorio/mensal" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Mensal" : ""}>
                 <div className="link-content">{isOpen ? "Mensal" : "Mês"}</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorio" end className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Ranking" : ""}>
                 <div className="link-content">{isOpen ? "Ranking" : "Rank"}</div>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* COMPRAS */}
        <div className="nav-section">
          {isOpen && <h2 className="section-title">COMPRAS</h2>}
          <ul className="nav-list">
            <li>
              <NavLink to="/compras" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Histórico e Simulador" : ""}>
                 <div className="link-content">{isOpen ? "Histórico/Sim" : "H/S"}</div>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONFIGURAÇÕES */}
        <div className="nav-section">
          {isOpen && <h2 className="section-title">CONFIGURAÇÕES</h2>}
          <ul className="nav-list">
            <li>
              <NavLink to="/configuracao" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"} title={!isOpen ? "Configurações" : ""}>
                 <div className="link-content">{isOpen ? "Configurações" : "Conf"}</div>
              </NavLink>
            </li>
          </ul>
        </div>
        
        {/* LOGOUT */}
        <div className="nav-section logout-section">
            <button onClick={handleLogout} className="logout-button-sidebar" title="Sair">
                <FaSignOutAlt style={{ marginRight: isOpen ? '10px' : '0' }} />
                {isOpen && "Sair"}
            </button>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;