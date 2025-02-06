import { useState} from 'react';
import { apiClient, endpoints } from '../services/apiContext'
import { Especialidad } from '../types';
import Swal from 'sweetalert2'


export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const createEspecialidades = async (newEspecialidad: { descripcion: string }) => {
    setIsLoading(true);
    try {
        console.log("Datos a enviar:", newEspecialidad);

        // Convertir a JSON
        const datosJSON = JSON.stringify(newEspecialidad);
        console.log("Datos a enviar (JSON):", datosJSON);

        // Enviar solicitud POST con JSON y encabezados correctos
        const response = await apiClient.post(endpoints.especialidades, datosJSON, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Respuesta del servidor:", response);

        if (response.status === 201) {
            Swal.fire("Éxito", "Especialidad creada correctamente.", "success");
        } else {
            Swal.fire("Atención", "No se pudo crear la especialidad.", "warning");
        }
    } catch (error) {
        console.error("Error al crear especialidad:", error);
        
        Swal.fire("Error", "Hubo un problema al crear la especialidad.", "error");

        
    } finally {
        setIsLoading(false);
    }
};


  // const createEspecialidades = async (newEspecilidad: Especialidad) => {
  //   setIsLoading(true);
  //   try {
  //     // Imprime los datos que se van a enviar
  //     console.log("Datos a enviar:", newEspecilidad);
  //     console.log("Endpoint:", endpoints.especialidades);
  
  //     const response = await apiClient.post(endpoints.especialidades, newEspecilidad);
  
  //     // Imprime la respuesta del servidor
  //     console.log("Respuesta del servidor:", response);
  
  //     if (response.status === 201) {
  //       Swal.fire('Éxito', 'Especialidad creada correctamente.', 'success');
  //     } else {
  //       Swal.fire('Atención', 'No se pudo crear la especialidad.', 'warning');
  //     }
  //   } catch (error) {
  //     // Imprime el error en la consola
  //     console.error("Error al crear especialidad:", error);
  //     Swal.fire('Error', 'Hubo un problema al crear la especialidad.', 'error');
  //     setIsLoading(false);
  //     if (error) setError(error);
  //   }
  //   finally {
  //   setIsLoading(false); 
  // }
  // };

  // const createEspecialidades = async (newEspecilidad: Especialidad) => {
  //   setIsLoading(true);
  //   try{
  //     const response = await apiClient.post(endpoints.especialidades, newEspecilidad);
  //     if (response.status === 201) {
  //       Swal.fire('Éxito', 'Especialidad creada correctamente.', 'success');
  //     } else {
  //       Swal.fire('Atención', 'No se pudo crear la especialidad.', 'warning');
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //     Swal.fire('Error', 'Hubo un problema al crear la especialidad.', 'error');
  //     setIsLoading(false);
  //     if (error) setError(error);
  //   }
  // }

  const getEspecialidades = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(endpoints.especialidades);

      setIsLoading(false);

      if (response.data && response.data.length) {
        const documents: Especialidad[] = response.data.map((especialidad: Especialidad) => ({
         // id: especialidad.id,
          descripcion: especialidad.descripcion,
        }));
        setEspecialidades(documents);
      } else {
        setEspecialidades([]);
        Swal.fire('Sin resultados', 'No se encontraron especialidades.', 'info');
      }
    } catch (error) {
        console.log(error)
        Swal.fire('Error', 'No se encontraron especialidades.', 'error');
        setIsLoading(false);
        if (error) setError(error);
    }
  };

//   const getEspecialidades = async () => {
//     setIsLoading(true);
//     try {
//       console.log("Iniciando la solicitud de especialidades...");
//       const response = await apiClient.get(endpoints.especialidades);
//       console.log("Respuesta recibida:", response);

//       setIsLoading(false);

//       if (response.data && response.data.length) {
//         console.log("Datos recibidos:", response.data);
//         const documents: Especialidad[] = response.data.map((especialidad: Especialidad) => ({
//           id: especialidad.id,
//           descripcion: especialidad.descripcion, 
//         }));
//         console.log("Especialidades mapeadas:", documents);
//         setEspecialidades(documents);
//       } else {
//         console.log("No se encontraron especialidades.");
//         setEspecialidades([]);
//         Swal.fire('Sin resultados', 'No se encontraron especialidades.', 'info');
//       }
//     } catch (error) {
//         console.error("Error en la solicitud:", error);
//         Swal.fire('Error', 'No se encontraron especialidades.', 'error');
//         setIsLoading(false);
//         if (error) setError(error);
//     }
// };

  return {
    //* Propiedades
    error,
    isLoading,
    especialidades,

    //* Métodos
   createEspecialidades,
    getEspecialidades,
    setEspecialidades,
   // updateCategory,
   // removeCategory
}
};
