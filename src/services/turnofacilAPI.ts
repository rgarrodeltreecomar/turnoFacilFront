import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {
  VITE_API_BASE_URL,
  VITE_API_ESPECIALIDADES,
  VITE_API_MEDICOS,
  VITE_API_PACIENTES,
  VITE_API_TURNOS,
  VITE_API_CONSULTAS,
  VITE_API_REGISTRO,
  VITE_API_HORARIOS,
  VITE_API_LOGIN,
  VITE_API_FACTURACION,
  VITE_API_CITAS,
  VITE_API_MEDICOS_REGISTER,
  VITE_API_MEDICOS_PACIENTE
} = getEnvVariables();

export const endpoints = Object.freeze({
  especialidades: `${VITE_API_BASE_URL}${VITE_API_ESPECIALIDADES}`,
  medicos: `${VITE_API_BASE_URL}${VITE_API_MEDICOS}`,
  pacientes: `${VITE_API_BASE_URL}${VITE_API_PACIENTES}`,
  turnos: `${VITE_API_BASE_URL}${VITE_API_TURNOS}`,
  consultas: `${VITE_API_BASE_URL}${VITE_API_CONSULTAS}`,
  registro: `${VITE_API_BASE_URL}${VITE_API_REGISTRO}`,
  horarios: `${VITE_API_BASE_URL}${VITE_API_HORARIOS}`,
  login: `${VITE_API_BASE_URL}${VITE_API_LOGIN}`,
  facturacion: `${VITE_API_BASE_URL}${VITE_API_FACTURACION}`,
  citas: `${VITE_API_BASE_URL}${VITE_API_CITAS}`,
  medicosRegister: `${VITE_API_BASE_URL}${VITE_API_MEDICOS_REGISTER}`,
  medicosPaciente: `${VITE_API_BASE_URL}${VITE_API_MEDICOS_PACIENTE}`
});

export const turnofacilAPI = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true 
});
