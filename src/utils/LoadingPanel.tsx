import { Backdrop, CircularProgress } from "@mui/material";

export function LoadingPanel({ open }: { open: boolean }) {
    return <Backdrop open={open} style={{ position: "absolute", backgroundColor: "#fff8", zIndex: 1 }}>
        <CircularProgress style={{ margin: "auto" }} />
    </Backdrop>
}