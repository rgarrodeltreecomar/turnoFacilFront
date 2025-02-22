import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEspecialidades, useForm ,useAppDispatch} from "../../hooks";
import { Loading, SearchInput, SearchButton,TitleText  } from "../../componentes";
import {  setEspecialidadActive } from '../../redux/especialidades'
import { Especialidad } from "../../types";



const loge = () => {
  console.log("Es un log")
}
export const Especialidades: React.FC = () => {
    const { isLoading, especialidades, getEspecialidades,deleteEspecialidad  } = useEspecialidades();
    const { filterText, handleInputChange } = useForm({ filterText: "" });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClickUpdateEspecialidades = (item: Especialidad): void => {
      dispatch(setEspecialidadActive(item));
      navigate(`/specialties/${item.idEspecialidad}`);
    };
  
    const handleDeleteEspecialidades = async (item: Especialidad) => {
      console.log("Intentando eliminar especialidad con ID:", item.idEspecialidad);
      if (!item.idEspecialidad) return;
    
      await deleteEspecialidad(item.idEspecialidad);
      setTimeout(() => getEspecialidades());
    };
    
 

    useEffect(() => {
        getEspecialidades();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


      return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
         <TitleText text="Especialidades Médicas" align="center" />
         <Grid container justifyContent="flex-end">
                <Grid item xs={8} sm={9.0}>
                  <SearchInput
                    value={filterText}
                    placeholder="Especialidad"
                    handleInputChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4} sm={3}>
                  <SearchButton text="Buscar" onClick={() => loge()} />
                </Grid>
                </Grid>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }} >
        {isLoading ? (
      <Loading loading={isLoading} />
    ) :  (
            <Grid container spacing={3}>
              {especialidades.map((row) => (
                <Grid item xs={12} sm={6} md={4} key={row.idEspecialidad}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {row.detalle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Médicos Asociados:{" "}
                        
                      "Ninguno"
                      </Typography>
                      <Tooltip title={"Editar"}>
                  <IconButton aria-label="Edit" onClick={() => onClickUpdateEspecialidades(row)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Eliminar"}>
                  <IconButton onClick={() => handleDeleteEspecialidades (row)} style={{ fontSize: '1rem' }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
       </Paper>
        </Container>
      );
};
