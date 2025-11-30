// src/components/Sidebar.jsx - VERSÃO CORRIGIDA COM SUAS ROTAS ORIGINAIS

import React from 'react';
import { FaGasPump } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";

import '../css/sidebar.css';

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
              {/* Adicionei 'end' aqui para não marcar quando estiver no histórico */}
              <NavLink to="/precos" end className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Comparativo
              </NavLink>
            </li>
            <li>
              <NavLink to="/historico/precos" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Histórico
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
              <NavLink to="/relatorio/mensal" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Mensal
              </NavLink>
            </li>
            <li>
              {/* Adicionei 'end' aqui porque '/relatorio' é pai de '/relatorio/mensal' */}
              <NavLink to="/relatorio" end className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Ranking Fornecedores
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Seção de Compras */}
        <div className="nav-section">
          <h2 className="section-title">COMPRAS</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/compras" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Historico e Simulador
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Seção de Configurações */}
        <div className="nav-section">
          <h2 className="section-title">CONFIGURAÇÕES</h2>
          <ul className="nav-list">
            <li>
              <NavLink to="/configuracao" className={({ isActive }) => isActive ? "link-item-ativo" : "link-item"}>
                Configurações
              </NavLink>
            </li>
          </ul>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;