import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_BASE_URL, VITE_API_ESPECIALIDADES, VITE_API_MEDICOS, VITE_API_PACIENTES, VITE_API_TURNOS, VITE_API_REGISTRO,VITE_API_LOGIN } = getEnvVariables();



export const endpoints = Object.freeze({
  especialidades: `${VITE_API_BASE_URL}${VITE_API_ESPECIALIDADES}`,
  medicos: `${VITE_API_BASE_URL}${VITE_API_MEDICOS}`,
  pacientes: `${VITE_API_BASE_URL}${VITE_API_PACIENTES}`,
  turnos: `${VITE_API_BASE_URL}${VITE_API_TURNOS}`,
  registro: `${VITE_API_BASE_URL}${VITE_API_REGISTRO}`,
  login: `${VITE_API_BASE_URL}${VITE_API_LOGIN}`,
});



export const turnofacilAPI = axios.create({
  baseURL: "https://turno-facil-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true 
});



