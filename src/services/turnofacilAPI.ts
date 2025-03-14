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
  VITE_API_TURNOS_CANCELAR,
  VITE_API_PAQUETES_SERVICIOS,       
} = getEnvVariables();

export const endpoints = Object.freeze({
  specialties: `${VITE_API_BASE_URL}${VITE_API_ESPECIALIDADES}`,
  doctors: `${VITE_API_BASE_URL}${VITE_API_MEDICOS}`,
  patients: `${VITE_API_BASE_URL}${VITE_API_PACIENTES}`,
  queries: `${VITE_API_BASE_URL}${VITE_API_CONSULTAS}`,
  register: `${VITE_API_BASE_URL}${VITE_API_REGISTRO}`,
  schedules: `${VITE_API_BASE_URL}${VITE_API_HORARIOS}`,
  login: `${VITE_API_BASE_URL}${VITE_API_LOGIN}`,
  billing: `${VITE_API_BASE_URL}${VITE_API_FACTURACION}`,
  quotes: `${VITE_API_BASE_URL}${VITE_API_CITAS}`,
  doctorsRegister: `${VITE_API_BASE_URL}${VITE_API_REGISTRO_MEDICO}`,
  patientsRegister: `${VITE_API_BASE_URL}${VITE_API_REGISTRO_PACIENTE}`,
  packages: `${VITE_API_BASE_URL}${VITE_API_PAQUETES}`,    
  services: `${VITE_API_BASE_URL}${VITE_API_SERVICIOS}`,
  packagesService:`${VITE_API_BASE_URL}${VITE_API_PAQUETES_SERVICIOS}`,
  shifts: `${VITE_API_BASE_URL}${VITE_API_TURNOS}`,
  shiftsAvailable: `${VITE_API_BASE_URL}${VITE_API_TURNOS_DISPONIBLES}`,
  shiftsCreate: `${VITE_API_BASE_URL}${VITE_API_TURNOS_CREAR}`,
  shiftsReserve: `${VITE_API_BASE_URL}${VITE_API_TURNOS_RESERVAR}`,
  shiftsCancel: `${VITE_API_BASE_URL}${VITE_API_TURNOS_CANCELAR}`  
});

export const turnofacilAPI = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true 
});