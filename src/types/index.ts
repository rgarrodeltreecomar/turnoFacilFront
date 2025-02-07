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
    id: string;
    descripcion: string;

  };

  export interface EspecialidadState {
    especialidadActive: Especialidad | null;
    Especialidad: Especialidad[];
  }

 export interface CustomButtonProps {
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    startIcon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void ;
    //onClickSumbit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    sx?: unknown; 
    endIcon?: React.ReactNode;
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

export interface User {
    id?: string;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    fechaNac: string;
    telefono: string;
    direccion: string;
    rol: {
        nombre: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        usuarios: any[];
    }
   
    
};




export interface UserRegister extends User {
    password: string;
    confirmPassword?: string;
    obraSocial: boolean;
    activo: true;
  }
  
export interface Medicos extends User {
    especialidadId: number;
    sueldo: number;
    activo: boolean;
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





