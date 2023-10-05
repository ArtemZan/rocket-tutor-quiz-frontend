import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Layout } from "../../../utils/Layout";
import { useBackend } from "../../../backend";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Pagination, Stack, Typography } from "@mui/material";
import { CreateQuiz, Quiz as QuizType } from "../../../types/quiz";
import { PagePaper } from "../../../utils/PagePaper";
import { LoadingPanel } from "../../../utils/LoadingPanel";
import { Link } from "react-router-dom";

function Option({ name }: { name: string }) {
    return <Stack direction="row">
        <FormControlLabel label={name} control={<Checkbox />} />
    </Stack>
}

function Quiz({ quiz }: { quiz: QuizType }) {
    function onSubmit() {
        alert("This is not working yet")
    }

    return <Accordion>
        <AccordionSummary>
            <Typography textOverflow="ellipsis" overflow="hidden" style={{wordBreak: "break-all"}}
            maxHeight={200}>
                {quiz.question}
            </Typography>
            <Typography marginLeft="auto" paddingLeft="1em" whiteSpace="nowrap">
                Author: {quiz.author.name || "Unknown"}
            </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
            {quiz.options?.map(option => <Option name={option.value} key={option.id} />)}
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
    quizzes,
    setPage,
    quizzesPerPage
}: {
    quizzes: Paginated<QuizType>
    setPage: Dispatch<SetStateAction<number>>
    quizzesPerPage: number
}) {
    const pagesCount = Math.ceil((quizzes?.total || 0) / quizzesPerPage)

    return <>
        <Stack
            direction="column"
            gap="1em">

            {quizzes?.array?.map(quiz => <Quiz
                key={quiz.id}
                quiz={quiz} />)}

            <Pagination
                disabled={pagesCount === 1}
                style={{ margin: "1em auto" }}
                count={pagesCount}
                siblingCount={3}
                onChange={(_, page) => setPage(page)} />
        </Stack>

    </>
}

type Paginated<T> = { array: T[], total: number }

export function ViewQuizesPage() {
    const [quizzes, setQuizzes] = useState<Paginated<QuizType>>()
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const API = useBackend()

    const quizzesPerPage = 10

    useEffect(() => {
        setIsLoading(true)
        API.getQuizes(page - 1, quizzesPerPage).then(resp => {
            setIsLoading(false)
            setQuizzes(resp.data)
        })
    }, [API, page, quizzesPerPage])

    return <Layout title="View quizes">
        <PagePaper
            style={{ width: "100%", margin: "1em", overflow: "auto", position: "relative" }}>
            {quizzes?.total ?
                <QuizzesList
                    quizzes={quizzes}
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