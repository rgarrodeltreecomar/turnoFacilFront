import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface DashboardProps {
  // Aquí puedes definir las props que necesitará tu dashboard
  // Por ejemplo, datos para los gráficos, tablas, etc.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const Home: React.FC<DashboardProps> = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Tarjeta 1: Resumen */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #ddd' }}>
          <Typography variant="body1">
              Total de usuarios: {data?.totalUsers ?? 'Datos no disponibles'}
            </Typography>
            <Typography variant="body1">
              Ventas totales: {data?.totalSales ?? 'Datos no disponibles'}
            </Typography>
          </Box>
        </Grid>

        {/* Tarjeta 2: Gráfico */}
        <Grid item xs={12} sm={6} md={3}>
          {/* Aquí puedes integrar tu biblioteca de gráficos favorita (e.g., Chart.js, Recharts) */}
          <Box sx={{ p: 2, border: '1px solid #ddd' }}>
            <Typography variant="h6">Ventas por mes</Typography>
            {/* Tu gráfico aquí */}
          </Box>
        </Grid>

        {/* Otras tarjetas con diferentes métricas y visualizaciones */}
        {/* ... */}
      </Grid>
    </Box>
  );
};

