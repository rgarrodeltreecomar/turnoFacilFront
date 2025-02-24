/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch } from "react-redux";
import { endpoints, turnofacilAPI } from "../services";
import {
  clearErrorMessage,
  finishLoading,
  onChecking,
  onLogin,
  onLogout,
  startLoading
} from "../redux/auth";
import { useAppSelector } from "./useRedux";
import {
  ErrorResponseAuth,
 // ResponseAuthLogin,
  ResponseAuthRenew,
  User,
 // Admin,
 // Medicos,
  Paciente,
  UserLogin,

//  Authenticate,

  
} from "../types";
import { JwtPayload } from "../interface";
import {  AxiosError, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode";





export const useAuthStore = () => {
  const { status, user, errorMessage, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // const startLogin = async ({ email, password }: UserLogin) => {
  //   dispatch(startLoading());
  //   try {
  //     const response = await turnofacilAPI.post<ResponseAuthLogin>(
  //       endpoints.login,
  //       { email, password }
  //     );
  
  //     if (response.status === 200 && response.data) {
  //       const { accessToken, refreshToken, expiration } = response.data.auth;
  //       const user = response.data.user;
  
  //       // Almacenar tokens y datos reales
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("refreshToken", refreshToken);
  //       localStorage.setItem("token_expiration", expiration.toString());
  //       localStorage.setItem("user_session", JSON.stringify(user));
  
  //       dispatch(onLogin(user));
  //       navigate("/home");
  //     }
      
  //     dispatch(finishLoading());
  //     dispatch(clearErrorMessage());
  
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: AxiosError<ErrorResponseAuth> | any) {
  //     let errorMessage = "Credenciales incorrectas";
      
  //     if (error.response?.data) {
  //       const { code, message } = error.response.data;
  //       errorMessage = Array.isArray(message) ? message.join(", ") : message;
  
  //       if (code === "UserNotConfirmedException") {
  //         localStorage.setItem("username_temp", email);
  //         navigate("/confirm");
  //       }
  //     }
  
  //     dispatch(onLogout(errorMessage));
  //     dispatch(finishLoading());
      
  //     // Limpiar tokens en caso de error
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("user_session");
  //   }
  // };



  // const startLogin = async ({ email, password }: UserLogin) => {
  //   dispatch(startLoading());
  //   try {
  //     const response = await turnofacilAPI.post<string>(
  //       endpoints.login,
  //       { email, password }
  //     );
  
  //     if (response.status === 200 && response.data) {
  //       const accessToken = response.data;
  //       const decodedToken = jwtDecode<JwtPayload>(accessToken);
  
  //       // Validación básica
  //       if (!decodedToken.rol) throw new Error('Rol no definido en el token');
  
  //       // Campos base comunes
  //       const baseUser = {
  //         nombre: decodedToken.nombre || '',
  //         apellido: decodedToken.apellido || '',
  //         dni: decodedToken.dni || '',
  //         email: decodedToken.email,
  //         fechaNacimiento: decodedToken.fechaNacimiento || '',
  //         telefono: decodedToken.telefono || '',
  //         direccion: decodedToken.direccion || '',
  //         password: '', // El password no debe almacenarse en el front
  //         idRol: decodedToken.rol
  //       };
  
  //       // Construir usuario específico
  //       let user: User;
  //       switch(decodedToken.rol) {
  //         case 1: // Admin
  //           if (!decodedToken.idUsuario) {
  //             throw new Error('Falta idUsuario para admin');
  //           }
  //           user = {
  //             ...baseUser,
  //             idUsuario: decodedToken.idUsuario
  //           } as Admin;
  //           break;
  
  //         case 2: // Médico
  //           if (!decodedToken.idMedico || !decodedToken.idEspecialidad || decodedToken.sueldo === undefined) {
  //             throw new Error('Datos incompletos para médico');
  //           }
  //           user = {
  //             ...baseUser,
  //             idMedico: decodedToken.idMedico,
  //             idEspecialidad: decodedToken.idEspecialidad,
  //             sueldo: decodedToken.sueldo
  //           } as Medicos;
  //           break;
  
  //         case 3: // Paciente
  //           if (!decodedToken.idPaciente || decodedToken.obraSocial === undefined) {
  //             throw new Error('Datos incompletos para paciente');
  //           }
  //           user = {
  //             ...baseUser,
  //             idPaciente: decodedToken.idPaciente,
  //             obraSocial: decodedToken.obraSocial
  //           } as Paciente;
  //           break;
  
  //         default:
  //           throw new Error('Rol no reconocido');
  //       }
  
  //       // Almacenamiento seguro
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("user_session", JSON.stringify(user));
        
      
  //       dispatch(onLogin(user));
  //       navigate('/home');
  //     }
  
  //     dispatch(finishLoading());
  //     dispatch(clearErrorMessage());
  
  //   } catch (error: AxiosError<ErrorResponseAuth> | any) {
  //     let errorMessage = "Error en el proceso de autenticación";
      
  //     if (error.message.includes('Rol no reconocido')) {
  //       errorMessage = "Configuración de usuario inválida";
  //     } else if (error.response?.data) {
  //       const { code, message } = error.response.data;
  //       errorMessage = Array.isArray(message) ? message.join(", ") : message;
  //     }
  
  //     dispatch(onLogout(errorMessage));
  //     dispatch(finishLoading());
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("user_session");
  //   }
  // };
  

  const startLogin = async ({ email, password }: UserLogin) => {
    console.log('[Login] Iniciando proceso con:', { email: email.slice(0, 3) + '...' });
    dispatch(startLoading());
    
    try {
        console.log('[Login] Enviando solicitud a:', endpoints.login);
        const response = await turnofacilAPI.post<string>(
            endpoints.login,
            { email, password }
        );

        if (response.status === 200 && response.data) {
            const accessToken = response.data;
            const decodedToken = jwtDecode<JwtPayload>(accessToken);
            
            // Mapeo de roles simplificado
            const rolesMap: { [key: string]: number } = {
                'Administrador': 1,
                'Médico': 2,
                'Paciente': 3
            };

            const rolNumerico = rolesMap[decodedToken.rol] || 0;

            // Usuario mínimo viable
            const user: User = {
                email: decodedToken.email,
                idRol: rolNumerico,
                nombre: decodedToken.nombre,
                apellido: decodedToken.apellido,
                dni:  decodedToken.dni,
                direccion:  decodedToken.direccion || 'Apellido temporal',
                telefono:  decodedToken.apellido || 'Apellido temporal',
                fechaNacimiento: decodedToken.apellido || 'Apellido temporal',
                obrasocial: decodedToken.obraSocial,
                id: decodedToken.idUsuario,
                idMedico: decodedToken.idMedico,
                idPaciente: decodedToken.idPaciente,
                password: '' // No necesario almacenar
            } as any; // Usamos any temporalmente

            // Almacenamiento básico
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user_session", JSON.stringify(user));
            
            dispatch(onLogin(user));
            navigate('/home');
        }

        dispatch(finishLoading());
        dispatch(clearErrorMessage());

    } catch (error: any) {
        let errorMessage = "Error en el proceso de autenticación";
        
        if (error.response?.data) {
            errorMessage = Array.isArray(error.response.data.message) 
                ? error.response.data.message.join(", ") 
                : error.response.data.message;
        }

        dispatch(onLogout(errorMessage));
        dispatch(finishLoading());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user_session");
    }
};
const startRegister = async (userData: Paciente) => {
  dispatch(startLoading());

  try {
    const response = await turnofacilAPI.post(endpoints.pacientesRegister, userData);
    console.log("url: ",endpoints.pacientesRegister);
    console.log("Datos: ",userData);
    if (response.status === 201 ||response.status === 204) {
      localStorage.setItem("username_temp", userData.email);


      dispatch(finishLoading()); 
      await Swal.fire({
        icon: 'success',
        title: '¡Todo listo!',
        html: '<div style="font-size: 1.1rem">Cuenta creada exitosamente<br/><span style="font-size: 0.9rem">Ya puedes iniciar sesión</span></div>',
        confirmButtonColor: '#1976d2',
        backdrop: 'rgba(0,0,0,0.4)',
      });

     // dispatch(onLogout("Confirm account."));

      
      navigate("/login");

      return; 
    }

    throw new Error("Registro fallido"); 


  } catch (error: AxiosError<ErrorResponseAuth> | any) {
    console.error("Error en el registro:", error);

    let errorMessage = "Ocurrió un problema durante el registro";
    dispatch(finishLoading());

    if (error.response) {
      const responseError: ErrorResponseAuth = error.response.data;
      const code = responseError.code;
      const message = responseError.message;

      if (code === "UsernameExistsException") {
        errorMessage = "El usuario ya está registrado.";
        dispatch(onLogout(message));
      } else {
        errorMessage = responseError.message[1] || "Hubo un error inesperado.";
        dispatch(onLogout(errorMessage));
      }
    }

    await Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });

  } finally {
    dispatch(finishLoading()); 
  }
};




  const checkAuthToken = async () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userSession = localStorage.getItem("user_session");

    if (!token || !refreshToken || !userSession) return dispatch(onLogout(""));

    dispatch(onChecking());
    try {
      const expiration = localStorage.getItem("token_expiration");

      if (new Date().getTime() > Number(expiration)) {
        dispatch(onLogout(""));
        return;
      }

      // const lastPath = localStorage.getItem("lastPath") || "/";
      // navigate(lastPath, { replace: true });
      const userLogin = JSON.parse(userSession || "") as User;
      dispatch(onLogin(userLogin));

      const response = await turnofacilAPI.post<ResponseAuthRenew>(
        `/renew`,
        { refreshToken }
      );

      if (response.status === HttpStatusCode.Created) {
        const expiresIn = new Date().getTime() + response.data.ExpiresIn * 1000;
        localStorage.setItem("accessToken", response.data.AccessToken);
        localStorage.setItem("token_expiration", expiresIn.toString());
      }
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(""));
    }
  };


  const startLogout = () => {
    dispatch(startLoading());
    try {
   
      const itemsToRemove = [
        "accessToken",
        "refreshToken",
        "token_expiration",
        "user_session",
        "lastPath"
      ];
      
      itemsToRemove.forEach(item => localStorage.removeItem(item));
  
  
      dispatch(onLogout("Sesión cerrada exitosamente"));
      navigate("/login");
  
    } catch (error) {
      console.error("Error en logout:", error);
      dispatch(onLogout("Error al cerrar sesión"));
    } finally {
      dispatch(finishLoading());
    }
  };
  return {
    //* Propiedades
    errorMessage,
    status,
    user,
    isLoading,

    //* Métodos
    checkAuthToken,
    startLogin,
    startRegister,
    startLogout,
  };
};