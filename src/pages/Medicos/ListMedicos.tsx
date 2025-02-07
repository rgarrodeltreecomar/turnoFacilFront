
// import React, { useEffect } from 'react'
// import { useNavigate, Link as RouterLink } from 'react-router-dom'
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Tooltip,
//   Typography,
//   TableContainer,
//   Paper,
// } from '@mui/material'
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   List as ListIcon,
// } from '@mui/icons-material'
// import { useAppDispatch, useForm, useMenuModules } from '../../hooks'
// import { setMenuModulesACtive } from '../../store/menumodules/menuModulesSlice'
// import {
//   DashboardTable,
//   ItemRow,
//   Loading,
//   SearchButton,
//   SearchInput,
//   TableCellStyled,
// } from '../../componentes'
// import { ColumnProps, MenuModules } from '../../types'
// import { TitleText } from '../../componentes'

// const columns: ColumnProps[] = [
//   { text: 'Modulo', align: 'left' },
//   { text: 'System', align: 'center' },
//   { text: 'ID', align: 'center' },
//   { text: 'Menu', align: 'center' },
//   { text: 'Orden', align: 'center' }, 
// ]

// export const ListMedicos: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch = useAppDispatch()
//   const {
//     isLoading,
//     menuModules,
//     getMenuModules,
//     removeMenuModules,
//   } = useMenuModules()
// const { filterText, handleInputChange } = useForm({ filterText: "" });

//   const filterMenuModules = (
//     menuModules: MenuModules[],
//     filterText: string,
//   ): MenuModules[] => {
//     const filteredBySearch = menuModules.filter((menuModules) =>
//       matchesFilter(menuModules, filterText),
//     )
//     return filteredBySearch
//   }

//   const normalizeText = (text: string) => {
//     return text
//       .normalize('NFD')
//       .replace(/[\u0300-\u036f]/g, '')
//       .toLowerCase()
//   }

//   const matchesFilter = (menuModules: MenuModules, filter: string) => {
//     const normalizedFilter = normalizeText(filter)
//     const searchableFields = [
//       menuModules.systemType,
//       menuModules.module,
//       menuModules.menuOption,
//       String(menuModules.id),
//     ]

//     return searchableFields.some((field) =>
//       normalizeText(String(field)).includes(normalizedFilter),
//     )
//   }

// //   const onClickSearch = () => {
// //     if (filterText === '') {
// //       getMenuModules()
// //       return
// //     }
// //   }

// const loge = () => {
//     console.log("Es un log")
//   }

//   const onClickUpdateMenuModules = (item: MenuModules) => {
//     console.log('Item ID:', item._id)
//     dispatch(setMenuModulesACtive(item))
//     navigate(`/menus-modules/${item._id}`)
//   }

//   const handleDeleteMenuModules = (item: MenuModules) => {
//     if (item._id && item._rev) {
//       removeMenuModules(item._id, item._rev)
//       getMenuModules()
//     }
//   }

// //   useEffect(() => {
// //     getMenuModules()
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [])

//   return (
//     <>
//       {isLoading && <Loading loading />}
//       <Container maxWidth="md" sx={{ ml: 0 }}>
//         <Box
//           component="div"
//           display="flex"
//           alignItems="center"
//           sx={{ ml: { sm: 2 }, pt: 2 }}
//         >
//           <ListIcon />
//            <TitleText text="Medicos" align="center" />
//         </Box>
//         <Box component="div" sx={{ mt: 7 }}>
//           <Grid
//             container
//             spacing={0}
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//             sx={{ p: 2, mt: { sm: 2 } }}
//           >
//             <Grid item xs={6} sm={2}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component={RouterLink}
//                 to="/medico/new"
//                 startIcon={<AddIcon />}
//                 sx={{ mb: 2 }}
//               >
//                 Nuevo
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={10}>
//                <Grid container justifyContent="flex-end">
//                               <Grid item xs={8} sm={9.0}>
//                                 <SearchInput
//                                   value={filterText}
//                                   placeholder="Especialidad"
//                                   handleInputChange={handleInputChange}
//                                 />
//                               </Grid>
//                               <Grid item xs={4} sm={3}>
//                                 <SearchButton text="Buscar" 
//                               onClick={() => loge()}
//                                  />
//                               </Grid>
//                               </Grid>
//             </Grid>
//           </Grid>
//           <Box component="div" sx={{ p: 1 }}>
//             <TableContainer
//               key="table-medicos"
//               sx={{
//                 minHeight: '120px',
//                 maxHeight: '540px',
//                 overflow: 'scroll',
//                 mb: 5,
//               }}
//               component={Paper}
//             >
//               <DashboardTable
//                 key="datatable-medicos"
//                 columns={columns}
//                 isLoading={isLoading}
//               >
//                 {filterMenuModules(menuModules, filterText).map((row) => (
//                   <ItemRow key={row._id} hover>
//                     <TableCellStyled align="left">{row.module}</TableCellStyled>
//                     <TableCellStyled align="center">
//                       {row.systemType}
//                     </TableCellStyled>
//                     <TableCellStyled align="center">{row.id}</TableCellStyled>
//                     <TableCellStyled align="center">
//                       {row.menuOption}
//                     </TableCellStyled>
//                     <TableCellStyled align="center">
//                       {row.order}
//                     </TableCellStyled>{' '}
//                     {/* Celda para "Orden" */}
//                     <TableCellStyled align="right">
//                       <Tooltip title="Editar">
//                         <IconButton
//                           aria-label="Editar"
//                           onClick={() => onClickUpdateMenuModules(row)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Eliminar">
//                         <IconButton
//                           onClick={() => handleDeleteMenuModules(row)}
//                           style={{ fontSize: '1rem' }}
//                           color="default"
//                         >
//                           <DeleteIcon name="trash alternate" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCellStyled>
//                   </ItemRow>
//                 ))}
//               </DashboardTable>
//             </TableContainer>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   )
// }
