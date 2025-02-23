import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Horarios, HorariosState} from '../../types';


const initialState: HorariosState = {
    horariosActive: null,
    Horarios: [],
}


export const horariosSlice = createSlice({
    name: 'horarios',
    initialState: initialState,
    reducers: {
        setHorarioActive: (state, action: PayloadAction<Horarios>) => {
            state.  horariosActive = action.payload;
        },
        removeHorarioActive: (state) => {
            state.  horariosActive = null
        },
        loadHorario: (state, action: PayloadAction<Horarios[]>) => {
            state.  Horarios = action.payload;
        },
        removeHorario: (state) => {
            state. Horarios = [];
        }
    }
});


export const {
    loadHorario,
    removeHorario,
    removeHorarioActive,
    setHorarioActive,
} = horariosSlice.actions;