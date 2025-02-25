import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  AccessTime as AccessTimeIcon,
  MonitorHeart as MonitorHeartIcon,
  AddModerator as AddModeratorIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MedicalServices as MedicalServicesIcon,
 // Person as PersonAddIcon,
  MonetizationOn as MonetizationOnIcon,
  Dashboard as DashboardIcon,
  PersonSearch as PersonSearchIcon,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";

import { DisponibilidadIcon } from '../../componentes';
import { SideBarProps } from "../../types";
import { useState } from "react";
//import { useAppSelector } from "../../hooks";

export const SideBar: React.FC<SideBarProps> = ({
  drawerWidth,
  open,
  handleSideBarClose
}) => {
  const [openCollapse, setOpenCollapse] = useState('');
  const { pathname } = useLocation();
 // const { user } = useAppSelector((state) => state.auth);

  const onClickMenu = (collapse: string) => setOpenCollapse(collapse === openCollapse ? "" : collapse);

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        sx={{
          width: drawerWidth,
          display: { xs: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box component="div" display="flex" justifyContent="flex-end" alignItems="center" sx={{ px: 0, py: 1.5 }}>
          <IconButton onClick={handleSideBarClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem key="General" disablePadding>
            <ListItemButton onClick={() => onClickMenu("Gestion Medica")}>
              <ListItemIcon>
                <MedicalServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión Médica" />
              {openCollapse === "Gestion Medica" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCollapse === "Gestion Medica"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/home" selected={pathname.includes("home")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>

             
           
                  <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/admin/list-specialties" selected={pathname.includes("/admin/list-specialties")}>
                    <ListItemIcon>
                      <MonitorHeartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Especialidades" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/admin/doctors" selected={pathname.includes("/admin/doctors")}>
                    <ListItemIcon>
                      <PersonSearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Médicos" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/admin/specialties/new" selected={pathname.includes("/admin/specialties/new")}>
                    <ListItemIcon>
                      <AddModeratorIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nueva Especialidad" />
                  </ListItemButton>
           
         
           
              
                  <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/doctors/schedules" selected={pathname.includes("/doctors/schedules")}>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Disponibilidad" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/doctors/turns" selected={pathname.includes("doctors/turns")}>
                    <ListItemIcon>
                      <PendingActionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alta de turnos" />
                  </ListItemButton>
               
             
             
                <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/patient/search-turns" selected={pathname.includes("/patient/search-turns")}>
                  <ListItemIcon>
                    <DisponibilidadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Buscar turnos" />
                </ListItemButton>
              
            </List>
          </Collapse>

          {/* Finanzas */}
          <ListItem key="Finanzas" disablePadding>
            <ListItemButton onClick={() => onClickMenu("Finanzas")}>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Finanzas" />
              {openCollapse === "Finanzas" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCollapse === "Finanzas"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Aquí puedes agregar las rutas de Finanzas si las tienes */}
            </List>
          </Collapse>
        </List>

        {/* Versión del sistema */}
        <Box sx={{ position: "absolute", bottom: 0, right: 0, p: 2, textAlign: "right" }}>
          <Typography variant="body1" color="gray">
            Versión Funcional Minima
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};
