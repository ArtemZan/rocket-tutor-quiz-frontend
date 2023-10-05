import { Button, Paper, TextField, Typography } from "@mui/material";
import { Layout } from "../utils/Layout";
import { useState } from "react";
import { PasswordInput } from "../utils/PasswordInput";
import { useBackend } from "../backend";
import { authSlice } from "../redux/slices/auth"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/auth/useAuth";
import { validateEmail, validatePassword } from "../utils/validation";

export function SignupPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [error, setError] = useState<string>()

    const auth = useAuth()
    const navigate = useNavigate()

    function validate() {
        if (!username) {
            setError("Enter username")
            return
        }

        if (!email) {
            setError("Enter email")
            return
        }

        if(!validateEmail(email)){
            setError("Invalid email")
            return
        }

        if (!password) {

            setError("Enter password")
            return
        }

        if (!validatePassword(password)) {
            setError("Invalid password")
            return
        }

        if (password !== confirmedPassword) {
            setError("Password is not repeated correctly")
            return
        }

        return true
    }

    async function singup() {
        if (!validate()) {
            return
        }

        setError(null)
        const res = await auth.signup(username, email, password)

        if (!res.success) {
            setError(res.data?.error)
            return
        }

        navigate("/quiz")
    }

    return <Layout
        containerProps={{ style: { height: "100%", display: "flex" } }}
        title="Signup"
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
                gap: "1em",

            }}>
            <Typography variant="h5" textAlign="center" margin="0 auto">Signup</Typography>

            <TextField
                fullWidth
                size="small"
                value={username}
                name="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)} />

            <TextField
                fullWidth
                size="small"
                value={email}
                type="email"
                name="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput
                fullWidth
                size="small"
                value={password}
                helperText="At least 6 symbols long, must contain at least one number"
                name="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)} />

            <PasswordInput
                fullWidth
                size="small"
                value={confirmedPassword}
                name="password"
                label="Confirm password"
                onChange={(e) => setConfirmedPassword(e.target.value)} />

            <Typography color="error" width="100%">{error}</Typography>

            Already have an account? <Link to="/login">Log in</Link>

            <Button
                onClick={singup}
                variant="contained"
                style={{ marginLeft: "auto" }}>
                Sign up
            </Button>
        </Paper>
    </Layout>
}