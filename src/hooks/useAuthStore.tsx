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
  Authenticate,
  ErrorResponseAuth,
  //ErrorResponseAuth,
//  ResponseAuthLogin,
  ResponseAuthRenew,
  User,
  UserLogin,
  UserRegister,
  
} from "../types";

import {  AxiosError, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//import { convertTimestampToDate } from "../helpers";



export const useAuthStore = () => {
  const { status, user, errorMessage, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const startLogin = async ({ email, password }: UserLogin) => {
  //   // dispatch(onChecking());
  //   dispatch(startLoading());
  //   try {
  //     const response = await turnofacilAPI.post<ResponseAuthLogin>(
  //       `${endpoints.login}`,
  //       {
  //         email,
  //         password
  //       }
  //     );
  //     if (response.data) {
  //       const { auth, user } = response.data;
  //       const { accessToken, refreshToken, expiration } = auth;
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("refreshToken", refreshToken);
  //       localStorage.setItem(
  //         "token_expiration",
  //         convertTimestampToDate(expiration).getTime().toString()
  //       );
  //       localStorage.setItem("user_session", JSON.stringify(user));
  //       dispatch(onLogin(user));
  //     }
  //     dispatch(finishLoading());
  //     dispatch(clearErrorMessage());
  //   } catch (error: AxiosError<ErrorResponseAuth> | any) {
  //     if (error.response && error.response.data) {
  //       const responseError: ErrorResponseAuth = error.response.data;
  //       const code = responseError.code;
  //       const message = responseError.message;

  //       dispatch(onLogout(message));
  //       if (code === "UserNotConfirmedException") {
  //         localStorage.setItem("username_temp", email);
  //         navigate("/confirm");
  //       }
  //     }
  //     dispatch(finishLoading());
  //      dispatch(onLogout('Incorrect username or password.'));
  //      dispatch(clearErrorMessage());
  //   }
  // };

  const startLogin = async ({ email, password }: UserLogin) => {
    dispatch(startLoading());
    try {
      // Enviar solicitud al backend (respuesta real)
      const response = await turnofacilAPI.post(`${endpoints.login}`, { email, password });
  
      // Si el backend responde 200, asumir que el usuario es válido
      if (response.status === 200) {
        // Generar datos mock del usuario (temporal)
        const mockUser: User = {
          id: "1",
          nombre: "Crotolamo",
          apellido: "Real",
          email: email,
          fechaNac: "2000-01-01",
          telefono: "123456789",
          direccion: "Calle Falsa 123",
          rol: {
            nombre: "Paciente",
            usuarios: []
          },
          dni: "sabra dios"
        };
  
        // Generar token mock (simula backend)
        const mockAuth: Authenticate = {
          accessToken: "mock_token_" + btoa(email),
          refreshToken: "mock_refresh_" + btoa(email),
          expiration: Date.now() + 3600 * 1000, // 1 hora
        };
  
        // Almacenar en localStorage
        localStorage.setItem("accessToken", mockAuth.accessToken);
        localStorage.setItem("user_session", JSON.stringify(mockUser));
        dispatch(onLogin(mockUser));
        navigate("/home");
      }
  
      dispatch(finishLoading());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Si el backend retorna error, mostrar mensaje
      dispatch(onLogout("Credenciales incorrectas"));
      dispatch(finishLoading());
    }
  };
//   const startRegister = async ( userData: UserRegister) => {
//     console.log("Iniciando registro para:", userData);
//     dispatch(onChecking());
//     dispatch(startLoading());

//     try {
//         console.log("Enviando petición a:", `/pacientes`);
        
//         const response = await turnofacilAPI.post(endpoints.pacientes, 
//           userData, 
//           {
//               headers: {
//                   'Content-Type': 'application/json' // Asegura el formato JSON
//               }
//           }
//       );

//         console.log("Respuesta del servidor recibida:", response);

//         if (response.status === HttpStatusCode.Created) {
//             console.log("Registro exitoso. Email:",userData);
//             localStorage.setItem("username_temp", userData.email);
//             dispatch(onLogout("Confirm account."));
//             navigate("/confirm");
//             return dispatch(finishLoading());
//         } else {
//             console.warn("Registro no fue exitoso, código de estado:", response.status);
//         }
//     } catch (error) {
//         console.error("Error en startRegister:", error);

//         if (error) {
//             console.error("Error en la respuesta del servidor:", error);
//             console.error("Código de estado:", error);
//             console.error("Mensaje del servidor:", error);
//         // eslint-disable-next-line no-dupe-else-if
//         } else if (error) {
//             console.error("No se recibió respuesta del servidor. Request:", error);
//         } else {
//             console.error("Error desconocido:", error);
//         }

//         dispatch(finishLoading());
//     }
// };



// const startRegister = async (userData: UserRegister) => {
//   dispatch(startLoading());
  
//   try {
//     const response = await turnofacilAPI.post(endpoints.pacientes, userData);

//     if (response.status === 201) {
//       // Guardar temporalmente el email para futuras verificaciones
//       localStorage.setItem("username_temp", userData.email);
      
//       await Swal.fire({
//         icon: 'success',
//         title: '¡Todo listo!',
//         html: '<div style="font-size: 1.1rem">Cuenta creada exitosamente<br/><span style="font-size: 0.9rem">Ya puedes iniciar sesión</span></div>',
//         confirmButtonColor: '#1976d2',
//         backdrop: 'rgba(0,0,0,0.4)',
//       });

//       dispatch(onLogout("Confirm account.")); // Estado de logout forzando la confirmación
//       navigate("/login");

//       return dispatch(finishLoading()); // Finaliza la carga después de navegar
//     }

//     throw new Error("Registro fallido"); 
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: AxiosError<ErrorResponseAuth> | any) {
//     console.error("Error en el registro:", error);

//     let errorMessage = "Ocurrió un problema durante el registro";

//     if (error.response) {
//       const responseError: ErrorResponseAuth = error.response.data;
//       const code = responseError.code;
//       const message = responseError.message;

//       if (code === "UsernameExistsException") {
//         errorMessage = "El usuario ya está registrado.";
//         dispatch(onLogout(message));
//       } else {
//         errorMessage = responseError.message[1] || "Hubo un error inesperado.";
//         dispatch(onLogout(errorMessage));
//       }
//     }

//     await Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: errorMessage,
//     });

//   } finally {
//     dispatch(finishLoading()); // Asegura que la carga finaliza incluso en caso de error
//   }
// };


const startRegister = async (userData: UserRegister) => {
  dispatch(startLoading());

  try {
    const response = await turnofacilAPI.post(endpoints.pacientes, userData);

    if (response.status === 201) {
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

      return; // Salir de la función aquí
    }

    throw new Error("Registro fallido"); 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: AxiosError<ErrorResponseAuth> | any) {
    console.error("Error en el registro:", error);

    let errorMessage = "Ocurrió un problema durante el registro";

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
    dispatch(finishLoading()); // Asegurar que siempre termina la carga
  }
};


  const startConfirm = async (confirmationCode: string) => {
    dispatch(startLoading());
    try {
      const email = localStorage.getItem("username_temp");
      if (!email) return dispatch(onLogout(""));

      const response = await turnofacilAPI.post(`/confirm`, {
        email,
        confirmationCode
      });

      if (response.status === HttpStatusCode.Created) {
        localStorage.removeItem("username_temp");
        dispatch(onLogout(""));
        navigate("/login");
        return dispatch(finishLoading());
      }
    } catch (error) {
      dispatch(onLogout("Por favor volve a intentar en unos minutos."));
      dispatch(clearErrorMessage());
      localStorage.removeItem("username_temp");
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

  // const checkAuthToken = async () => {

  //   dispatch(onChecking())
  //   try {
  //     localStorage.setItem('accessToken', "");
  //     localStorage.setItem('token_expiration', "");

  //     const lastPath = localStorage.getItem("lastPath") || "/";

  //     dispatch(onLogin({ isAdmin: true, firstName: 'test', accountId: "test", id: "asd123", lastName: "pepe" }));
  //     navigate(lastPath, { replace: true });

  //   } catch (error) {
  //     localStorage.clear();
  //     dispatch(onLogout(""));
  //   }
  // }
  const startLogout = () => {
    dispatch(startLoading());
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token_expiration");
      localStorage.removeItem("user_session");
      localStorage.removeItem("lastPath");

      dispatch(onLogout("User logged out successfully."));

      navigate("/login");
    } catch (error) {
      console.error("Error during logout: ", error);
      dispatch(onLogout("Error during logout."));
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
    startConfirm,
    startLogout
  };
};