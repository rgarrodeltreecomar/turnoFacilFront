import React from "react";
import {
  Grid,
  Container,
  Paper,
  TextField,

} from "@mui/material";
import {
  Add as AddIcon,
} from "@mui/icons-material";
import { useEspecialidades, useForm } from "../../hooks";
import { TitleText,ButtonCustom  } from "../../componentes";
import { Especialidad } from "../../types";



const initialForm: Especialidad = {

    descripcion: "",
}


export const NewEspecialidades: React.FC = () => {
    const {  isLoading,createEspecialidades  } = useEspecialidades();


 
const {
    descripcion,
    formValues,
    handleInputChange,
   
    reset,
    } = useForm<Especialidad>(initialForm)

    const handleSubmit = () => {
        if (!descripcion.trim()) return;

    const newEspecialidad = {
        ...formValues,
        
      };
      createEspecialidades(newEspecialidad);
      reset();
    }

  

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
                <ButtonCustom
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleSubmit}
                              
                            >
                                {isLoading ? "Guardando..." : "Guardar"}
                            </ButtonCustom>
                </Grid>
              </Grid>
          </Paper>
        </Container>
      );
    }