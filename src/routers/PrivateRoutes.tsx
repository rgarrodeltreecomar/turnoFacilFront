import React, { useMemo } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AppLayout } from "../componentes/LayoutApp/AppLayout";
import { Home, Especialidades, NewEspecialidades, ListMedicos, NewMedicos, NewHorarios, ListHorarios, ListTurnos, NewTuenos, TurnosDisponibles } from "../pages";
//import { useAppSelector } from "../hooks"; 

export const PrivateRoutes: React.FC = () => {
  //const { user } = useAppSelector(state => state.auth); 
  const { pathname, search } = useLocation();

  const lastPath = useMemo(() => pathname + search, [pathname, search]);
  localStorage.setItem("lastPath_bo", lastPath);

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <AppLayout key="app-layout">
      <Routes>
        <Route path="/home" element={<Home />} />


 

            <Route path="/admin/list-specialties" element={<Especialidades />} />
            <Route path="/admin/specialties/new" element={<NewEspecialidades />} />
            <Route path="/admin/specialties/:id" element={<NewEspecialidades />} />

            <Route path="/admin/doctors" element={<ListMedicos />} />
            <Route path="/admin/doctors/new" element={<NewMedicos />} />
            <Route path="/admin/doctors/:id" element={<NewMedicos />} />
   



    
            <Route path="/doctors/schedules" element={<ListHorarios />} />
            <Route path="/doctors/schedules/new" element={<NewHorarios />} />
            <Route path="/doctors/schedules/:id" element={<NewHorarios />} />

            <Route path="/doctors/turns" element={<ListTurnos />} />
            <Route path="/doctors/turns/new" element={<NewTuenos />} />
            <Route path="/doctors/turns/:id" element={<NewTuenos />} />
         
      

    
        
            <Route path="/patient/search-turns" element={<TurnosDisponibles />} />
        

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </AppLayout>
  );
};
