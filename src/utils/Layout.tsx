import { Inbox } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { ComponentProps, PropsWithChildren } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "./auth/useAuth";

const links = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "View quizes",
        path: "/quiz"
    },
    {
        name: "Create quizes",
        path: "/quiz/create"
    }
]

function SideNavigation({ width }: { width: any }) {
    return <Box width={width} flexShrink={0}>
        <Toolbar />
        <Divider />
        <List>
            {links.map((link) => (
                <ListItem key={link.path} disablePadding>
                    <ListItemButton component={Link} to={link.path}>
                        <ListItemText primary={link.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
}


export function Layout({ children, containerProps, title }: PropsWithChildren<{
    containerProps?: ComponentProps<typeof Box>
    title: string
}>) {
    const width = 200

    const auth = useAuth()
    const isAuthenticated = !!auth.tokens?.accessToken

    return <Stack direction="row" height="100%">
        <Box width={width} flexShrink={0}>

            <Drawer
                open
                variant="permanent">
                <SideNavigation width={width} />
            </Drawer>
        </Box>

        <Stack
            width="100%"

            direction="column"
            overflow="hidden">
            <Toolbar />
            <Box
                style={{
                    height: "0px",
                    flexGrow: "1",
                    display: "flex"
                }}
                {...containerProps}>

                {children}
            </Box>
        </Stack>

        <AppBar
            position="fixed"
            style={{
                width: `calc(100% - ${width}px)`
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
                <Stack
                    style={{ marginLeft: "auto" }}
                    direction="row"
                    alignItems="center"
                    gap={1}>
                    {isAuthenticated ? <>
                        {auth.tokens.parsedAccessToken?.name}
                        <Button onClick={auth.logout} variant="contained" color="info">Log out</Button>
                    </> : <>
                        <Button component={Link} to="/login" variant="contained">Login</Button>
                        <Button component={Link} to="/signup" variant="contained">Sign up</Button>
                    </>}
                </Stack>
            </Toolbar>
        </AppBar>
    </Stack>
}