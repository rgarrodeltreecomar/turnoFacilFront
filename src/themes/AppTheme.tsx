import { CssBaseline, ThemeProvider } from "@mui/material";
// import { skyBlueTheme } from "./";
import { lightBlueTheme } from "./blueTheme";

interface AppThemeProps {
    children: React.ReactNode;
}

export const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
    return (
        <ThemeProvider theme={lightBlueTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}