import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Paper, Skeleton } from '@mui/material';
import { DashboardTable, ItemRow, TableCellStyled, TitleText } from '../../componentes';
import { ColumnProps } from '../../types';
import './Dashboard.scss';

export const Home = () => {

  const [, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const consultas = [
    { _id: '1', paciente: 'Juan Pérez', médico: 'Dr. López', servicio: 'Consulta General', fecha: '2025-01-23', estado: 'Pago' },
    { _id: '2', paciente: 'María González', médico: 'Dr. Martínez', servicio: 'Radiografía', fecha: '2025-01-22	', estado: 'Pendiente' },
  ];

  const columns: ColumnProps[] = [
    { text: "Id", align: "left" },
    { text: "Paciente", align: "center" },
    { text: "Médico", align: "center" },
    { text: "Servicio", align: "center" },
    { text: "Fecha", align: "center" },
    { text: "Estado", align: "center" },
  ];
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setConsultas([]);
      setIsLoading(false);
    }, 1500);
  }, []);
  

  return (
    <Container className="dashboard-container" maxWidth="lg">
      <TitleText text="Home" align="center" />
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/* Cards for quick stats */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6">Pacientes</Typography>
                <Typography variant="h4">120</Typography>
                <Button size="small" color="primary">Ver más</Button>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6">Médicos</Typography>
                <Typography variant="h4">15</Typography>
                <Button size="small" color="primary">Ver más</Button>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6">Servicios</Typography>
                <Typography variant="h4">30</Typography>
                <Button size="small" color="primary">Ver más</Button>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6">Citas</Typography>
                <Typography variant="h4">45</Typography>
                <Button size="small" color="primary">Ver más</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
  
      {/* Table for detailed view */}
      <div className="dashboard-table">
        <Typography variant="h5" gutterBottom>
          Consultas Recientes
        </Typography>
        <DashboardTable key="datatable-crops" columns={columns} isLoading={isLoading}>
          {isLoading ? (
            <div>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={40}
                  animation="wave"
                  sx={{ my: 1 }}
                />
              ))}
            </div>
          ) : (
            consultas.map((row) => (
              <ItemRow key={row._id} hover>
                <TableCellStyled align="left">{row._id}</TableCellStyled>
                <TableCellStyled align="center">{row.paciente}</TableCellStyled>
                <TableCellStyled align="center">{row.médico}</TableCellStyled>
                <TableCellStyled align="center">{row.servicio}</TableCellStyled>
                <TableCellStyled align="center">{row.fecha}</TableCellStyled>
                <TableCellStyled align="center">{row.estado}</TableCellStyled>
              </ItemRow>
            ))
          )}
        </DashboardTable>
      </div>
  

    </Container>
  );
  
};


