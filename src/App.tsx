import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppTheme } from './themes';
import { store } from './redux/store';
import { AppRouter } from './routers/AppRouter';

export const App = () => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </LocalizationProvider>
    </Provider>
  )
}