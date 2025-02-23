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
  // //SyncAlt as SyncAltIcon,
  // QueryStats as QueryStatsIcon,
  // Transform as TransformIcon,
  // Agriculture as AgricultureIcon,
 // AddLocationAlt as AddLocationAltIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  //Security as SecurityIcon,
  MedicalServices as MedicalServicesIcon,
  //Gite as GiteIcon,
  //Work as WorkIcon,
  Person as PersonAddIcon,
  //Assignment as AssignmentIcon,
 // Map as MapIcon,
 // BusinessCenter as BusinessCenterIcon,
 // FireTruck as FireTruckIcon,
//   CorporateFare as CorporateFareIcon,
//   Description as DescriptionIcon,
//  // ForwardToInbox as ForwardToInboxIcon,
//   //LocationOn as LocationOnIcon,
//   //Handshake as HandshakeIcon,
 MonetizationOn as MonetizationOnIcon,
  Dashboard as DashboardIcon,
  PersonSearch as PersonSearchIcon,
} from "@mui/icons-material";

import { SideBarProps } from "../../types";
import { useState } from "react";

import { useAppSelector } from "../../hooks";



const keysCollapse = [ "General", "Finanzas"];



export const SideBar: React.FC<SideBarProps> = ({
  drawerWidth,
  open,
  handleSideBarClose
}) => {
  const [openCollapse, setOpenCollapse] = useState('');

  const { pathname } = useLocation();
 

  const onClickMenu = (collapse: string) => setOpenCollapse(collapse === openCollapse ? "" : collapse);

  const { user } = useAppSelector((state) => state.auth);


  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
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
        <Box
          component="div"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ px: 0, py: 1.5 }}
        >
          <IconButton onClick={handleSideBarClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem key="General" disablePadding>
            <ListItemButton
              // component={RouterLink}
              // to="/home"
              onClick={() => onClickMenu(keysCollapse[2])}
            // selected={pathname.includes("/home")}
            >
              <ListItemIcon>
                <MedicalServicesIcon />
              </ListItemIcon>
              <ListItemText primary={"Gestion Medica"} />
              {openCollapse === keysCollapse[2] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[2]}
            in={openCollapse === keysCollapse[2]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/home"
                selected={pathname.includes("home")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Inicio"} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/specialties"
                selected={pathname.includes("/specialties")}
              >
                <ListItemIcon>
                  <MonitorHeartIcon />
                </ListItemIcon>
                <ListItemText primary={"Especialidades"} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/doctors"
                selected={pathname.includes("doctors")} 
              >
                <ListItemIcon>
                  <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText primary={"Medicos"} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/specialties/new"
                selected={pathname.includes("/specialties/new")}
              >
                <ListItemIcon>
                  <AddModeratorIcon/>
                </ListItemIcon>
                <ListItemText primary="Nueva Especilidad" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/schedules"
                selected={pathname.includes("/schedules")}
              >
                <ListItemIcon>
                  <AccessTimeIcon/>
                </ListItemIcon>
                <ListItemText primary="Disponiblidad" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem key="General" disablePadding>
            <ListItemButton
              // component={RouterLink}
              // to="/home"
              onClick={() => onClickMenu(keysCollapse[2])}
            // selected={pathname.includes("/home")}
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary={"Finanzas"} />
              {openCollapse === keysCollapse[2] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[2]}
            in={openCollapse === keysCollapse[2]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
             
            </List>
          </Collapse>
          <Collapse key={keysCollapse[0]}
            in={openCollapse === keysCollapse[0]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              {user && user.idRol == 3 && (
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={RouterLink}
                  to="/home"
                  selected={pathname.includes("/home")}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={("Menu User")} />
                </ListItemButton>
              )}
            </List>
          </Collapse>
          <Collapse key={keysCollapse[1]}
            in={openCollapse === keysCollapse[1]}
            timeout="auto"
            unmountOnExit>
          </Collapse>
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            p: 2,
            textAlign: "right"
          }}
        >
          <Typography variant="body1" color="gray">
         Version Funcional Registros
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};