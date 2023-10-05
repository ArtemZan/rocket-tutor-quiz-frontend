import { Button, Paper, Typography } from "@mui/material";
import { Layout } from "../utils/Layout";
import { Link } from "react-router-dom";
import { PagePaper } from "../utils/PagePaper";

export function HomePage() {
    return <Layout title="Home">
        <PagePaper
            style={{
                margin: "5em",
                width: "100%"
            }}>
            <Typography variant="h5" textAlign="center">Wellcome to the quizzes website</Typography>

            <Button
                component={Link}
                to="/quiz"
                style={{ margin: "1em auto" }}
                size="large">
                Go to quizes
            </Button>
        </PagePaper>
    </Layout>
}