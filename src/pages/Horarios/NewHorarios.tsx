import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useHorarios, useForm, useAppSelector, useAppDispatch } from "../../hooks";
import { TitleText, ButtonCustom } from "../../componentes";
import { Horarios } from "../../types";
import { removeHorarioActive } from '../../redux/horarios';
import { v4 as uuidv4 } from 'uuid';

const initialForm: Horarios = {
  horarioInicio: "",
  horarioFin: ""
}

export const NewHorarios: React.FC = () => {
  const { isLoading, createHorarios, updateHorarios } = useHorarios();
  const { horariosActive } = useAppSelector((state) => state.horarios);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    formValues,
    setFormValues,
    reset
  } = useForm<Horarios>(initialForm);

  const handleAddHorarios = () => {
   const newHorario = { ...formValues, idHorario: uuidv4() }; 
    createHorarios(newHorario);
    console.log("Horario a enviar",newHorario, "dato:", formValues)
    reset();
  }

  const handleUpdateHorario = () => {
    if (!formValues.idHorario) return;
    updateHorarios(formValues);
    dispatch(removeHorarioActive());
    reset();
  };

  const onClickCancel = () => {
    dispatch(removeHorarioActive());
    navigate('/doctors/schedules');
    reset();
  };


    useEffect(() => {
      if (horariosActive) {
        setFormValues(horariosActive)
      } else {
        setFormValues(initialForm)
      }
    }, [horariosActive, setFormValues])

  useEffect(() => {
    return () => {
      dispatch(removeHorarioActive());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
       <TitleText 
      text="Disponibilidad" 
      align="center"
    >
      <Typography component="span" variant="h4">
        {horariosActive ? 'Editar' : ''}
      </Typography>
    </TitleText>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <TimePicker
              label="Inicio"
              value={formValues.horarioInicio ? dayjs(formValues.horarioInicio, "HH:mm:ss") : null}
              onChange={(newValue) => setFormValues({ ...formValues, horarioInicio: newValue?.format("HH:mm:ss") || "" })}
              ampm={false}
            />
            <TimePicker
              label="Fin"
              value={formValues.horarioFin ? dayjs(formValues.horarioFin, "HH:mm:ss") : null}
              onChange={(newValue) => setFormValues({ ...formValues, horarioFin: newValue?.format("HH:mm:ss") || "" })}
              ampm={false}
            />
          </Box>


          <Box display="flex" justifyContent="center" gap={20} mt={5}>
            <ButtonCustom variant="outlined" color="secondary" onClick={onClickCancel}>
              Cancelar
            </ButtonCustom>
            <ButtonCustom
              variant="contained"
              color="primary"
              onClick={horariosActive ? handleUpdateHorario : handleAddHorarios}
            >
              {isLoading ? "Guardando..." : !horariosActive ? "Guardar" : "Actualizar"}
            </ButtonCustom>
          </Box>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
};
