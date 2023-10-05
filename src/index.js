import {createRoot} from "react-dom/client"
import { App } from "./App"
import "./redux"
import "./index.scss"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(<App />)