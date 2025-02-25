import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {
  VITE_API_BASE_URL,
  VITE_API_ESPECIALIDADES,
  VITE_API_MEDICOS,
  VITE_API_PACIENTES,
  VITE_API_CONSULTAS,
  VITE_API_REGISTRO,
  VITE_API_HORARIOS,
  VITE_API_LOGIN,
  VITE_API_FACTURACION,
  VITE_API_CITAS,
  VITE_API_REGISTRO_MEDICO,
  VITE_API_REGISTRO_PACIENTE,
  VITE_API_PAQUETES,       
  VITE_API_SERVICIOS,
  VITE_API_TURNOS,
  VITE_API_TURNOS_DISPONIBLES,
  VITE_API_TURNOS_CREAR,
  VITE_API_TURNOS_RESERVAR,
  VITE_API_TURNOS_CANCELAR       
} = getEnvVariables();

export const endpoints = Object.freeze({
  especialidades: `${VITE_API_BASE_URL}${VITE_API_ESPECIALIDADES}`,
  medicos: `${VITE_API_BASE_URL}${VITE_API_MEDICOS}`,
  pacientes: `${VITE_API_BASE_URL}${VITE_API_PACIENTES}`,
  consultas: `${VITE_API_BASE_URL}${VITE_API_CONSULTAS}`,
  registro: `${VITE_API_BASE_URL}${VITE_API_REGISTRO}`,
  horarios: `${VITE_API_BASE_URL}${VITE_API_HORARIOS}`,
  login: `${VITE_API_BASE_URL}${VITE_API_LOGIN}`,
  facturacion: `${VITE_API_BASE_URL}${VITE_API_FACTURACION}`,
  citas: `${VITE_API_BASE_URL}${VITE_API_CITAS}`,
  medicosRegister: `${VITE_API_BASE_URL}${VITE_API_REGISTRO_MEDICO}`,
  pacientesRegister: `${VITE_API_BASE_URL}${VITE_API_REGISTRO_PACIENTE}`,
  paquetes: `${VITE_API_BASE_URL}${VITE_API_PAQUETES}`,    
  servicios: `${VITE_API_BASE_URL}${VITE_API_SERVICIOS}`,
  turnos: `${VITE_API_BASE_URL}${VITE_API_TURNOS}`,
  turnosDisponibles: `${VITE_API_BASE_URL}${VITE_API_TURNOS_DISPONIBLES}`,
  turnosCrear: `${VITE_API_BASE_URL}${VITE_API_TURNOS_CREAR}`,
  turnosReservar: `${VITE_API_BASE_URL}${VITE_API_TURNOS_RESERVAR}`,
  turnosCancelar: `${VITE_API_BASE_URL}${VITE_API_TURNOS_CANCELAR}`  
});

export const turnofacilAPI = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true 
});