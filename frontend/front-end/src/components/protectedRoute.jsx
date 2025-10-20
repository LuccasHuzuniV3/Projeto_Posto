// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Se o usuário não estiver logado, redireciona para o login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Se a rota exige papéis específicos e o usuário não tem, redireciona
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redireciona para uma página de "acesso negado" ou de volta para a home
    return <Navigate to="/" replace />; 
  }

  // Se passou em todas as verificações, renderiza a página filha
  return <Outlet />;
};

export default ProtectedRoute;