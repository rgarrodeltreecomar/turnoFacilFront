import { Theme, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightBlueTheme: Theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3', // A standard, recognizable blue
        },
        secondary: {
            main: '#1976D2', // A slightly darker blue for contrast
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#E3F2FD' // A very light blue background
        }
    },
    typography: {
        h2: {
            fontFamily: 'Raleway, Arial',
        }
    },
});