import { PublicRoutes } from './PublicRoutes.tsx';
import { PrivateRoutes } from './PrivateRoutes.tsx';
import { Loading } from '../componentes/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useAuthStore } from '../hooks/useAuthStore.tsx';

export const AppRouter: React.FC = () => {
  const { status } = useAuthStore();  // Obtenemos el estado de autenticación

  // Muestra un componente de carga si el estado es 'checking'
  if (status === 'checking') {
    return <Loading key="loading-checking-routers" loading />;
  }

  return (
    <Routes>
      {
        // Si está autenticado, renderiza las rutas privadas
        (status === 'authenticated')
          ? <Route path="/*" element={<PrivateRoutes />} />
          // Si no está autenticado, renderiza las rutas públicas
          : <Route path="/*" element={<PublicRoutes />} />
      }
      
      {/* Si no coincide con ninguna ruta, redirige al login */}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};