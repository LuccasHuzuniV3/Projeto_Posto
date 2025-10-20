// src/pages/Layout.jsx - VERSÃO CORRIGIDA

import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => { // 2. REMOVA O '{ children }' DAQUI
  return (
    // Usamos 'app-layout' para consistência, se essa for a classe no seu app.css
    <div className="app-layout"> 
      <Sidebar />
      <main className="main-content">
        <Outlet /> 
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Layout;