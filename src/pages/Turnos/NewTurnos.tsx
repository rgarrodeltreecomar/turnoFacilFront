import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import utc from 'dayjs/plugin/utc';
import {
  Container,
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField
} from "@mui/material";
import dayjs from "dayjs";
import { useTurnos, useForm, useAppSelector, useAppDispatch, useHorarios,  } from "../../hooks";
import { TitleText, ButtonCustom } from "../../componentes";
import { Turnos } from "../../types";
import { removeTurnosActive } from '../../redux/turnos';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialForm:Turnos = {
    idTurno: "",
    idHorario: "",
    idMedico: "",
    fecha: "",
    asistencia: false,
    idPaciente: "",
    estado: "",
    horario:[],
    medico: [],

}

export const NewTuenos: React.FC = () => {
  const { isLoading, createTurno, updateTurno } = useTurnos();
  const { turnosActive } = useAppSelector((state) => state.turnos);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  dayjs.extend(utc);
  const {
    formValues,
    setFormValues,
    reset
  } = useForm<Turnos>(initialForm);

    const { getHorarios ,horarios} = useHorarios();

    const handleAddNew = () => {
        const payload = {
          idTurno: uuidv4(),
          idHorario: formValues.idHorario,
          idMedico: formValues.idMedico,
          fecha: formValues.fecha, 
          asistencia: true, 
          estado: formValues.estado
        };
      
        createTurno(payload);
        reset();
      }

  const handleUpdateSelect = () => {
    if (!formValues.idHorario) return;
    updateTurno(formValues);
    dispatch( removeTurnosActive());
    reset();
  };

  const onClickCancel = () => {
    dispatch(removeTurnosActive());
    navigate('/doctors/turns');
    reset();
  };

    useEffect(() => {
      console.log("Datos de usuario", user)
      getHorarios();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if ( turnosActive) {
        setFormValues( turnosActive)
      } else {
        setFormValues(initialForm)
      }
    }, [turnosActive, setFormValues])

  useEffect(() => {
    return () => {
      dispatch(removeTurnosActive());
    };
  }, [dispatch]);

  function formatTime(time: string) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <TitleText 
        text="Nuevo Turno" 
        align="center"
      >
        <Typography component="span" variant="h4">
          {turnosActive ? 'Editar' : ''}
        </Typography>
      </TitleText>
      
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          {user && user.idRol == 2 ? (
            <TextField
              label="Médico"
              value={`${user.nombre} ${user.apellido}`} 
              disabled 
              fullWidth
            />
          ) : (
            <Select
              value={formValues.idMedico}
              label="Médico"
              onChange={(e) => setFormValues({
                ...formValues,
                idMedico: e.target.value
              })}
            >
             
            </Select>
          )}
        </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <DatePicker
                label="Fecha del turno"
                value={formValues.fecha ? dayjs.utc(formValues.fecha) : null}
                onChange={(newValue) => {
                    const utcDate = newValue?.utc().format();
                    setFormValues({
                    ...formValues,
                    fecha: utcDate || ""
                    });
                }}
                format="DD/MM/YYYY"
                sx={{ width: '100%' }}
                />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
              <InputLabel>Horario</InputLabel>
              <Select
                value={formValues.idHorario}
                label="Horario"
                onChange={(e) => setFormValues({
                  ...formValues,
                  idHorario: e.target.value
                })}
              >
              {horarios.map((horario) => (
        <MenuItem key={horario.idHorario} value={horario.idHorario}>
          {`${formatTime(horario.horarioInicio)} - ${formatTime(horario.horarioFin)}`}
        </MenuItem>
      ))}
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formValues.estado}
                label="Estado"
                onChange={(e) => setFormValues({
                  ...formValues,
                  estado: e.target.value
                })}
              >
                <MenuItem value="disponible">Disponible</MenuItem>
                <MenuItem value="reservado">Reservado</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
  
        {/* Botones sin cambios */}
        <Box display="flex" justifyContent="center" gap={2} mt={5}>
          <ButtonCustom variant="outlined" color="secondary" onClick={onClickCancel}>
            Cancelar
          </ButtonCustom>
          <ButtonCustom
            variant="contained"
            color="primary"
            onClick={turnosActive ? handleUpdateSelect : handleAddNew}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : !turnosActive ? "Crear Turno" : "Actualizar"}
          </ButtonCustom>
        </Box>
      </Paper>
    </Container>
  );
};
