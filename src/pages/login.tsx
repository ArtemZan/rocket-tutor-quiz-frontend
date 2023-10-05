import { Button, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import { Layout } from "../utils/Layout";
import { useState } from "react";
import { PasswordInput } from "../utils/PasswordInput";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/auth/useAuth";

export function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()

    const auth = useAuth()
    const navigate = useNavigate()

    async function login() {
        setError(null)
        const res = await auth.login(username, password)

        if (!res.success) {
            setError(res.data?.error)
            return
        }

        navigate("/quiz")
    }

    return <Layout
        containerProps={{ style: { height: "100%", display: "flex" } }}
        title="Login"
    >
        <Paper
            elevation={2}
            style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "flex-start",
                margin: "5em auto auto",
                padding: "2em",
                gap: "1em"
            }}>
            <Typography variant="h5" textAlign="center" margin="0 auto">Login</Typography>

            <TextField
                fullWidth
                size="small"
                value={username}
                label="Username or email"
                onChange={(e) => setUsername(e.target.value)} />

            <PasswordInput
                fullWidth
                size="small"
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)} />

            <Typography color="error">{error}</Typography>

            Don't have an account yet? <Link to="/signup">Sign up</Link>

            <Button
                onClick={login}
                variant="contained"
                style={{ marginLeft: "auto" }}>
                Login
            </Button>
        </Paper>
    </Layout>
}