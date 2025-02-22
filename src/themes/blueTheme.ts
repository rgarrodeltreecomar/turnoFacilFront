import { Theme, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightBlueTheme: Theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3', 
        },
        secondary: {
            main: '#1976D2', 
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#E3F2FD' 
        }
    },
    typography: {
        h2: {
            fontFamily: 'Raleway, Arial',
        }
    },
});