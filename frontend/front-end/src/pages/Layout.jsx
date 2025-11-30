// src/pages/Layout.jsx - COM BOTÃO MOBILE

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom'; // useLocation ajuda a fechar o menu ao mudar de página
import Sidebar from "../components/sidebar"; // Verifique o 'S' maiúsculo/minúsculo do seu arquivo
import { ToastContainer } from 'react-toastify';
import { FaBars } from "react-icons/fa"; // Ícone do menu
import 'react-toastify/dist/ReactToastify.css';

import '../css/app.css';

const Layout = () => {
  // Estado inicial: Se a tela for pequena, começa fechado. Se for grande, começa aberto.
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fecha a sidebar automaticamente no mobile quando muda de rota (clica num link)
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`main-content ${isSidebarOpen ? 'open' : 'closed'}`}>
        {/* --- BOTÃO MOBILE (SÓ APARECE NO CELULAR) --- */}
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        
        <Outlet />
      </main>

      {/* Overlay escuro para fechar o menu clicando fora (só mobile) */}
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
};

export default Layout;