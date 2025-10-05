// src/components/Sidebar.jsx

import React from 'react';
import { FaGasPump } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom"; // Usando NavLink

import '../css/sidebar.css'; // Certifique-se que o caminho está correto

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaGasPump size={36} className="logo-icon" />
        <h1 className="logo-text"><span>POSTO</span><span className="logo-text-highlight">MERCADO</span></h1>
      </div>

      <nav className="sidebar-nav">
        {/* Link do Dashboard */}
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? 'nav-link-dashboard active' : 'nav-link-dashboard'}
        >
          <GoHome size={24} />
          <span>Dashboard</span>
        </NavLink>

        {/* Seção de Preços */}
        <div className="nav-section">
          <h2 className="section-title">PREÇOS</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/precos/gasolina" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Gasolina
              </NavLink>
            </li>
            <li>
              <NavLink to="/precos/etanol" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Etanol
              </NavLink>
            </li>
            <li>
              <NavLink to="/precos/diesel" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Diesel
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Seção de Fornecedores */}
        <div className="nav-section">
          <h2 className="section-title">FORNECEDORES</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/fornecedores/cadastrar" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Cadastrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/fornecedor/listar" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Listar
              </NavLink>
            </li>
          </ul>
        </div>
        
        {/* Seção de Relatórios */}
        <div className="nav-section">
          <h2 className="section-title">RELATÓRIOS</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/relatorios/semanal" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Semanal
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorios/mensal" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Mensal
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorios/trimestral" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Trimestral
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorios/ranking" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Ranking Fornecedores
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Seção do Simulador */}
        <div className="nav-section">
          <h2 className="section-title">Compras</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/compras" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Historia e Simulador
              </NavLink>
            </li>
          </ul>
        </div>
        
      </nav>
    </aside>
  );
};

export default Sidebar;