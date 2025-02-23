

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


  export interface BaseUser {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
    direccion: string;
    password: string;
    idRol: number;
  }
  
  export interface Admin extends BaseUser {
    idUsuario: string;
  }
  
  export interface Medicos extends BaseUser {
    idMedico: string;
    idEspecialidad: string;
    sueldo: number;
  }
  
  export interface Paciente extends BaseUser {
    idPaciente: string;
    obraSocial: boolean;
    confirmPassword?: string;
  }
  
  export type User = Admin | Medicos | Paciente;
  
  export interface Authenticate {
    accessToken: string;
    refreshToken: string;
    expiration: number;
  }

  export interface ErrorResponseAuth {
    code:
    | "UserNotConfirmedException"
    | "NotAuthorizedException"
    | "UsernameExistsException"
    | "InvalidRoleException"; 
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

export interface Horarios {
    idHorario?: string;
    horarioInicio: string;
    horarioFin: string;
}

export interface HorariosState {
  horariosActive: Horarios| null;
  Horarios: Horarios[];
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





