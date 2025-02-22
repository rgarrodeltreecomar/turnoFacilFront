import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Medicos, MedicosState } from '../../types';


const initialState: MedicosState  = {
    medicosActive: null,
    Medicos: [],
}


export const medicosSlice = createSlice({
    name: 'Medicos',
    initialState: initialState,
    reducers: {
        setMedicosActive: (state, action: PayloadAction< Medicos>) => {
            state. medicosActive = action.payload;
        },
        removeMedicosActive: (state) => {
            state. medicosActive = null
        },
        loadMedicos: (state, action: PayloadAction< Medicos[]>) => {
            state. Medicos = action.payload;
        },
        removeMedicos: (state) => {
            state. Medicos = [];
        }
    }
});


export const {
    loadMedicos,
    removeMedicos,
    removeMedicosActive,
    setMedicosActive,
} = medicosSlice.actions;