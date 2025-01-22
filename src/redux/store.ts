
import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./ui";
import { authSlice } from "./auth";



const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;