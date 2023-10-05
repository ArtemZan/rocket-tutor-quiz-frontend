import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Layout } from "../../../utils/Layout";
import { useBackend } from "../../../backend";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Pagination, Stack, Typography } from "@mui/material";
import { CreateQuiz, Quiz as QuizType } from "../../../types/quiz";
import { PagePaper } from "../../../utils/PagePaper";
import { LoadingPanel } from "../../../utils/LoadingPanel";
import { Link } from "react-router-dom";
import { store, useAppSelector } from "../../../redux";
import { useDispatch } from "react-redux";
import { quizzesActions } from "../../../redux/slices/quizzes";

function Option({ name, index, quizIndex }: { name: string, index: number, quizIndex: number }) {
    const dispatch = useDispatch()
    const quizes = useAppSelector(store => store.quizzes.displayed)
    const value = quizes[quizIndex]?.options?.[index]?.isAnswer

    function onSelect(isSelected: boolean) {
        dispatch(quizzesActions.updateQuizOptionByIndex({ isSelected, quizIndex, optionIndex: index }))
    }

    return <Stack direction="row">
        <FormControlLabel label={name} control={<Checkbox checked={value || false} onChange={(_, checked) => onSelect(checked)} />} />
    </Stack>
}

function Quiz({ quiz, index }: { quiz: QuizType, index: number }) {
    function onSubmit() {
        alert("This is not working yet")
    }

    return <Accordion>
        <AccordionSummary>
            <Typography textOverflow="ellipsis" overflow="hidden" style={{ wordBreak: "break-all" }}
                maxHeight={200}>
                {quiz.question}
            </Typography>
            <Typography marginLeft="auto" paddingLeft="1em" whiteSpace="nowrap">
                Author: {quiz.author.name || "Unknown"}
            </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
            {quiz.options?.map((option, optionIndex) => <Option
                name={option.value}
                key={option.id}
                quizIndex={index}
                index={optionIndex} />)}

            <Button
                style={{ marginLeft: "auto" }}
                onClick={onSubmit}
                variant="contained">
                Submit
            </Button>
        </AccordionDetails>
    </Accordion>
}

function QuizzesList({
    setPage,
    quizzesPerPage
}: {
    setPage: Dispatch<SetStateAction<number>>
    quizzesPerPage: number
}) {
    const quizzes = useAppSelector(store => store.quizzes)

    const pagesCount = Math.ceil((quizzes?.total || 0) / quizzesPerPage)

    return <>
        <Stack
            direction="column"
            gap="1em">

            {quizzes?.displayed?.map((quiz, index) => <Quiz
                key={quiz.id}
                quiz={quiz}
                index={index} />)}

            <Pagination
                disabled={pagesCount === 1}
                style={{ margin: "1em auto" }}
                count={pagesCount}
                siblingCount={3}
                onChange={(_, page) => setPage(page)} />
        </Stack>

    </>
}

export function ViewQuizesPage() {
    const quizzes = useAppSelector(store => store.quizzes)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const API = useBackend()

    const quizzesPerPage = 10

    useEffect(() => {
        setIsLoading(true)
        API.getQuizes(page - 1, quizzesPerPage).then(resp => {
            setIsLoading(false)

            if (!resp.success) {
                return
            }

            dispatch(quizzesActions.setQuizes(resp.data?.array))
            dispatch(quizzesActions.setTotal(resp.data?.total))
        })
    }, [page, quizzesPerPage])

    return <Layout title="View quizes">
        <PagePaper
            style={{ width: "100%", margin: "1em", overflow: "auto", position: "relative" }}>
            {quizzes.total ?
                <QuizzesList
                    setPage={setPage}
                    quizzesPerPage={quizzesPerPage} />
                : <Stack direction="column" alignItems="center">
                    <Typography variant="h6" textAlign="center">
                        There are no quizzes yet
                    </Typography>

                    <Button component={Link} to="/quiz/create">Create quizes</Button>
                </Stack>}

            <LoadingPanel open={isLoading} />

        </PagePaper>
    </Layout>
}