import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux";
import { useMemo } from "react";
import { authActions } from "../../redux/slices/auth";
import { useBackend } from "../../backend";
import { authenticate } from "./common";

export const localStorageTokenKey = "JWT"

export function useAuth(){
    const authState = useSelector<StateType, StateType["auth"]>(state => state.auth)
    const API = useBackend()
    const dispatch = useDispatch()

    function logout(){
        dispatch(authActions.clearTokens())
        localStorage.removeItem(localStorageTokenKey)
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