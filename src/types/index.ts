

export interface SideBarProps {
    drawerWidth: number;
    open: boolean;
    handleSideBarClose: () => void;
};
export interface Authenticate {
    accessToken: string;
    refreshToken: string;
    expiration: number;
  };

  export interface UserLogin {
    email: string;
    password: string;
  }

  export interface ResponseAuthLogin {
    user: User;
    auth: Authenticate;
  }
  export interface ResponseAuthRenew {
    AccessToken: string;
    ExpiresIn: number;
  }
  

  export interface ErrorResponseAuth {
    code:
    | "UserNotConfirmedException"
    | "NotAuthorizedException"
    | "UsernameExistsException";
    message: string;
  }

export interface ColumnProps {
    text: string;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}
export interface Especialidad {
    idEspecialidad?: string;
    detalle: string;
    medicos?:Medicos[];
  };

  export interface EspecialidadState {
    especialidadActive: Especialidad | null;
    Especialidad: Especialidad[];
  }

 export interface CustomButtonProps {
    to?: string;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    startIcon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void ;
    children: React.ReactNode;
    sx?: unknown; 
    endIcon?: React.ReactNode;
   component?: React.ElementType;
  };

  
export interface Horario {
    id: string;
    medicos: string[];  
    dia: string;        
    activo: boolean;
  };

export interface Paquete {
    id: string;
    servicios: string[];
    precio: number;
};
export interface Servicio {
    id: string;
    codigoServicio: string;
    servicios: string[];
    paquetes: Paquete[];
    nombre: string;
    precio: number;
};

export type User = Medicos | PacienteRegister;




export interface PacienteRegister  {
   idPaciente: string,
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  fechaNacimiento: string,
  telefono: string,
  direccion: string,
  password: string,
  idRol: number,
  obraSocial: boolean,
  confirmPassword?:string;
  }
  
export interface Medicos  {
  idMedico: string,
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  fechaNacimiento: string,
  telefono: string,
  direccion: string,
  password: string,
  idRol: number,
  idEspecialidad: string | null,
  sueldo: number;
  }

  export interface MedicosState {
    medicosActive: Medicos| null;
    Medicos: Medicos[];
  }

export interface AuthState {
    status: "checking" | "authenticated" | "not-authenticated";
    user: User | null;
    errorMessage: string;
    isLoading: boolean;
 };

export interface NavBarProps {
    drawerWidth: number;
    open: boolean;
    handleSideBarOpen: () => void;
};





