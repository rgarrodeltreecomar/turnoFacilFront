


export interface JwtPayload {
  email: string;
  rol: number;
  exp: number;
  idUsuario?: string;       // Para Admin
  idMedico?: string;        // Para Médico
  idPaciente?: string;      // Para Paciente
  nombre?: string;
  apellido?: string;
  dni?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  idEspecialidad?: string;  // Para Médico
  sueldo?: number;          // Para Médico
  obraSocial?: boolean;     // Para Paciente
}