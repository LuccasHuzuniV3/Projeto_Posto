// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função de login que será chamada pelo seu componente de Login
  const login = (userData) => {
    setUser(userData);
    // Opcional: Salvar no localStorage para manter o login após recarregar a página
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Aqui você também faria uma chamada para a API de logout, se tiver uma
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto facilmente em outros componentes
export const useAuth = () => {
  return useContext(AuthContext);
};