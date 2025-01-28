import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_BASE_URL, VITE_API_ESPECIALIDADES, VITE_API_MEDICOS, VITE_API_PACIENTES, VITE_API_TURNOS } = getEnvVariables();


const isSecureConnection = window.location.protocol === 'https:';
const VITE_URL_BASE = isSecureConnection
  ? VITE_API_BASE_URL.replace('http://', 'https://')
  : VITE_API_BASE_URL;

export const endpoints = Object.freeze({
  especialidades: `${VITE_API_BASE_URL}${VITE_API_ESPECIALIDADES}`,
  medicos: `${VITE_API_BASE_URL}${VITE_API_MEDICOS}`,
  pacientes: `${VITE_API_BASE_URL}${VITE_API_PACIENTES}`,
  turnos: `${VITE_API_BASE_URL}${VITE_API_TURNOS}`,
});


export const apiClient = axios.create({
  baseURL: VITE_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


