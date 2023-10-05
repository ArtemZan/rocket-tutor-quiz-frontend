import { RequestResult } from "../../backend"
import { store } from "../../redux"
import { authActions } from "../../redux/slices/auth"
import { localStorageTokenKey } from "./useAuth"

export async function authenticate(callRequest: () => Promise<RequestResult>, dispatch: typeof store.dispatch){
    const resp = await callRequest()
    if (!resp.success) {
        return resp
    }

    const tokens = resp.data

    dispatch(authActions.setTokens(tokens))
    localStorage.setItem(localStorageTokenKey, JSON.stringify(tokens))
    return resp
}