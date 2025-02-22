import React, { useEffect, useState } from 'react'
import { ButtonCustom, Loading, TitleText, DoctorIcon } from '../../componentes'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useMedicos,
  useEspecialidades,
} from '../../hooks'
import { Medicos } from '../../types'
import { removeMedicosActive } from '../../redux/medicos'
import Swal from 'sweetalert2'

const initialForm: Medicos = {
  idMedico: '',
  nombre: '',
  apellido: '',
  dni: '',
  email: '',
  fechaNacimiento: '',
  telefono: '',
  direccion: '',
  password: '',
  idRol: 2,
  idEspecialidad: '',
  sueldo: 0
}

export const NewMedicos: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    isLoading,
    createMedicos,
    updateMedicos,
    medicos,
  } = useMedicos()
  const { medicosActive } = useAppSelector((state) => state.medico);
  const { especialidades, getEspecialidades } = useEspecialidades();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    
   // idEspecialidad,
  // idMedico,
    sueldo,
    password,
    nombre,
    apellido,
    dni,
    email,
    fechaNacimiento,
    telefono,
    direccion,
    formValues,
    setFormValues,
    handleInputChange,
    reset,
  } = useForm<Medicos>(initialForm)

  useEffect(() => {
   // getMedicos()
    getEspecialidades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 
  useEffect(() => {
    if (medicosActive) {
      setFormValues(medicosActive)
    } else {
      setFormValues(initialForm)
    }
  }, [medicosActive, setFormValues])

  const handleEspecialidadChange = (newValue: string | null) => {
    if (newValue) {
      setFormValues((prevForm) => ({
        ...prevForm,
        idEspecialidad: newValue, 
      }));
    } else {
      setFormValues((prevForm) => ({
        ...prevForm,
        idEspecialidad: null,
      }));
    }
  };

  const handleVerifyDni = () => {
    const dniExists = medicos.some((medicos) => medicos.dni === dni)
    if (dniExists) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Medico existe',
      }).then(() => {
        setFormValues((prevForm) => ({
          ...prevForm,
          dni: '',
        }))
      })
    }
    return dniExists
  }

  const addMedicos = () => {
    const newMedico = { ...formValues, idMedico: uuidv4() }; 
  
    createMedicos(newMedico); 
    dispatch(removeMedicosActive());
    reset();
  };
  

  const handleupdateMedicos = () => {
    console.log("Es un clic")
    console.log("el medico es " + JSON.stringify(formValues, null, 2))
    if (!formValues.idMedico) return
    updateMedicos(formValues)
    dispatch(removeMedicosActive())
    reset()
  }

  const onClickCancel = () => {
    dispatch(removeMedicosActive())
    navigate('/doctors')
    reset()
  }

  return (
    <>
      <Loading key="loading-new-medico" loading={isLoading} />
      <Container maxWidth="md" sx={{ mb: 4 }}>
      <TitleText text="Medicos" startIcon={ <DoctorIcon sx={{ fontSize: 30, color: "primary.main" }} />} align="center" />
        <Box
          component="div"
          display="flex"
          alignItems="center"
          sx={{ ml: { sm: 2 }, pt: 2 }}
        >
        </Box>
     <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }} >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ my: 3, mb: 5 }}
          >
            {medicosActive ? 'Editar' : 'Nuevo'} Medico
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8} sm={3}>
              <FormControl fullWidth variant="outlined">
              <Autocomplete
                      options={especialidades}
                      getOptionLabel={(option) => option.detalle}
                      value={
                        formValues.idEspecialidad
                          ? especialidades.find(esp => esp.idEspecialidad === formValues.idEspecialidad) 
                          : null
                      }
                      onChange={(_event, newValue) => {
                        handleEspecialidadChange(newValue?.idEspecialidad || null); 
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Especialidad" />
                      )}
                      />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre"
                variant="outlined"
                type="text"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                inputProps={{ maxLength: 30 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Apellido"
                variant="outlined"
                type="text" 
                name="apellido"
                value={apellido}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Dni"
                variant="outlined"
                type="text"
                placeholder='Ejemplo: 44556677'
                name="dni"
                value={dni}
                onBlur={handleVerifyDni}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type='email'
                value={email}
                placeholder='correo@example.com'
                onChange={handleInputChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={3.5}>
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
                   }
                 }}
               />
         </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={telefono}
                onChange={handleInputChange}
                inputProps={{ maxLength: 15 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Dirección"
                name="direccion"
                value={direccion}
                onChange={handleInputChange}
                placeholder='Calle del Roble, 42, 2ºB'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Sueldo"
                type="number"
                name="sueldo"
                value={sueldo}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3.5}>
            <TextField
                 required
                 fullWidth
                 name="password"
                 label="Contraseña"
                 onChange={handleInputChange}
                 value={password}
                 type={showPassword ? "text" : "password"}
                 placeholder='Contraseña'
                 id="password"
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
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: { sm: 5 } }}
          >
            <Grid item xs={12} sm={3}>
              <ButtonCustom variant="outlined" color="secondary" onClick={onClickCancel}>Cancelar</ButtonCustom>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ButtonCustom
                variant="contained"
                color="primary"
                onClick={
                  medicosActive
                    ? handleupdateMedicos
                    : addMedicos
                }
              >
                {!medicosActive ? 'Guardar' : 'Actualizar'}
              </ButtonCustom>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}