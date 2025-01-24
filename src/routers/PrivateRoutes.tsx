import React, { useMemo } from "react";
import {  Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../componentes/LayoutApp/AppLayout";
import { Home, Especialidades } from "../pages";

//import { ApiButton, Home, UserProfile, ValidateCode } from "../pages";



export const PrivateRoutes: React.FC = () => {

  const { pathname, search } = useLocation();

  const lastPath = useMemo(() => pathname + search, [pathname, search]);
  localStorage.setItem("lastPath_bo", lastPath);

  return (
    <AppLayout key="app-layout">
      <Routes>
          
          <Route path="/home" element={< Home data={undefined} />} />
          <Route path="/specialties" element={< Especialidades />} />
        </Routes>
    </AppLayout>
  );
};