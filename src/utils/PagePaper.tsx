import { Paper, PaperProps } from "@mui/material";
import { PropsWithChildren } from "react";

export function PagePaper(props: PaperProps) {
    return <Paper
        elevation={2}
        {...props}
        style={{
            margin: "5em auto auto",
            padding: "2em",
            display: "flex",
            flexDirection: "column",
            ...props.style
        }} />
}