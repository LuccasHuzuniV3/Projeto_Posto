import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./pages/dashboard";
import ListaFornecedores from "./pages/listarFornecedores";
import Layout from "./pages/Layout";
import CadastroFornecedor from "./pages/cadastroFornecedor"; 
import EditarFornecedor from "./pages/editarFornecedor";
import SimularCompra from "./pages/simularCompra"
import HistoricoCompras from "./pages/historicocompras";

import "./css/app.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas (sem sidebar) */}
        <Route path="/" element={<Login />} />

        {/* Rotas privadas (com sidebar fixa) */}
        <Route path="/dashboard"element={<Layout><Dashboard /></Layout>}/>
        <Route path="/fornecedor/listar" element={<Layout><ListaFornecedores /></Layout>} />
        <Route path="/fornecedores/cadastrar" element={<Layout><CadastroFornecedor /></Layout>} />
        <Route path="/fornecedores/editar/:id" element={<Layout><EditarFornecedor /></Layout>} />
        <Route path="/compras" element={<Layout><HistoricoCompras/></Layout>} />
        <Route path="/simulador/compra" element={<Layout><SimularCompra/></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;
