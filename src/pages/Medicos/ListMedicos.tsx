
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
  PersonAddAlt as  PersonAddAltIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useAppDispatch, useForm, useMedicos } from '../../hooks'
import { setMedicosActive } from '../../redux/medicos'
import {
  ButtonCustom,
  DashboardTable,
  DoctorIcon,
  ItemRow,
  Loading,
  SearchButton,
  SearchInput,
  TableCellStyled,
} from '../../componentes'
import { ColumnProps, Medicos } from '../../types'
import { TitleText } from '../../componentes'

const columns: ColumnProps[] = [
  { text: 'Nomrbe', align: 'left' },
  { text: 'Apellido', align: 'center' },
  { text: 'Email', align: 'center' },
  { text: 'Sueldo', align: 'center' },
  
]

export const ListMedicos: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    isLoading,
    medicos,
    getMedicos,
    deleteMedicos,
  } = useMedicos()
const { filterText, handleInputChange } = useForm({ filterText: "" });

  const filterMenuModules = (
    medicos: Medicos[],
    filterText: string,
  ): Medicos[] => {
    const filteredBySearch = medicos.filter(( medicos) =>
      matchesFilter( medicos, filterText),
    )
    return filteredBySearch
  }

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const matchesFilter = (medicos:  Medicos, filter: string) => {
    const normalizedFilter = normalizeText(filter)
    const searchableFields = [
        medicos.nombre,
        medicos.apellido,
        medicos.email,
        medicos.telefono,
    ]

    return searchableFields.some((field) =>
      normalizeText(String(field)).includes(normalizedFilter),
    )
  }

//   const onClickSearch = () => {
//     if (filterText === '') {
//       getMenuModules()
//       return
//     }
//   }

const loge = () => {
    console.log("Es un log")
  }

  const onClickUpdateMedicos = (item: Medicos) => {
    console.log('Item ID:', item.idMedico)
    dispatch(setMedicosActive(item))
    navigate(`/doctors/${item.idMedico}`)
  }

  const handleDeleteMedicos = (item: Medicos) => {
    if (item.idMedico ) {
      deleteMedicos(item.idMedico)
      getMedicos()
    }
  }

  useEffect(() => {
    getMedicos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading && <Loading loading />}
       <Container maxWidth="md" sx={{ mb: 4 }}>
      
         <TitleText text="Medicos" startIcon={ <DoctorIcon sx={{ fontSize: 30, color: "primary.main" }} />} align="center" />
                <Grid container justifyContent="flex-end">
                       <Grid item xs={8} sm={9.0}>
                         <SearchInput
                           value={filterText}
                           placeholder="Medicos"
                           handleInputChange={handleInputChange}
                         />
                       </Grid>
                       <Grid item xs={4} sm={3}>
                         <SearchButton text="Buscar" onClick={() => loge()} />
                       </Grid>
                       </Grid>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }} >
            <Grid item xs={6} sm={2}>
              <ButtonCustom
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/doctors/new"
                startIcon={< PersonAddAltIcon />}
                sx={{ mb: 2 }}
              >
                Nuevo
              </ButtonCustom>
         
            {/* <Grid item xs={12} sm={10}>
               <Grid container justifyContent="flex-end">
                  <Grid item xs={8} sm={9.0}>
                    <SearchInput
                      value={filterText}
                      placeholder="Especialidad"
                      handleInputChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <SearchButton text="Buscar" 
                  onClick={() => loge()}
                     />
                  </Grid>
                  </Grid>
            </Grid> */}
          </Grid>
          <Box component="div" sx={{ p: 1 }}>
            <TableContainer
              key="table-medicos"
              sx={{
                minHeight: '120px',
                maxHeight: '540px',
                overflow: 'scroll',
                mb: 5,
              }}
              component={Paper}
            >
              <DashboardTable
                key="datatable-medicos"
                columns={columns}
                isLoading={isLoading}
              >
                {filterMenuModules(medicos, filterText).map((row) => (
                  <ItemRow key={row.idMedico} hover>
                    <TableCellStyled align="left">{row.nombre}</TableCellStyled>
                    <TableCellStyled align="center">
                      {row.apellido}
                    </TableCellStyled>
                    
                    <TableCellStyled align="center">
                      {row.email}
                    </TableCellStyled>
                    <TableCellStyled align="center">
                      {row.sueldo}
                    </TableCellStyled>{' '}
                    <TableCellStyled align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          aria-label="Editar"
                          onClick={() => onClickUpdateMedicos(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => handleDeleteMedicos(row)}
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
