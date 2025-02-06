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
  Settings as SettingsIcon,
  MonitorHeart as MonitorHeartIcon,
  AddModerator as AddModeratorIcon,
  SyncAlt as SyncAltIcon,
  QueryStats as QueryStatsIcon,
  Transform as TransformIcon,
  Agriculture as AgricultureIcon,
  AddLocationAlt as AddLocationAltIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  MedicalServices as MedicalServicesIcon,
  Gite as GiteIcon,
  Work as WorkIcon,
  Person as PersonAddIcon,
  Assignment as AssignmentIcon,
  Map as MapIcon,
  BusinessCenter as BusinessCenterIcon,
  FireTruck as FireTruckIcon,
  CorporateFare as CorporateFareIcon,
  Description as DescriptionIcon,
  ForwardToInbox as ForwardToInboxIcon,
  LocationOn as LocationOnIcon,
  Handshake as HandshakeIcon,
  MonetizationOn as MonetizationOnIcon,
  Dashboard as DashboardIcon,
  PersonSearch as PersonSearchIcon,
} from "@mui/icons-material";
import { Icon } from "semantic-ui-react";
import { SideBarProps } from "../../types";
import { useState } from "react";

import { useAppSelector } from "../../hooks";



const keysCollapse = ["seguridad", "configuracion", "general", "agricultura", "stock", "cosecha", "gestion", "reporting", "wiki", "erp"];



