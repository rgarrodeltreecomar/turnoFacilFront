import React, { useMemo } from "react";
import {  Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../componentes/LayoutApp/AppLayout";
import { Home, Especialidades, NewEspecialidades, ListMedicos, NewMedicos } from "../pages";

//import { ApiButton, Home, UserProfile, ValidateCode } from "../pages";



export const PrivateRoutes: React.FC = () => {

  const { pathname, search } = useLocation();

  const lastPath = useMemo(() => pathname + search, [pathname, search]);
  localStorage.setItem("lastPath_bo", lastPath);

  return (
    <AppLayout key="app-layout">
      <Routes>
          <Route path="/home" element={< Home  />} />

          <Route path="/specialties" element={< Especialidades />} />
          <Route path="/specialties/new" element={< NewEspecialidades />} />
          <Route path="/specialties/:id" element={< NewEspecialidades />} />

          <Route path="/doctors" element={< ListMedicos />} />
          <Route path="/doctors/new" element={< NewMedicos />} />
          <Route path="/doctors/:id" element={< NewMedicos />} />
        </Routes>
    </AppLayout>
  );
};