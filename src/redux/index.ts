import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export type StateType = ReturnType<typeof store.getState>