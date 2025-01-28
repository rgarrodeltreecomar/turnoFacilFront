import { useState} from 'react';
import { apiClient, endpoints } from '../services/apiContext'
import { Especialidad } from '../types';
import Swal from 'sweetalert2'


export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  // const getEspecialidades = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await apiClient.get(endpoints.especialidades);

  //     setIsLoading(false);

  //     if (response.data && response.data.length) {
  //       const documents: Especialidad[] = response.data.map((especialidad: Especialidad) => ({
  //         id: especialidad.id,
  //         detalle: especialidad.detalle,
  //       }));
  //       setEspecialidades(documents);
  //     } else {
  //       setEspecialidades([]);
  //       Swal.fire('Sin resultados', 'No se encontraron especialidades.', 'info');
  //     }
  //   } catch (error) {
  //       console.log(error)
  //       Swal.fire('Error', 'No se encontraron especialidades.', 'error');
  //       setIsLoading(false);
  //       if (error) setError(error);
  //   }
  // };

  const getEspecialidades = async () => {
    setIsLoading(true);
    try {
      console.log("Iniciando la solicitud de especialidades...");
      const response = await apiClient.get(endpoints.especialidades);
      console.log("Respuesta recibida:", response);

      setIsLoading(false);

      if (response.data && response.data.length) {
        console.log("Datos recibidos:", response.data);
        const documents: Especialidad[] = response.data.map((especialidad: Especialidad) => ({
          id: especialidad.id,
          descripcion: especialidad.descripcion, 
        }));
        console.log("Especialidades mapeadas:", documents);
        setEspecialidades(documents);
      } else {
        console.log("No se encontraron especialidades.");
        setEspecialidades([]);
        Swal.fire('Sin resultados', 'No se encontraron especialidades.', 'info');
      }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire('Error', 'No se encontraron especialidades.', 'error');
        setIsLoading(false);
        if (error) setError(error);
    }
};

  return {
    //* Propiedades
    error,
    isLoading,
    especialidades,

    //* Métodos
   // createCategory,
    getEspecialidades,
    setEspecialidades,
   // updateCategory,
   // removeCategory
}
};
