import React from 'react';
import { useAppSelector, useAuthStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/system'
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import { MenuOutlined, ExitToApp } from '@mui/icons-material';
import { avatarImage } from '../AvatarImage/AvatarImage';
import { NavBarProps } from '../../types';


export const NavBar: React.FC<NavBarProps> = ({
  drawerWidth = 240,
  open,
  handleSideBarOpen,
}) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const {startLogout} = useAuthStore();

  const handleLogout = () => {
    startLogout()
  }

  const backgroundPulse = keyframes({
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  })

  const GlassAppBar = styled(AppBar)(({ theme }) => ({
    // Efecto "glass" sutil + gradient con animación
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: theme.palette.text.primary,
    animation: `${backgroundPulse} 10s ease infinite`,
    transition: 'all 0.3s ease-in-out',
  }))

  return (
    
    <GlassAppBar
      position="fixed"
      sx={{
        ...(open && {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }),
      }}
    >
      <Toolbar>
      <IconButton
          color="default"
          edge="start"
          onClick={handleSideBarOpen}
          sx={{
            mr: 2,
            transition: 'transform 0.3s ease',
            ...(open && { display: 'none' }),
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          alignItems="center"
          sx={{
            flexGrow: open ? 1 : 0, 
            transition: 'margin-left 0.3s ease',
            marginLeft: open ? '240px' : '0px',
          }}
        >
          <Avatar
            alt="User Avatar"
            src={avatarImage}
            sx={{ width: 40, height: 40, mr: 1 }}
          />
          <Typography
            onClick={() => navigate('/home')}
            variant="h6"
            noWrap
            component="div"
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': {
                color: '#1976d2',
              },
            }}
          >
            Turno Facil
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            {user?.nombre}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
            sx={{
              '&:hover': {
                color: '#1976d2',
              },
            }}
          >
            <ExitToApp />
          </IconButton>
        </Grid>
      </Toolbar>
      </GlassAppBar>
  );
};
