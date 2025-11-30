import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // 1. Importa o provedor de autenticação

// Layouts e Rotas Protegidas
import Layout from "./pages/Layout";
import FornecedorLayout from "./layout/fornecedorLayout";
import ProtectedRoute from "./components/protectedRoute";

// Páginas
import Login from "./components/login";
import Dashboard from "./pages/dashboard";
import ListaFornecedores from "./pages/listarFornecedores";
import CadastroFornecedor from "./pages/cadastroFornecedor";
import EditarFornecedor from "./pages/editarFornecedor";
import SimularCompra from "./pages/simularCompra";
import HistoricoCompras from "./pages/historicocompras";
import ListaUsuarios from "./pages/ListaUsuarios";
import CriarUsuario from "./pages/CriarUsuario";
import EditarUsuario from "./pages/editarUsuario";
import PrecoFornecedor from "./pages/PrecoFornecedor";
import PaginaPrecos from "./pages/paginaPrecos";
import PaginaHistoricoPrecos from "./pages/historicoPrecos";
import Mensal from "./pages/mensal";
import Semanal from "./pages/semanal";

import "./css/app.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/precos" element={<PaginaPrecos />} />
              <Route path="/historico/precos" element={<PaginaHistoricoPrecos />} />
              <Route path="/fornecedor/listar" element={<ListaFornecedores />} />
              <Route path="/fornecedores/cadastrar" element={<CadastroFornecedor />} />
              <Route path="/fornecedores/editar/:id" element={<EditarFornecedor />} />
              <Route path="/compras" element={<HistoricoCompras />} />
              <Route path="/simulador/compra" element={<SimularCompra />} />
              <Route path="/configuracao" element={<ListaUsuarios />} /> {/* Rota correta para a lista */}
              <Route path="/usuarios/criar" element={<CriarUsuario />} />
              <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
              <Route path="/relatorio/mensal" element={<Mensal />} />
              <Route path="/relatorios/semanal" element={<Semanal />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Fornecedor']} />}>
            <Route element={<FornecedorLayout />}>
              <Route path="/meu-preco" element={<PrecoFornecedor />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;