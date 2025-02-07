import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Especialidad, EspecialidadState} from '../../types';


const initialState: EspecialidadState = {
    especialidadActive: null,
    Especialidad: [],
}


export const especialidadSlice = createSlice({
    name: 'Especialidad',
    initialState: initialState,
    reducers: {
        setEspecialidadActive: (state, action: PayloadAction<Especialidad>) => {
            state. especialidadActive = action.payload;
        },
        removeEspecialidadActive: (state) => {
            state. especialidadActive = null
        },
        loadEspecialidad: (state, action: PayloadAction<Especialidad[]>) => {
            state. Especialidad = action.payload;
        },
        removeEspecialidad: (state) => {
            state. Especialidad = [];
        }
    }
});


export const {
    loadEspecialidad,
    removeEspecialidad,
    removeEspecialidadActive,
    setEspecialidadActive,
} = especialidadSlice.actions;