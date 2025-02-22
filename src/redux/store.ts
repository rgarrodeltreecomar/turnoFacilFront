
import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./ui";
import { authSlice } from "./auth";
import { especialidadSlice } from "./especialidades";
import { medicosSlice } from "./medicos";



export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    especialidad: especialidadSlice.reducer,
    medico: medicosSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

