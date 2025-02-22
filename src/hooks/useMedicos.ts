import { useDispatch } from "react-redux";
import { useState} from 'react';
import { turnofacilAPI, endpoints } from '../services/turnofacilAPI'
import { Medicos } from '../types';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import {
    finishLoading,
    startLoading,
  } from "../redux/auth";


export const useMedicos = () => {
  const [medicos, setMedicos] = useState<Medicos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createMedicos = async (medicData: Medicos) => {
   dispatch(startLoading());
    try {
        console.log("Datos a enviar:", medicData);

    
        const datosJSON = JSON.stringify( medicData);
        console.log("Datos a enviar (JSON):", datosJSON);


        const response = await turnofacilAPI.post(endpoints.medicos, medicData);


        if (response.status === 201) {
            dispatch(finishLoading()); 
            Swal.fire("Éxito", "Alta de Mededico creada correctamente.", "success");
            navigate('/doctors');
        } else {
            Swal.fire("Atención", "No se pudo dar de alta.", "warning");
        }
    } catch (error) {
        console.error("Error al dar de alta.:", error);
        
        Swal.fire("Error", "Hubo un problema al crear el usuario.", "error");

    } finally {
        dispatch(finishLoading());
        setIsLoading(false);
        
    }
};



const getMedicos = async () => {
    setIsLoading(true);
    try {
      const response = await turnofacilAPI.get(endpoints.medicos);
  
      if (response.data && response.data.length) {
        const documents: Medicos[] = response.data.map((medico: Medicos) => ({
          idMedico: medico.idMedico,
          nombre: medico.nombre,
          idEspecialidad: medico.idEspecialidad,
          telefono: medico.telefono,
          email: medico.email,
          sueldo: medico.sueldo,
          fechaNacimiento: medico.fechaNacimiento,
          idRol: medico.idRol,
          direccion: medico.direccion,
          apellido: medico.apellido,
          dni: medico.dni
        }));
        setMedicos(documents);
      } else {
        setMedicos([]);
        Swal.fire('Sin resultados', 'No se encontraron médicos.', 'info');
      }
    } catch (error) {
      console.error('Error en getMedicos:', error);
      Swal.fire('Error', 'No se encontraron médicos.', 'error');
      if (error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  



  const updateMedicos = async (formValues: Medicos) => {
    setIsLoading(true);
    try {
        console.log("Datos a actualizar:", formValues);

        const response = await turnofacilAPI.put(
            `${endpoints.medicos}/${formValues.idMedico}`,
            
        );

        console.log("Respuesta de actualización:", response);

        if (response.status === 200 || response.status === 204) {
            Swal.fire("Éxito", "Medico actualizado correctamente.", "success");

            
            setMedicos(prevMedicos =>
                prevMedicos.map(medico =>
                    medico.idMedico === formValues.idMedico ? formValues : medico
                )
            );
        } else {
            Swal.fire("Atención", "No se pudo actualizar el Medico.", "warning");
        }
    } catch (error) {
        console.error("Error al actualizar Medico:", error);
        Swal.fire("Error", "Hubo un problema al actualizar Medico.", "error");
    } finally {
        setIsLoading(false);
    }
};


  const deleteMedicos = async (medicosId: string) => {
    setIsLoading(true);
    try {
      console.log(`Eliminando especialidad con ID: ${medicosId}`);
      const response = await turnofacilAPI.delete(`${endpoints.medicos}/${medicosId}`);
  
      console.log("Respuesta de eliminación:", response);
  
      if (response.status === 200 || response.status === 204) {
        Swal.fire("Éxito", "Medico eliminado correctamente.", "success");
        setMedicos(prevMedicos => 
          prevMedicos.filter(medico => medico.idMedico !== medicosId)
        );
      } else {
        Swal.fire("Atención", "No se pudo eliminar el medico.", "warning");
      }
    } catch (error) {
      console.error("Error al eliminar Medico:", error);
      Swal.fire("Error", "Hubo un problema al eliminar el medico.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return {
    //* Propiedades
    error,
    isLoading,
    medicos,

    //* Métodos
    createMedicos,
    getMedicos,
    setMedicos,
    updateMedicos,
    deleteMedicos,
}
};
