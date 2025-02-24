
import React, { useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  TableContainer,
  Paper,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useAppDispatch, useForm, useTurnos, useMedicos, useHorarios} from '../../hooks'
import { setTurnosActive } from '../../redux/turnos'
import {
  ButtonCustom,
  DashboardTable,
  HoraIcon,
  ItemRow,
  Loading,
  SearchButton,
  SearchInput,
  TableCellStyled,
} from '../../componentes'
import { ColumnProps, Turnos } from '../../types'
import { TitleText } from '../../componentes'

const columns: ColumnProps[] = [
  { text: 'Medico', align: 'left' },
  { text: 'Fecha', align: 'center' },
  { text: 'Horario', align: 'center' },
  { text: 'Paciente', align: 'center' },

]

export const ListTurnos: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    isLoading,
    turnos,
    getTurnos,
    deleteTurno,
  } = useTurnos()
  const {
    medicos,
    getMedicos
  } = useMedicos();
  const {
    horarios,
    getHorarios,
  } = useHorarios();
const { filterText, handleInputChange } = useForm({ filterText: "" });
dayjs.extend(utc);

  const filterSearchText = (
   turnos:  Turnos[],
    filterText: string,
  ):   Turnos[] => {
    const filteredBySearch = turnos.filter((turnos) =>
      matchesFilter(turnos, filterText),
    )
    return filteredBySearch
  }

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const matchesFilter = (turno: Turnos, filter: string) => {
    const normalizedFilter = normalizeText(filter)
    const searchableFields = [
        turno.medico,
        turno.idHorario,
    ]

    return searchableFields.some((field) =>
      normalizeText(String(field)).includes(normalizedFilter),
    )
  }

  const onClickSearch = () => {
    if (filterText === '') {
      getTurnos()
      return
    }
  }



  const onClickUpdate = (item:Turnos) => {
    dispatch( setTurnosActive(item));
    navigate(`/turns/${item.idHorario}`);
  };



  const handleDelete = async (item:Turnos) => {
    if (item.idHorario) {
      await deleteTurno(item.idHorario);
      await getTurnos();
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        await getMedicos();
        await getHorarios();
        await getTurnos(); // Cargar turnos al final
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    console.log("Relaciones:", {
      turnos: turnos.map(t => ({
        idTurno: t.idTurno,
        idHorario: t.idHorario,
        horario: horarios.find(h => h.idHorario === t.idHorario)
      })),
      horarios
    });
  }, [turnos, horarios]);
  useEffect(() => {
    console.log('Horarios cargados:', horarios);
    console.log('Turnos:', turnos);
  }, [horarios, turnos]);

  return (
    <>
      {isLoading && <Loading loading />}
       <Container maxWidth="md" sx={{ mb: 4 }}>

         <TitleText text="Misturnos" startIcon={ <HoraIcon whiteBorder sx={{ fontSize: 30, color: "primary.main" }} />} align="center" />
                <Grid container justifyContent="flex-end">
                       <Grid item xs={8} sm={9.0}>
                         <SearchInput
                           value={filterText}
                           placeholder="Horarios"
                           handleInputChange={handleInputChange}
                         />
                       </Grid>
                       <Grid item xs={4} sm={3}>
                         <SearchButton text="Buscar" onClick={() => onClickSearch()} />
                       </Grid>
                       </Grid>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }} >
            <Grid item xs={6} sm={2}>
              <ButtonCustom
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/turns/new"
                startIcon={< HoraIcon whiteBorder />}
                sx={{ mb: 2 }}
              >
                Nuevo
              </ButtonCustom>
          </Grid>
          <Box component="div" sx={{ p: 1 }}>
            <TableContainer
              key="table-turnos"
              sx={{
                minHeight: '120px',
                maxHeight: '540px',
                overflow: 'scroll',
                mb: 5,
              }}
              component={Paper}
            >
              <DashboardTable
                key="datatable-turnos"
                columns={columns}
                isLoading={isLoading}
              >
                {filterSearchText(turnos, filterText).map((row) => {

                const medico = medicos.find(m => m.idMedico === row.idMedico);
                const horario = horarios.find(h => h.idHorario === row.idHorario);
  
                return (
                    <ItemRow key={row.idTurno} hover>
                    {/* Columna Médico */}
                    <TableCellStyled align="left">
                        {medico ? `${medico.nombre} ${medico.apellido}` : 'Sin asignar'}
                    </TableCellStyled>

                    {/* Columna Fecha - Formateada correctamente */}
                    <TableCellStyled align="center">
                        {dayjs.utc(row.fecha).format('DD/MM/YYYY')}
                    </TableCellStyled>

                    {/* Columna Horario - Con formato de horas */}
                    <TableCellStyled align="center">
                    {horario && row.fecha ? 
                        `${dayjs.utc(`${row.fecha.split('T')[0]}T${horario.horarioInicio}`).format('HH:mm')} - 
                        ${dayjs.utc(`${row.fecha.split('T')[0]}T${horario.horarioFin}`).format('HH:mm')}` 
                        : 'Sin horario'}
                    </TableCellStyled>

                    {/* Columna Paciente */}
                    <TableCellStyled align="center">
                        {row.idPaciente ? row.idPaciente : 'Sin asignar'}
                    </TableCellStyled>

                    {/* Acciones */}
                    <TableCellStyled align="right">
                        <Tooltip title="Editar">
                        <IconButton
                            aria-label="Editar"
                            onClick={() => onClickUpdate(row)}
                        >
                            <EditIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => handleDelete(row)}
                            style={{ fontSize: '1rem' }}
                            color="default"
                        >
                            <DeleteIcon name="trash alternate" />
                        </IconButton>
                        </Tooltip>
                    </TableCellStyled>
                    </ItemRow>
                );
                })}
              </DashboardTable>
            </TableContainer>
          </Box>
          </Paper>
      </Container>
    </>
    )

}
