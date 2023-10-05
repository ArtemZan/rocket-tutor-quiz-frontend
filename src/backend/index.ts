import { useMemo } from "react"
import { CreateQuiz } from "../types/quiz"
import { useAppSelector } from "../redux"

// To do: get the backend url from the environment variables
export const backendBaseUrl = "http://localhost:4000"

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT"

type SendRequestOptions = {
    relUrl: string
    body?: any
    method?: HTTPMethod
    headers?: { [key: string]: string }
    parseResponseJSON?: boolean
}

export type RequestResult = {
    success: boolean
    data: any
}

async function sendRequest(bearerToken: string, {
    relUrl,
    method = "GET",
    body,
    headers = {},
    parseResponseJSON = true
}: SendRequestOptions): Promise<RequestResult> {
    try {
        const finalUrl = backendBaseUrl + (relUrl.startsWith("/") ? relUrl : "/" + relUrl)

        const authorizationHeader = !bearerToken ? {} : {
            authorization: `Bearer ${bearerToken}`,
        }

        const resp = await fetch(finalUrl, {
            method,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
                ...authorizationHeader,
                ...headers
            }
        })

        const json = parseResponseJSON ? await resp.json() : await resp.text()

        return {
            success: resp.ok,
            data: json
        }
    }
    catch (error) {
        return {
            success: false,
            data: error
        }
    }
}

function toQuery(object: { [key: string]: string | number }) {
    const copy = { ...object }
    for (const key in copy) {
        copy[key] = copy[key].toString()
    }
    return new URLSearchParams(copy as { [key: string]: string }).toString()
}

export function useBackend() {
    const authState = useAppSelector(state => state.auth)
    const accessToken = authState.tokens.accessToken

    function sendRequestWithAuth(options: SendRequestOptions) {
        return sendRequest(accessToken, options)
    }

    return useMemo(() => ({
        login: (username: string, password: string) => sendRequestWithAuth({ relUrl: "/login", method: "POST", body: {username, password}}),
        signup: (name: string, email: string, password: string) => sendRequestWithAuth({ relUrl: "/signup", method: "POST", body: {name, email, password}}),
        refreshToken: (refreshToken: string) => sendRequestWithAuth({relUrl: "/refresh-token", method: "POST", body: {refreshToken}}),

        createQuiz: (quiz: CreateQuiz) => sendRequestWithAuth({ relUrl: "quiz", method: "POST", body: quiz, parseResponseJSON: false }),
        getQuizes: (page: number, pageSize: number) => sendRequestWithAuth({ relUrl: `quiz/all?${toQuery({ page, pageSize })}` })
    }), [accessToken])
}