export const SideBar: React.FC<SideBarProps> = ({
  drawerWidth,
  open,
  handleSideBarClose
}) => {
  const [openCollapse, setOpenCollapse] = useState('');

  const { pathname } = useLocation();
  //const version = getEnvVariables().VITE_VERSION;

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
                selected={pathname.includes("doctors")} ////////acacacacacacacaca
              >
                <ListItemIcon>
                  <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText primary={"Medicos"} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/new/specialties"
                selected={pathname.includes("/new/specialties")}
              >
                <ListItemIcon>
                  <AddModeratorIcon/>
                </ListItemIcon>
                <ListItemText primary="Nueva Especilidad" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  {/* <CabinIcon /> */}
                </ListItemIcon>
                <ListItemText primary={("currewqeasds")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/origins-destinations"
                selected={pathname.includes("/init/overview/origins-destinations")}
              >
                <ListItemIcon>
                  <AddLocationAltIcon />
                </ListItemIcon>
                <ListItemText primary={("oasdasd")} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  {/* <CabinIcon /> */}
                </ListItemIcon>
                <ListItemText primary={("asdasdq1")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/zones"
                selected={pathname.includes("/init/overview/zones")}
              >
                <ListItemIcon>
                  < MapIcon />
                </ListItemIcon>
                <ListItemText primary={("12321")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/Labors-services"
                selected={pathname.includes("/init/overview/Labors-services")}
              >
                <ListItemIcon>
                  <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary={("12312")} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/prices"
                selected={pathname.includes("/init/overview/prices")}
              >
                <ListItemIcon>
                  {/* <CabinIcon /> */}
                </ListItemIcon>
                <ListItemText primary={("312312")} />
              </ListItemButton>

            </List>
          </Collapse>
          <ListItem key="2" disablePadding>
            <ListItemButton
              //  component={RouterLink}
              //  to="/"
              onClick={() => onClickMenu(keysCollapse[3])}
             selected={pathname.includes("/a")}
            >
              <ListItemIcon>
                <GiteIcon />
              </ListItemIcon>
              <ListItemText primary={("menu2")} />
              {openCollapse === keysCollapse[3] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[3]}
            in={openCollapse === keysCollapse[3]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={("1312")} />
              </ListItemButton>
              <ListItemButton
                component={RouterLink}
                to="/home"
                selected={pathname.includes("/home")}
              >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={("123")} />
              </ListItemButton>   
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/certificate-deposits"
                selected={pathname.includes("/init/overview/certificate-deposits")}
              >
                <ListItemIcon>
                  <ForwardToInboxIcon />
                </ListItemIcon>
                <ListItemText primary={"123"} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/exit-field"
                selected={pathname.includes("/init/overview/exit-field")}
              >
                <ListItemIcon>
                  <AgricultureIcon />
                </ListItemIcon>
                <ListItemText primary={("123")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/transport-documents"
                selected={pathname.includes("/home")}
              >
                <ListItemIcon>
                  <FireTruckIcon />
                </ListItemIcon>
                <ListItemText primary="123" />
              </ListItemButton>
              <ListItemButton >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={("xd")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/sales-cereals"
                selected={pathname.includes("/init/overview/sales-cereals")}
              >
                <ListItemIcon>
                  <HandshakeIcon />
                </ListItemIcon>
                <ListItemText primary={("123")} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem key="Stock" disablePadding>
            <ListItemButton
               component={RouterLink}
               to="/home"
              onClick={() => onClickMenu(keysCollapse[4])}
             selected={pathname.includes("/init/overview/fields")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={("Menu")} />
              {openCollapse === keysCollapse[4] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[4]}
            in={openCollapse === keysCollapse[4]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/stock-movements"
                selected={pathname.includes("/init/overview/stock-movements")}
              >
                <ListItemIcon>
                  <SyncAltIcon />
                </ListItemIcon>
                <ListItemText primary={("312")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/list-stock"
                selected={pathname.includes("/init/overview/list-stock")}
              >
                <ListItemIcon>
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText primary={("123")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/list-orders"
                selected={pathname.includes("/init/overview/list-orders")}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={("312")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/value-transform"
                selected={pathname.includes("/init/overview/value-transform")}>
                <ListItemIcon>
                  <TransformIcon />
                </ListItemIcon>
                <ListItemText primary={("123e")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/purchase-order"
                selected={pathname.includes("/init/overview/purchase-order")}>
                <ListItemIcon>
                  <Icon name="list alternate outline" size="large" />
                </ListItemIcon>
                <ListItemText primary={("321")} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem key="Gestion" disablePadding>
            <ListItemButton
              // component={RouterLink}
              // to="/init/overview/fields"
              onClick={() => onClickMenu(keysCollapse[6])}
            // selected={pathname.includes("/init/overview/fields")}
            >
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={("Menu123")} />
              {openCollapse === keysCollapse[6] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[6]}
            in={openCollapse === keysCollapse[6]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/corporate-companies"
                selected={pathname.includes("/init/overview/corporate-companies")}
              >
                <ListItemIcon>
                  <CorporateFareIcon />
                </ListItemIcon>
                <ListItemText primary={("asjkd")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/corporate-contract"
                selected={pathname.includes("/init/overview/corporate-contract")}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={("jdas")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/productive-units"
                selected={pathname.includes("init/overview/productive-units")}
              >
                <ListItemIcon>
                  <MapIcon sx={{ marginRight: "-5px", }} />
                  <LocationOnIcon sx={{ marginRight: "28px", fontSize: "inherit", verticalAlign: "middle" }} />
                </ListItemIcon>
                <ListItemText primary={("gay el que lea")} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={RouterLink}
                to="/init/overview/costs-expenses"
                selected={pathname.includes("init/overview/costs-expenses")}
              >
                <ListItemIcon>
                   <MonetizationOnIcon />
                  {/* <LocationOnIcon sx={{ marginRight: "28px", fontSize: "inherit", verticalAlign: "middle" }} /> */}
                </ListItemIcon>
                <ListItemText primary={("4321")} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem key="Seguridad" disablePadding>
            <ListItemButton
              // component={RouterLink}
              // to="/init/overview/fields"
              onClick={() => onClickMenu(keysCollapse[0])}
            // selected={pathname.includes("/init/overview/fields")}
            >
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary={("menus")} />
              {openCollapse === keysCollapse[0] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse key={keysCollapse[0]}
            in={openCollapse === keysCollapse[0]}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              {user && user.rol === "medico" && (
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
          <ListItem key="Configuracion" disablePadding>
            <ListItemButton
              // component={RouterLink}
              // to="/init/overview/fields"
              onClick={() => onClickMenu(keysCollapse[1])}
            // selected={pathname.includes("/init/overview/fields")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={("Menu")} />
              {openCollapse === keysCollapse[1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
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
         VersionBeta
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};