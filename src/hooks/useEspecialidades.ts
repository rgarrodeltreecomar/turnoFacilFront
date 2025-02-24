import { useState} from 'react';
import { turnofacilAPI, endpoints } from '../services/turnofacilAPI'
import { Especialidad } from '../types';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const createEspecialidades = async (newEspecialidad: { detalle: string }) => {
    setIsLoading(true);
    try {
        console.log("Datos a enviar:", newEspecialidad);

    
        const datosJSON = JSON.stringify(newEspecialidad);
        console.log("Datos a enviar (JSON):", datosJSON);


        const response = await turnofacilAPI.post(endpoints.especialidades, datosJSON, {
            headers: {
                "Content-Type": "application/json"
            }
        });


        if (response.status === 201) {
            Swal.fire("Éxito", "Especialidad creada correctamente.", "success");
            navigate('/list-specialties');
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



  const getEspecialidades = async () => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.get(endpoints.especialidades);

      setIsLoading(false);

      if (response.data && response.data.length) {
        const documents: Especialidad[] = response.data.map((especialidad: Especialidad) => ({
          idEspecialidad: especialidad.idEspecialidad,
          detalle: especialidad.detalle,
        
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



  const updateEspecialidad = async (formValues: Especialidad) => {
    setIsLoading(true);
    try {
        console.log("Datos a actualizar:", formValues);

        const response = await turnofacilAPI.put(
            `${endpoints.especialidades}/${formValues.idEspecialidad}`,
            JSON.stringify(formValues),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Respuesta de actualización:", response);

        if (response.status === 200 || response.status === 204) {
            Swal.fire("Éxito", "Especialidad actualizada correctamente.", "success");

            navigate('/list-specialties');
            setEspecialidades(prevEspecialidades =>
                prevEspecialidades.map(especialidad =>
                    especialidad.idEspecialidad === formValues.idEspecialidad ? formValues : especialidad
                )
            );
        } else {
            Swal.fire("Atención", "No se pudo actualizar la especialidad.", "warning");
        }
    } catch (error) {
        console.error("Error al actualizar la especialidad:", error);
        Swal.fire("Error", "Hubo un problema al actualizar la especialidad.", "error");
    } finally {
        setIsLoading(false);
    }
};


  const deleteEspecialidad = async (especialidadId: string) => {
    setIsLoading(true);
    try {
      console.log(`Eliminando especialidad con ID: ${especialidadId}`);
      const response = await turnofacilAPI.delete(`${endpoints.especialidades}/${especialidadId}`);
  
      console.log("Respuesta de eliminación:", response);
  
      if (response.status === 200 || response.status === 204) {
        Swal.fire("Éxito", "Especialidad eliminada correctamente.", "success");
        setEspecialidades(prevEspecialidades => 
          prevEspecialidades.filter(especialidad => especialidad.idEspecialidad !== especialidadId)
        );
      } else {
        Swal.fire("Atención", "No se pudo eliminar la especialidad.", "warning");
      }
    } catch (error) {
      console.error("Error al eliminar especialidad:", error);
      Swal.fire("Error", "Hubo un problema al eliminar la especialidad.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return {
    //* Propiedades
    error,
    isLoading,
    especialidades,

    //* Métodos
   createEspecialidades,
    getEspecialidades,
    setEspecialidades,
    updateEspecialidad,
   deleteEspecialidad
}
};
