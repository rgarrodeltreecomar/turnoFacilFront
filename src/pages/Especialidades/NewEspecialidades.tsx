import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Container,
  Paper,
  TextField,

} from "@mui/material";
import {
  Add as AddIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useEspecialidades, useForm, useAppSelector, useAppDispatch } from "../../hooks";
import { TitleText,ButtonCustom  } from "../../componentes";
import { Especialidad } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import { removeEspecialidadActive} from '../../redux/especialidades'




const initialForm: Especialidad = {
  descripcion: "",
  id: "",
}


export const NewEspecialidades: React.FC = () => {
    const { isLoading, createEspecialidades, updateEspecialidad  } = useEspecialidades();
    const { especialidadActive } = useAppSelector((state) => state.especialidad);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


 
const {
    descripcion,
    formValues,
    handleInputChange,
    setFormValues,
    reset,
    } = useForm<Especialidad>(initialForm)

    const handleAddEspecialidad = () => {
        if (!descripcion.trim()) return;

    const newEspecialidad = {
        ...formValues,
        id: uuidv4(),
        
      };
      createEspecialidades(newEspecialidad);
      reset();
    }

    const handleUpdateEspecialidad = () => {
      if (! formValues.id) return;
      updateEspecialidad(formValues);
      dispatch(removeEspecialidadActive())
      reset()
    };
  
 
    const onClickCancel = () => {
      dispatch(removeEspecialidadActive())
      navigate('/specialties')
      reset()
    }
  
    

    useEffect(() => {
      if (especialidadActive)setFormValues(especialidadActive);
      else if (!especialidadActive) {
        setFormValues(initialForm);
      }
    }, [ especialidadActive,  setFormValues]);
    
    useEffect(() => {
      return () => {
        dispatch(removeEspecialidadActive());  // Limpia el estado activo
      };
    }, [dispatch]);
    

    return (
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <TitleText text="Nueva Especialidad Médica" align="center" />
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                label="Especialidad"
                variant="outlined"
                type="text"
                name="descripcion"
                value={descripcion}
                onChange={handleInputChange}
                inputProps={{ maxLength: 30 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} justifyContent="flex-start">
                {/* Botón de Cancelar en la izquierda */}
                {especialidadActive && (
                  <Grid item>
                    <ButtonCustom
                      variant="contained"
                      color="secondary"
                      startIcon={<ClearIcon />}
                      onClick={onClickCancel}
                    >
                      Cancelar
                    </ButtonCustom>
                  </Grid>
                )}
    
                {/* Botón de Agregar o Actualizar en la derecha */}
                <Grid item>
                  <ButtonCustom
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={especialidadActive ? handleUpdateEspecialidad : handleAddEspecialidad}
                  >
                    {isLoading ? "Guardando..." : !especialidadActive ? "Agregar" : "Actualizar"}
                  </ButtonCustom>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
    
    }