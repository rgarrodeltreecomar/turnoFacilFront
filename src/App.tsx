

import { Provider } from 'react-redux';
import { AppTheme } from './themes';
import { store } from './redux/store';
import { AppRouter } from './routers/AppRouter';

export const  App = () => {
    return (
        <Provider store={store}>
                <AppTheme>
                    <AppRouter />
                </AppTheme>
        </Provider>
    )
}