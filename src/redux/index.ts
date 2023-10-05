import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { quizzesSlice } from "./slices/quizzes";
import { newQuizSlice } from "./slices/newQuiz";
import { TypedUseSelectorHook, useSelector } from "react-redux";

console.log(newQuizSlice)

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        quizzes: quizzesSlice.reducer,
        newQuiz: newQuizSlice.reducer
    }
})

export type StoreStateType = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector