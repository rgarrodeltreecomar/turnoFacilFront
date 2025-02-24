import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Turnos, TurnosState } from '../../types';

const initialState: TurnosState = {
    turnosActive: null,
    Turnos: [],
}

export const turnosSlice = createSlice({
    name: 'Turnos',
    initialState: initialState,
    reducers: {
        setTurnosActive: (state, action: PayloadAction<Turnos>) => {
            state.turnosActive = action.payload;
        },
        removeTurnosActive: (state) => {
            state.turnosActive = null;
        },
        loadTurnos: (state, action: PayloadAction<Turnos[]>) => {
            state.Turnos = action.payload;
        },
        removeTurnos: (state) => {
            state.Turnos = [];
        },
        updateTurnoInList: (state, action: PayloadAction<Turnos>) => {
            state.Turnos = state.Turnos.map(turno => 
                turno.idTurno === action.payload.idTurno ? action.payload : turno
            );
        },
        deleteTurnoFromList: (state, action: PayloadAction<string>) => {
            state.Turnos = state.Turnos.filter(turno => 
                turno.idTurno !== action.payload
            );
        }
    }
});

export const { 
    loadTurnos, 
    removeTurnos, 
    removeTurnosActive, 
    setTurnosActive,
    updateTurnoInList,
    deleteTurnoFromList
} = turnosSlice.actions;

export default turnosSlice.reducer;