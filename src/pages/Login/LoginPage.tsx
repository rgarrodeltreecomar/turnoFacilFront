
import React, { useState } from 'react';
import './loginStyles.scss';
import { Link, useNavigate,} from 'react-router-dom';
import { useAuthStore} from '../../hooks'
import {Grid, TextField, Button, Checkbox, FormControlLabel, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {avatarImage} from '../../componentes/AvatarImage/AvatarImage';


export const LoginPage = () => {
  const { login } = useAuthStore(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  //const [email, setEmail] = useState('');
  const navigate = useNavigate();
  


  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  


 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const loginData = { email: username, password };

  try {
    const result = login(loginData); // Ejecuta el login
    if (result === 'success') {
      console.log('Usuario autenticado');
      navigate('/home'); // Redirige a /home en caso de éxito
    } else {
      setError('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al autenticar:', error);
    setError('Error de red: Intenta nuevamente');
  } finally {
    setLoading(false);
  }
};

  // const onClickCancel = () => {
  //   navigate("/");
  // };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid
        item
        xs={11}
        sm={8}
        md={6}
        lg={8}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleLogin}>
          <Grid container spacing={3} direction="column" alignItems="center">
            {/* Avatar */}
            <Grid item>
              <img
                src={avatarImage}
                alt="Avatar"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email"
                type="text"
                placeholder="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12} style={{ width: "100%" }}>
            <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Recordar"
              />
            </Grid>
            </Grid>
             {/* Buttons */}
             <Grid item container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onClickCancel}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid> */}
            </Grid>
           

            {error && (
              <Grid item>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Grid>
            )}

           

            {/* Register Link */}
            <Grid item>
              <Typography variant="body2">
                ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};