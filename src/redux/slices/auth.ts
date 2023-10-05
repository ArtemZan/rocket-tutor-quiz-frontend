import { SliceCaseReducers, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

type StateType = {
    tokens: {
        accessToken?: string,
        refreshToken?: string,
        parsedAccessToken?: {[key: string]: string}
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        tokens: {}
    } as StateType,
    reducers: {
        setTokens: (state, action: { payload: { accessToken: string, refreshToken: string } }) => {
            state.tokens = action.payload
            state.tokens.parsedAccessToken = action.payload.accessToken && jwtDecode(action.payload.accessToken)
        },
        clearTokens: (state) => {
            state.tokens = {}
        }
    }
})

export const authActions = authSlice.actions