import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  status: string;
  user: null | { nombre: string; email: string };
  login: (userData: { email: string; password: string }) => string | void;
  logout: () => void;
}

const predefinedUser = {
  nombre: 'Rodrigo',
  email: 'rodrigo@example.com',
  password: '12345678',
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const [status, setStatus] = useState('not-authenticated');
  const [user, setUser] = useState<null | { nombre: string; email: string }>(null);
  const [error, setError] = useState<string | null>(null);

  const login = (userData: { email: string; password: string }): string | void => {
    if (
      userData.email === predefinedUser.email &&
      userData.password === predefinedUser.password
    ) {
      setUser({ nombre: predefinedUser.nombre, email: predefinedUser.email });
      setStatus('authenticated');
      setError(null); // Limpiar errores en caso de éxito
      return 'success'; // Retorna un indicador de éxito
    } else {
      setError('Credenciales incorrectas');
      return 'error'; // Retorna un indicador de error
    }
  };
  
  

  const logout = () => {
    setUser(null);
    setStatus('not-authenticated');
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </AuthContext.Provider>
  );
};

export const  useAuthStore = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
