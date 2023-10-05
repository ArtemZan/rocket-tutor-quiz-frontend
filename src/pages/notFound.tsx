import { Button, Paper, Typography } from "@mui/material";
import { Layout } from "../utils/Layout";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return <Layout title="Not found">
        <Paper
            elevation={2}
            style={{
                margin: "5em auto auto",
                padding: "2em",
                display: "flex",
                flexDirection: "column"
            }}>
            <Typography variant="h4" textAlign="center">This page doesn't exist</Typography>
            <Button
                component={Link}
                to="/"
                style={{margin: "1em auto"}}
                size="large">
                Home
            </Button>
        </Paper>
    </Layout>
}