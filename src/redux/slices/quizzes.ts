import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../../types/quiz";

export const quizzesSlice = createSlice({
    initialState: {
        displayed: [] as Quiz[],
        total: 0
    },
    name: "quizzes",
    reducers: {
        setTotal: (state, action: { payload: number }) => {
            state.total = action.payload
        },
        setQuizes: (state, action: { payload: Quiz[] }) => {
            state.displayed = action.payload
        },
        updateQuizByIndex: (state, action: { payload: { updated: Quiz, index: number } }) => {
            const {index, updated} = action.payload

            if (!state.displayed) {
                console.log("Failed to quiz - no quizes in store")
                return
            }

            state.displayed[index] = {
                ...(state.displayed?.[index] || {}),
                ...updated
            }
        },
        updateQuizOptionByIndex: (state, action: { payload: { isSelected: boolean, quizIndex: number, optionIndex: number } }) => {
            const {quizIndex, optionIndex, isSelected} = action.payload
            const options = state.displayed?.[quizIndex]?.options
            if(!options?.[optionIndex]){
                console.log("Failed to update option. quizIndex: ", quizIndex, ", optionIndex: ", optionIndex)
                return 
            }

            options[optionIndex] = {
                ...(options[optionIndex]),
                isAnswer: isSelected
            }
        }
    }
})

export const quizzesActions = quizzesSlice.actions