
import React, { useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  //Typography,
  TableContainer,
  Paper,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useAppDispatch, useForm, useHorarios} from '../../hooks'
import { setHorarioActive } from '../../redux/horarios'
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
import { ColumnProps, Horarios } from '../../types'
import { TitleText } from '../../componentes'

const columns: ColumnProps[] = [
  { text: 'Inicio', align: 'left' },
  { text: 'Fin', align: 'center' },

]

export const ListHorarios: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    isLoading,
    horarios,
    getHorarios,
    deleteHora,
  } = useHorarios()
const { filterText, handleInputChange } = useForm({ filterText: "" });

  const filterMenuModules = (
    horarios: Horarios[],
    filterText: string,
  ):  Horarios[] => {
    const filteredBySearch =  horarios.filter((horarios) =>
      matchesFilter( horarios, filterText),
    )
    return filteredBySearch
  }

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const matchesFilter = (horario: Horarios, filter: string) => {
    const normalizedFilter = normalizeText(filter)
    const searchableFields = [
        horario.horarioInicio,
        horario.horarioFin,
    ]

    return searchableFields.some((field) =>
      normalizeText(String(field)).includes(normalizedFilter),
    )
  }

  const onClickSearch = () => {
    if (filterText === '') {
      getHorarios()
      return
    }
  }



  const onClickUpdateHorario = (item: Horarios) => {
    dispatch(setHorarioActive(item));
    navigate(`/doctors/schedules/${item.idHorario}`);
  };



  const handleDeleteHorario = async (item: Horarios) => {
    if (item.idHorario) {
      await deleteHora(item.idHorario);
      await getHorarios();
    }
  }

  useEffect(() => {
    getHorarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading && <Loading loading />}
       <Container maxWidth="md" sx={{ mb: 4 }}>

         <TitleText text="Mis Horarios" startIcon={ <HoraIcon whiteBorder sx={{ fontSize: 30, color: "primary.main" }} />} align="center" />
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
                to="/doctors/schedules/new"
                startIcon={< HoraIcon whiteBorder />}
                sx={{ mb: 2 }}
              >
                Nuevo
              </ButtonCustom>
          </Grid>
          <Box component="div" sx={{ p: 1 }}>
            <TableContainer
              key="table-horarios"
              sx={{
                minHeight: '120px',
                maxHeight: '540px',
                overflow: 'scroll',
                mb: 5,
              }}
              component={Paper}
            >
              <DashboardTable
                key="datatable-horarios"
                columns={columns}
                isLoading={isLoading}
              >
                {filterMenuModules(horarios, filterText).map((row) => (
                  <ItemRow key={row.idHorario} hover>
                    <TableCellStyled align="left">{row.horarioInicio}</TableCellStyled>
                    <TableCellStyled align="center">
                      {row.horarioFin}
                    </TableCellStyled>
                      {' '}
                    <TableCellStyled align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          aria-label="Editar"
                          onClick={() => onClickUpdateHorario(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => handleDeleteHorario(row)}
                          style={{ fontSize: '1rem' }}
                          color="default"
                        >
                          <DeleteIcon name="trash alternate" />
                        </IconButton>
                      </Tooltip>
                    </TableCellStyled>
                  </ItemRow>
                ))}
              </DashboardTable>
            </TableContainer>
          </Box>
          </Paper>
      </Container>
    </>
    )

}
