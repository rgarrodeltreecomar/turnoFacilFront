import { useState} from 'react';
import { turnofacilAPI, endpoints } from '../services/turnofacilAPI'
import { Horarios } from '../types';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


export const useHorarios= () => {
  const [horarios, setHorarios] = useState<Horarios[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const createHorarios = async (newHorarios: Horarios) => {
    setIsLoading(true);
    try {
        console.log("Datos a enviar:", newHorarios);

        const response = await turnofacilAPI.post(endpoints.schedules, newHorarios, {
            headers: {
                "Content-Type": "application/json"
            }
        });


        if (response.status === 201 || response.status === 204) {
            Swal.fire("Éxito", "Horario creado correctamente.", "success");
            navigate('/schedules/new');
        } else {
            Swal.fire("Atención", "No se pudo crear el horario.", "warning");
        }
    } catch (error) {
        console.error("Error al crear horario:", error);
        
        Swal.fire("Error", "Hubo un problema al crear el horario.", "error");

    } finally {
        setIsLoading(false);
    }
};



  const getHorarios = async () => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.get(endpoints.schedules);

      setIsLoading(false);

      if (response.data && response.data.length) {
        const documents:Horarios[] = response.data.map((horarios: Horarios) => ({
        idHorario: horarios.idHorario,
        horarioInicio: horarios.horarioInicio,
        horarioFin: horarios.horarioFin,
        }));
        setHorarios(documents);
      } else {
        setHorarios([]);
        Swal.fire('Sin resultados', 'No se encontraron Horarios.', 'info');
      }
    } catch (error) {
        console.log(error)
        Swal.fire('Error', 'No se encontraron horarios.', 'error');
        setIsLoading(false);
        if (error) setError(error);
    }
  };



  const updateHorarios = async (formValues: Horarios) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.put(
        `${endpoints.schedules}/${formValues.idHorario}`,
        formValues, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.status === 200) {
        // Actualiza el estado local
        setHorarios(prev => prev.map(h => 
          h.idHorario === formValues.idHorario ? formValues : h
        ));
        Swal.fire("Éxito", "Hora actualizada!", "success");
        navigate('/schedules'); 
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Error al actualizar", "error");
    } finally {
      setIsLoading(false);
    }
  };


  const deleteHora = async (horaId: string) => {
    setIsLoading(true);
    try {
      
      const response = await turnofacilAPI.delete(`${endpoints.schedules}/${horaId}`);
  
      console.log("Respuesta de eliminación:", response);
  
      if (response.status === 200 || response.status === 204) {
        Swal.fire("Éxito", "Hora eliminada correctamente.", "success");
        setHorarios(prevHorarios=> 
          prevHorarios.filter(horario => horario.idHorario !== horaId)
        );
      } else {
        Swal.fire("Atención", "No se pudo eliminar la hora.", "warning");
      }
    } catch (error) {
      console.error("Error al eliminar Hora:", error);
      Swal.fire("Error", "Hubo un problema al eliminar la hora.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return {
    //* Propiedades
    error,
    isLoading,
    horarios,

    //* Métodos
   createHorarios,
    getHorarios,
    setHorarios,
    updateHorarios,
    deleteHora,
}
};
