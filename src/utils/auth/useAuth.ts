import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { authActions } from "../../redux/slices/auth";
import { useBackend } from "../../backend";
import { authenticate } from "./common";
import { useAppSelector } from "../../redux";

export const localStorageTokenKey = "JWT"

export function useAuth(){
    const authState = useAppSelector(store => store.auth)
    const API = useBackend()
    const dispatch = useDispatch()

    function logout(){
        localStorage.removeItem(localStorageTokenKey)
        dispatch(authActions.clearTokens())
    }

    async function login(username: string, password: string){
        return authenticate(() => API.login(username, password), dispatch)
    }

    async function signup(username: string, email: string, password: string){
        return authenticate(() => API.signup(username, email, password), dispatch)
    }

    return useMemo(() => ({
        ...authState,
        logout,
        login,
        signup
    }), [authState])
}