import React, { ChangeEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAuthStore, useFormValid } from '../../hooks';
import { NavLink } from 'react-router-dom';
import { Alert, Checkbox, FormLabel } from '@mui/material';
import { onLogout } from '../../redux/auth';
import { avatarImage, ButtonCustom, Loading, TitleText  } from '../../componentes';
 import { Copyright } from '@mui/icons-material';
import { PacienteRegister } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import './registerStyles.scss'





// TODO remove, this demo shouldn't need to reset the theme.

// // como minimo 1 minúscula, 1 mayúscula , 1 número , 1 carácter especial y 8 carácteres de longitud.
// const regexPassword = new RegExp("(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\\]{}\\-_+=~`|:;\"'<>,.?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}");
// // palabra@palabra.com
// const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
// // Regex - Url con protocolo https
// //const regexUrl = /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$/;

const initialState: PacienteRegister = {
  email: '',
  password: '',
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  telefono: '',
  direccion: '',
  confirmPassword: '',
  obraSocial: false,
  dni: '',
  idPaciente: '',
  idRol: 0,
};

const initialFormErrors = structuredClone(initialState);
export const RegisterPage: React.FC = () => {
 


    const dispatch = useAppDispatch();

    const {
        email,
        password,
        nombre,
        apellido,
        confirmPassword,
        fechaNacimiento,
        telefono,
        direccion,
        obraSocial,
        dni,
        formErrors,
        //setFormValues,
        //setFormErrors,
        
        handleInputChange } = useFormValid(initialState, initialFormErrors);


    const { isLoading, errorMessage, startRegister } = useAuthStore();

    const handleBoxClick = () => {
      handleInputChange({
        target: {
          name: "obraSocial",
          value: !obraSocial,
        },
      } as unknown as ChangeEvent<HTMLInputElement>); 
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleInputChange({
        target: {
          name: "obraSocial",
          value: event.target.checked,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    };

    const validatePass = (): boolean => {
      const password = (document.getElementById("password") as HTMLInputElement)?.value || "";
      const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value || "";
  
      if (password !== confirmPassword) {
          console.error(" Las contraseñas no coinciden");
          alert("Las contraseñas no coinciden");
          return false; // No permitir el envío
      }
      
      return true; // Continuar con el registro
  };
  

//   const handleSubmit = () => {
//     console.log(" Se ha presionado el botón de registro");

//     if (!validatePass()) {
//         console.warn(" No se enviarán los datos porque las contraseñas no coinciden");
//         return;
//     }

//     // Obtener los valores de los inputs
//     const userRegisterData: UserRegister = {
//       email: (document.getElementById("email") as HTMLInputElement)?.value || "",
//       password: (document.getElementById("password") as HTMLInputElement)?.value || "", 
//       nombre: (document.getElementById("nombre") as HTMLInputElement)?.value || "",
//       apellido: (document.getElementById("apellido") as HTMLInputElement)?.value || "",
//       fechaNac: (document.getElementById("fechaNac") as HTMLInputElement)?.value || "",
//       telefono: (document.getElementById("telefono") as HTMLInputElement)?.value || "",
//       direccion: (document.getElementById("direccion") as HTMLInputElement)?.value || "",
//       obraSocial: obraSocial,
//       activo: true,
//       dni: (document.getElementById("dni") as HTMLInputElement)?.value || "",
//       rol: {
//         nombre: 'Paciente',
//         usuarios: []
//       }
//     };

//     console.log(" Datos del usuario para registro:", userRegisterData);

//     // Llamar a startRegister con los datos capturados
//     startRegister(userRegisterData);

//     console.log(" Llamada a startRegister realizada");
// };

const handleSubmit = () => {
  console.log("Se ha presionado el botón de registro");

  if (!validatePass()) return;
  const userRegisterData: PacienteRegister = {
    email,
    password,
    nombre,
    apellido,
    fechaNacimiento,
    telefono,
    direccion,
    dni,
    obraSocial,
    idPaciente: uuidv4(),
    idRol: 3,
  };

  console.log("Datos del usuario para registro:", userRegisterData);
  startRegister(userRegisterData);
};

    useEffect(() => {
        return () => {
            dispatch(onLogout(""));
        }
    }, [dispatch])


    return (
        <Container component="main" maxWidth="sm">
            { isLoading && <Loading key="loading-auth" loading={true} />}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box display="flex" sx={{ margin: 'auto', mb: 5, }}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    
                    }} />
                    
                </Box>
                <Grid item style={{ padding: "5px" }}>
              <img
                src={avatarImage}
                alt="Avatar"
                style={{ width: "90px", height: "90px", borderRadius: "50%" }}
              />
              </Grid>
              <TitleText  align="center" text="Registro de Paciente"></TitleText>
                <Typography component="h1" variant="h5">
                    Nueva Cuenta
                </Typography>
                <Box component="form" noValidate  sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-nombre"
                                name="nombre"
                                required
                                fullWidth
                                error={!!(formErrors["nombre"])}
                                helperText={formErrors["nombre"] || ''}
                                id="nombre"
                                value={nombre}
                                onChange={handleInputChange}
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="apellido"
                                error={!!(formErrors["apellido"])}
                                helperText={formErrors["apellido"] || ''}
                                value={apellido}
                                onChange={handleInputChange}
                                label="Apellido"
                                name="apellido"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                          required
                          fullWidth
                          id="dni"
                          label="DNI"
                          name="dni"
                          value={dni}
                          onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                error={!!(formErrors["email"])}
                                helperText={formErrors["email"] || ''}
                                type='email'
                                value={email}
                                onChange={handleInputChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                error={!!(formErrors["password"])}
                                helperText={formErrors["password"] || ''}
                                label="Contraseña"
                                value={password}
                                onChange={handleInputChange}
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                      
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                error={!!(formErrors["confirmPassword"])}
                                helperText={formErrors["confirmPassword"] || ''}
                                label="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={5.1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                                  label="Fecha de Nacimiento"
                                  value={fechaNacimiento ? dayjs(fechaNacimiento) : null}
                                  onChange={(newValue) => {
                                    handleInputChange({ 
                                      target: { 
                                        name: 'fechaNacimiento', 
                                        value: newValue ? newValue.format('YYYY-MM-DD') : '' 
                                      } 
                                    } as React.ChangeEvent<HTMLInputElement>);
                                  }}
                                  maxDate={dayjs()}
                                  format="YYYY-MM-DD"
                                  slotProps={{
                                    textField: {
                                      required: true,
                                      fullWidth: true,
                                      error: !!(formErrors.fechaNacimiento),
                                      helperText: formErrors.fechaNacimiento || '',
                                    }
                                  }}
                                />
                          </LocalizationProvider>
                        </Grid>
                       < Grid item xs={6.9}>
                       <TextField
                                autoComplete="given-telefono"
                                name="telefono"
                                required
                                fullWidth
                                error={!!(formErrors["telefono"])}
                                helperText={formErrors["telefono"] || ''}
                                id="telefono"
                                value={telefono}
                                onChange={handleInputChange}
                                label="Telefono"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                fullWidth
                                id="direccion"
                                label="Direccion"
                                name="direccion"
                                error={!!(formErrors["direccion"])}
                                helperText={formErrors["direccion"] || ''}
                                type='direccion'
                                value={direccion}
                                onChange={handleInputChange}
                                autoComplete="direccion"
                                placeholder='Calle del Roble, 42, 2ºB'
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}> 
                                <FormLabel>¿Tienes obra social?</FormLabel>
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        ml: 0, 
                                    }}
                                    onClick={handleBoxClick}
                                >
                                    <Checkbox
                                        checked={obraSocial} 
                                        onChange={handleChange}
                                        sx={{
                                            color: 'primary.main',
                                            '& .MuiSvgIcon-root': { fontSize: 30 },
                                        }}
                                    />
                                </Box>
                            </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    {
                        errorMessage && (
                            <Alert severity="error" sx={{ my: 1 }} >{errorMessage}</Alert>
                        )
                    }
                 
                    <Grid item>
                            <Link component={NavLink} to="/login" variant="body2">
                                Ya tienes cuenta? Inciar sesion
                            </Link>
                        </Grid>
                        
                    <Grid container justifyContent="flex-end">
                    <ButtonCustom
                      type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                       onClick={handleSubmit}
                    >
                        Registrarse
                    </ButtonCustom>
                        
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} className="turnofacil-copyright">turnofacil</Copyright>
        </Container >
    );
}