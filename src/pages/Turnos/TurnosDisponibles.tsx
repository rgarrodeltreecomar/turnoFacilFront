import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Box, Container, Grid, Paper } from '@mui/material';
import { useForm, useTurnos } from '../../hooks';
import { DisponibilidadIcon, ListaTurnos, Loading, SearchButton, SearchInput } from '../../componentes';
import { Turnos, Medicos } from '../../types'; 
import { TitleText } from '../../componentes';

dayjs.extend(utc);

export const TurnosDisponibles: React.FC = () => {
  const { isLoading, turnos, getTurnos } = useTurnos();
  const { filterText, handleInputChange } = useForm({ filterText: '' });

  const filterSearchText = (turnos: Turnos[], filterText: string): Turnos[] => {
    const filteredBySearch = turnos.filter((turno) =>
      matchesFilter(turno, filterText),
    );
    return filteredBySearch;
  };

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const matchesFilter = (turno: Turnos, filter: string) => {
    const normalizedFilter = normalizeText(filter);
    const searchableFields = [turno.medico, turno.idHorario];

    return searchableFields.some((field) =>
      normalizeText(String(field)).includes(normalizedFilter),
    );
  };

  const onClickSearch = () => {
    if (filterText === '') {
      getTurnos();
      return;
    }
  };

  useEffect(() => {
    getTurnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loading loading />}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <TitleText text="Turnos" startIcon={<DisponibilidadIcon />} align="center" />
        <Grid container justifyContent="flex-end">
          <Grid item xs={8} sm={9.0}>
            <SearchInput
              value={filterText}
              placeholder="Especilidad / Medico"
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4} sm={3}>
            <SearchButton text="Buscar" onClick={() => onClickSearch()} />
          </Grid>
        </Grid>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
          <Box component="div" sx={{ p: 1 }}>
            <ListaTurnos
              turnos={filterSearchText(turnos, filterText).map((turno) => ({
                idTurno: turno.idTurno,
                idHorario: turno.idHorario,
                idMedico: turno.medico ? turno.medico.map((medico: Medicos) => medico.nombre).join(', ') : 'Sin médico', 
                fecha: turno.fecha,
                asistencia: turno.asistencia,
                estado: turno.estado,
              }))}
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
};