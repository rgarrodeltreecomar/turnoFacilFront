import { PublicRoutes } from './PublicRoutes.tsx';
import { PrivateRoutes } from './PrivateRoutes.tsx';
import { Loading } from '../componentes/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore.ts';

export const AppRouter: React.FC = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Muestra un componente de carga si el estado es 'checking'
  if (status === 'checking') {
    return <Loading key="loading-auth" loading />;
  }

  return (
    <Routes>
      {
       
        (status === 'authenticated')
          ? <Route path="/*" element={<PrivateRoutes />} /> : <Route path="/*" element={<PublicRoutes />} />
      } 
      <Route path='*' element={<Navigate to='/login' />} />
      {/* <Route path="/*" element={<PrivateRoutes />} />  */}

    </Routes>
  );
};