import { useState } from 'react';
import { turnofacilAPI, endpoints } from '../services/turnofacilAPI';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Turnos } from '../types';

export const useTurnos = () => {
  const [turnos, setTurnos] = useState<Turnos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const createTurno = async (newTurno: Turnos) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.post(endpoints.shiftsCreate, newTurno, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 201) {
        Swal.fire("Éxito", "Turno creado correctamente.", "success");
        navigate('/turns/new');
      }
    } catch (error) {
      console.error("Error al crear turno:", error);
      Swal.fire("Error", "Hubo un problema al crear el turno.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getTurnos = async () => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.get(endpoints.shiftsAvailable);
      
      if (response.data && response.data.length) {
        const turnosData: Turnos[] = response.data.map((turno: Turnos) => ({
          idTurno: turno.idTurno,
          fecha: turno.fecha,
          idMedico: turno.idMedico,
          estado: turno.estado,
          asistencia: turno.asistencia
        }));
        setTurnos(turnosData);
      } else {
        setTurnos([]);
        Swal.fire('Sin resultados', 'No se encontraron turnos.', 'info');
      }
    } catch (error) {
            console.log(error)
            Swal.fire('Error', 'No se encontraron turnos.', 'error');
            setIsLoading(false);
            if (error) setError(error);
        }finally {
      setIsLoading(false);
    }
  };

  const updateTurno = async (formValues: Turnos) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.put(
        `${endpoints.shifts}/${formValues.idTurno}`,
        formValues,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setTurnos(prev => prev.map(t => 
          t.idTurno === formValues.idTurno ? formValues : t
        ));
        Swal.fire("Éxito", "Turno actualizado!", "success");
        navigate('/turns');
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Error al actualizar el turno", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTurno = async (turnoId: string) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.delete(`${endpoints.shifts}/${turnoId}`);

      if (response.status === 200 || response.status === 204) {
        Swal.fire("Éxito", "Turno eliminado correctamente.", "success");
        setTurnos(prev => prev.filter(t => t.idTurno !== turnoId));
      }
    } catch (error) {
      console.error("Error al eliminar turno:", error);
      Swal.fire("Error", "Hubo un problema al eliminar el turno.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const reserveTurno = async (turnoData: { idTurno: string, idPaciente: string }) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.post(endpoints.shiftsReserve, turnoData);
      
      if (response.status === 200) {
        Swal.fire("Éxito", "Turno reservado correctamente", "success");
        getTurnos(); 
      }
    } catch (error) {
      console.error("Error al reservar turno:", error);
      Swal.fire("Error", "No se pudo reservar el turno", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelTurno = async (turnoId: string) => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.post(endpoints.shiftsCancel, { idTurno: turnoId });
      
      if (response.status === 200) {
        Swal.fire("Éxito", "Turno cancelado correctamente", "success");
        getTurnos(); 
      }
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      Swal.fire("Error", "No se pudo cancelar el turno", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //* Propiedades
    error,
    isLoading,
    turnos,

    //* Métodos
    createTurno,
    getTurnos,
    setTurnos,
    updateTurno,
    deleteTurno,
    reserveTurno,
    cancelTurno
  };
};