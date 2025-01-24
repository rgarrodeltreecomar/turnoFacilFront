import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import {
 // Search as SearchIcon,
} from "@mui/icons-material";
import { useEspecialidades, useForm } from "../hooks";
import { Loading, SearchInput, SearchButton,TitleText  } from "../componentes";


const loge = () => {
  console.log("Es un log")
}
export const Especialidades: React.FC = () => {
    const { isLoading, especialidades, getEspecialidades  } = useEspecialidades();
    const { filterText, handleInputChange } = useForm({ filterText: "" });
 

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
              {especialidades.map((especialidad) => (
                <Grid item xs={12} sm={6} md={4} key={especialidad.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {especialidad.detalle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Médicos Asociados:{" "}
                        {especialidad.medicos?.length
                          ? especialidad.medicos.length
                          : "Ninguno"}
                      </Typography>
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
