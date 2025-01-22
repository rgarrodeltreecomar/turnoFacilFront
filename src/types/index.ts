export interface SideBarProps {
    drawerWidth: number;
    open: boolean;
    handleSideBarClose: () => void;
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


// id: int
// nombre: string
// apellido: string
// dni: string
// Email: string
// fechaNac: Date
// Telefono: string
// direccion: string

