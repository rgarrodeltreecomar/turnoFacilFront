export interface SideBarProps {
    drawerWidth: number;
    open: boolean;
    handleSideBarClose: () => void;
};
export interface ColumnProps {
    text: string;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}
export interface Especialidad {
    id: number;
    detalle: string;
    medicos: Medico[] | null;  
  };

 export interface CustomButtonProps {
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    startIcon?: React.ReactNode;
    onClick?: () => void;
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
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    fechaNac: string;
    telefono: string;
    direccion: string;
    rol: string;
};
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
export interface Medico {
    nombre: string;
    apellido: string;
    especialidad: Especialidad;  
    activo: boolean;
};


// id: int
// nombre: string
// apellido: string
// dni: string
// Email: string
// fechaNac: Date
// Telefono: string
// direccion: string

