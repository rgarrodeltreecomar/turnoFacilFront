/* eslint-disable @typescript-eslint/no-explicit-any */
  
import React, { useEffect, useState } from 'react';
import './loginStyles.scss';

import { useAppDispatch, useAuthStore, useForm} from '../../hooks'
import {Grid, TextField, Typography, InputAdornment, IconButton, Container, Box, Alert, Link as LinkExport} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {avatarImage, ButtonCustom, Loading, TitleText} from '../../componentes/';
import { clearErrorMessage } from "../../redux/auth";
import { Link } from 'react-router';


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <LinkExport color="inherit" href="https://discord.com/channels/753316178348474369/1336345419793305661">
        Grupo 9
      </LinkExport>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errorMessage, isLoading, startLogin } = useAuthStore();
  const { email, password, error, setFormValues, handleInputChange } = useForm({
    email: "",
    password: "",
    error: {
      email: "",
      password: "",
    },
  });
  
  
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Botón clickeado"); // ✅ Verifica si la función se ejecuta
    console.log("Email:", email); // ✅ Valida el email
    console.log("Password:", password); // ✅ Valida la contraseña
  
    if (email === "" || password === "") {
      console.log("Campos vacíos"); // ✅ Depura validación
      setFormValues((prevState) => ({
        ...prevState,
        error: {
          email: !email ? "Ingrese su email." : "",
          password: !password ? "Ingrese su contraseña " : "",
        },
      }));
      return;
    }
    console.log("Iniciando login..."); // ✅ Confirma que pasa la validación
    startLogin({ email, password });
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorMessage());
    };
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="sm">
     { isLoading && <Loading key="loading-auth" loading={true} /> }
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                 >
                    <Box display="flex" sx={{ margin: "auto", mb: 5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                          
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </Box>
                          <Grid item style={{ padding: "5px" }}>
                      <img
                        src={avatarImage}
                        alt="Avatar"
                        style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                      />
                      </Grid>
                      <TitleText text={'Bienvenido'} align={'center'}></TitleText>
                      <Grid container justifyContent="center">
                            <Grid item xs={8}>
                              <Grid container spacing={3} direction="column" alignItems="center">
                                <Grid item style={{ width: "100%" }}>
                                  <TextField
                                    margin="normal"
                                    type="email"
                                    placeholder='correo@example.com'
                                    required
                                    fullWidth
                                    error={!!error["email"]}
                                    helperText={error["email"] || ""}
                                    id="email"
                                    label="Email"
                                    onChange={handleInputChange}
                                    value={email}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                  />
                                </Grid>
                                <Grid item style={{ width: "100%" }}>
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    error={!!error["password"]}
                                    helperText={error["password"] || ""}
                                    onChange={handleInputChange}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Contraseña'
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid container sx={{ justifyContent: 'flex-end' }}>
                                </Grid>
                                <Grid item container spacing={2} justifyContent="center">
                                  <Grid item>
                                    <ButtonCustom
                                      type="button"
                                      variant="contained"
                                      color="primary"
                                      onClick={handleSubmit}
                                    >
                                      Ingresar
                                    </ButtonCustom>
                                  </Grid>
                                </Grid>
                                {errorMessage && (
                                  <Grid item style={{ width: "100%" }}>
                                    <Alert severity="error" sx={{ my: 1, width: "100%" }}>
                                      {errorMessage}
                                    </Alert>
                                  </Grid>
                                )}
                                <Grid item>
                  <Typography variant="body2">
                    ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
                  </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
     </Box>
  </Container>
  );
};