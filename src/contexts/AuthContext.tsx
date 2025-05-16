import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

// Credenciais de demonstração
const DEMO_USERS = [
  { id: '1', name: 'Gerente de Frota', email: 'demo@exemplo.com', password: 'senha123' },
  { id: '2', name: 'João Gerente', email: 'joao@exemplo.com', password: 'senha123' },
  { id: '3', name: 'Sara Admin', email: 'sara@exemplo.com', password: 'senha123' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário já está logado
    const storedUser = localStorage.getItem('@GerenciamentoFrota:user');
    const storedToken = localStorage.getItem('@GerenciamentoFrota:token');
    
    if (storedUser && storedToken && api?.defaults?.headers?.common) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simula validação da API com usuários de demonstração
      const demoUser = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!demoUser) {
        throw new Error('Credenciais inválidas');
      }

      // Cria um token JWT simulado
      const token = btoa(JSON.stringify({ id: demoUser.id, email: demoUser.email }));
      
      const userData = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email
      };

      localStorage.setItem('@GerenciamentoFrota:user', JSON.stringify(userData));
      localStorage.setItem('@GerenciamentoFrota:token', token);
      
      if (api?.defaults?.headers?.common) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      setUser(userData);
    } catch (error) {
      throw new Error('Falha na autenticação');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simula validação de registro
      if (DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email já cadastrado');
      }
      
      // Em uma aplicação real, você criaria o usuário no banco de dados
      return;
    } catch (error) {
      throw new Error('Falha no registro');
    }
  };

  const logout = () => {
    localStorage.removeItem('@GerenciamentoFrota:user');
    localStorage.removeItem('@GerenciamentoFrota:token');
    if (api?.defaults?.headers?.common) {
      delete api.defaults.headers.common['Authorization'];
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};