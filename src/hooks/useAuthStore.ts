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




  const startLogin = async ({ email, password }: UserLogin) => {
   
    dispatch(startLoading());
    
    try {
        
        const response = await turnofacilAPI.post<string>(
            endpoints.login,
            { email, password }
        );

        if (response.status === 200 && response.data) {
            const accessToken = response.data;
            const decodedToken = jwtDecode<JwtPayload>(accessToken);
            
     
            const rolesMap: { [key: string]: number } = {
                'Administrador': 1,
                'Médico': 2,
                'Paciente': 3
            };

            const rolNumerico = rolesMap[decodedToken.rol] || 0;

          
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
                password: '' 
            } as any; 


            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user_session", JSON.stringify(user));
            
            dispatch(onLogin(user));
            navigate('/home');
        }

        dispatch(finishLoading());
        dispatch(clearErrorMessage());

    }  catch (error: any) {
      let errorMessage = "Error en el proceso de autenticación";
      
      if (error.response) {
          if (error.response.status === 401) {
              errorMessage = "Credenciales incorrectas. Por favor, verifica tu email y contraseña.";
          } else if (error.response.data) {
              errorMessage = Array.isArray(error.response.data.message) 
                  ? error.response.data.message.join(", ") 
                  : error.response.data.message;
          }
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
    const response = await turnofacilAPI.post(endpoints.patientsRegister, userData);
    console.log("url: ",endpoints.patientsRegister);
    console.log("Datos: ",userData);
    if (response.status === HttpStatusCode.Created) {
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