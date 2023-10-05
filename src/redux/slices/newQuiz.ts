import { createSlice } from "@reduxjs/toolkit";
import { CreateQuiz, Quiz } from "../../types/quiz";
import { Option } from "../../pages/quiz/types";

const initialQuiz: Omit<CreateQuiz, "options"> & {options: Option[]} = {
    question: "",
    options: []
}

export const newQuizSlice = createSlice({
    initialState: {
        quiz: initialQuiz
    },
    name: "newQuiz",
    reducers: {
        reset: (state) => {
            state.quiz = initialQuiz
        },
        setQuestion: (state, action: {payload: string}) => {
            if(!state.quiz){
                return
            }

            state.quiz.question = action.payload
        },
        updateOptionByIndex: (state, action: { payload: { updated: Option, optionIndex: number } }) => {
            const {optionIndex, updated} = action.payload
            const options = state.quiz?.options

            if(!options?.[optionIndex]){
                console.log("Failed to update option. optionIndex: ", optionIndex)
                return 
            }

            options[optionIndex] = {
                ...(options[optionIndex] || {}),
                ...updated
            }
        },
        updateOptionById: (state, action: { payload: { updated: Partial<Option>, optionId: number } }) => {
            const {optionId, updated} = action.payload
            const options = state.quiz?.options

            if(!options){
                console.log("Failed to update option")
                return 
            }

            state.quiz.options = options.map(op => op.id === optionId ? {
                ...op,
                ...updated
            } : op)
        },
        addOption: (state, action: {payload: Option}) => {
            const options = state.quiz.options
            if(!options){
                return
            }

            options.push(action.payload)
        },
        deleteOptionById: (state, action: {payload: {id: number}}) => {
            const options = state.quiz.options
            if(!options){
                return
            }

            state.quiz.options = options.filter((op) => op.id !== action.payload.id)
        }
    }
})


export const newQuizActions = newQuizSlice.actions