
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Event as EventIcon,

} from "@mui/icons-material";
import dayjs from "dayjs";
import { Turnos } from "../../types";
import "./ListaTurnos.scss";
import { useHorarios, useMedicos } from "../../hooks";



interface Props {
  turnos: Turnos[];
}


export const ListaTurnos: React.FC<Props> = ({ turnos }) => {

  const {medicos} = useMedicos();
  const {horarios} = useHorarios();
  if (turnos.length === 0) return null; 


  return (
    <Grid container spacing={2} className="lista-turnos-container">
      {turnos.map((turno) => {
        const medico = medicos.find(m => m.idMedico === turno.idMedico);
        const horario = horarios.find(h => h.idHorario === turno.idHorario);
  
        return (
          <Grid item xs={12} sm={6} md={4} key={turno.idTurno}>
            <Paper className="turno-card" elevation={3} sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {turno.estado}
              </Typography>
  
              {/* Horario */}
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Horario">
                  <IconButton>
                    <AccessTimeIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">
                  {horario 
                    ? `${dayjs.utc(`${turno.fecha.split('T')[0]}T${horario.horarioInicio}`).format('HH:mm')} - 
                       ${dayjs.utc(`${turno.fecha.split('T')[0]}T${horario.horarioFin}`).format('HH:mm')}`
                    : "Sin horario"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Médico">
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">
                  {medico ? `${medico.nombre} ${medico.apellido}` : "Sin asignar"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Fecha">
                  <IconButton>
                    <EventIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">
                  {dayjs(turno.fecha).format("DD/MM/YYYY")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
  
};
