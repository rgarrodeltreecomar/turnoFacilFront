
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Icon, Table } from 'semantic-ui-react';
import './Dashboard.scss';

export const Home = () => {
  return (
    <Container className="dashboard-container" maxWidth="lg">
      <Typography variant="h4" className="dashboard-title" gutterBottom>
        User Dashboard
      </Typography>
      
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

      {/* Table for detailed view */}
      <div className="dashboard-table">
        <Typography variant="h5" gutterBottom>
          Consultas Recientes
        </Typography>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Paciente</Table.HeaderCell>
              <Table.HeaderCell>Médico</Table.HeaderCell>
              <Table.HeaderCell>Servicio</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Juan Pérez</Table.Cell>
              <Table.Cell>Dr. López</Table.Cell>
              <Table.Cell>Consulta General</Table.Cell>
              <Table.Cell>2025-01-23</Table.Cell>
              <Table.Cell>
                <Icon name="check circle" color="green" /> Pagado
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>María González</Table.Cell>
              <Table.Cell>Dr. Martínez</Table.Cell>
              <Table.Cell>Radiografía</Table.Cell>
              <Table.Cell>2025-01-22</Table.Cell>
              <Table.Cell>
                <Icon name="clock outline" color="yellow" /> Pendiente
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
};


