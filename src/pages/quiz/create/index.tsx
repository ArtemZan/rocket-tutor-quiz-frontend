import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Alert, AlertColor, Backdrop, Button, CircularProgress, Paper, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Add, Save } from "@mui/icons-material"
import { Options } from "./Options";
import { Layout } from "../../../utils/Layout";
import { Option } from "../types";
import { useBackend } from "../../../backend";
import { Link } from "react-router-dom";
import { useAuth } from "../../../utils/auth/useAuth";
import { LoadingPanel } from "../../../utils/LoadingPanel";

function CreateQuiz() {
    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState<Option[]>([])
    const [notification, setNotification] = useState<{
        isVisible: boolean
        severity?: AlertColor
        msg: string
    }>()
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<string>()

    const API = useBackend()

    // Returns whether the data is valid
    function validate() {
        if (!question) {
            setError("Enter your question")
            return
        }

        if (!options || options.length < 2) {
            setError("You must provide at least 2 choices")
            return
        }

        if (options.some(op => !op.value)) {
            setError("Empty choices are not allowed")
            return
        }

        if (!options.some(op => op.isAnswer)) {
            setError("Choose at least 1 answer as correct")
            return
        }

        return true
    }

    async function onSubmit() {
        const isValid = validate()
        if (!isValid) {
            return
        }

        setIsLoading(true)
        setError(null)
        
        const resp = await API.createQuiz({
            question,
            options: options.map(op => {
                const { id, ...withoutId } = op
                return withoutId
            })
        })
        setIsLoading(false)

        if (!resp.success) {
            return
        }


        setNotification({
            msg: "Successfully created a quiz!",
            isVisible: true
        })

        setOptions([])
        setQuestion("")
    }

    return <Paper
        elevation={2}
        style={{
            padding: "3em",
            margin: "5em auto auto",
            minWidth: "250px",
            position: "relative"
        }}>
        <Stack
            direction="column"
            alignItems="flex-start"
            gap={1}>
            <TextField
                fullWidth
                label="Enter your question"
                size="small"
                name="quiz question"
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />


            <Options
                error={error}
                options={options}
                setOptions={setOptions} />

            <Button
                variant="contained"
                startIcon={<Save />}
                style={{ marginLeft: "auto", marginTop: "1em" }}
                onClick={onSubmit}>
                Save
            </Button>
        </Stack>

        <Snackbar
            autoHideDuration={3000}
            open={notification?.isVisible}
            onClose={() => setNotification(notification => ({ ...notification, isVisible: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert severity={notification?.severity || "success"} variant="filled">
                {notification?.msg}
            </Alert>
        </Snackbar>

        <LoadingPanel open={isLoading} />
    </Paper>
}

function RequestLoginPage() {
    return <Stack
        direction="column"
        margin="auto"
        padding="2em">
        <Typography variant="h3" textAlign="center">You must login to create quizes</Typography>
        <Button component={Link} to="/login" size="large" variant="contained" style={{ margin: "1em auto" }}>Login</Button>
    </Stack>
}

export function CreateQuizPage() {
    const auth = useAuth()

    const isAuthorized = auth?.tokens?.accessToken

    return <Layout
        containerProps={{ display: "flex", height: "100%" }}
        title="Create quiz">


        {isAuthorized ?
            <CreateQuiz />
            :
            <RequestLoginPage />
        }

    </Layout>
}