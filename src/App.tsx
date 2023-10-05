import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateQuizPage } from "./pages/quiz/create";
import { PropsWithChildren } from "react";
import { ViewQuizesPage } from "./pages/quiz/view";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/notFound";
import { HomePage } from "./pages/home";
import { SignupPage } from "./pages/signup";
import { useInitAuth } from "./utils/auth/useInitAuth";

function WithAuth({children}: PropsWithChildren) {
    useInitAuth()

    return children
}

function Contexts({ children }: PropsWithChildren) {
    return <BrowserRouter>
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    </BrowserRouter>
}

function Routing() {
    return <Routes>
        <Route path="/quiz/create" Component={CreateQuizPage} />
        <Route path="/quiz" Component={ViewQuizesPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/" Component={HomePage} />
        <Route path="*" Component={NotFoundPage} />
    </Routes>
}

export function App() {
    return <Contexts>
        <WithAuth>
            <Routing />
        </WithAuth>
    </Contexts>
}