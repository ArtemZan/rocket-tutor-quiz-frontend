import { Option } from "../pages/quiz/types"

export type CreateQuiz = {
    question: string
    options: Omit<Option, "id">[]
}

export type Quiz = {
    id: number
    question: string
    options: Option[]
}