import { useEffect, useRef } from "react";
import { authActions, authSlice } from "../../redux/slices/auth";
import { localStorageTokenKey, useAuth } from "./useAuth";
import { useBackend } from "../../backend";
import { authenticate } from "./common";
import { useDispatch } from "react-redux";

function useJWTRefresh(){
    const timer = useRef()
    const auth = useAuth()
    const tokens = auth?.tokens

    const API = useBackend()

    const dispatch = useDispatch()

    useEffect(() => {
        if(timer.current){
            clearTimeout(timer.current)
        }

        if(!tokens.parsedAccessToken){
            return
        }

        const timeBeforeExpires = Number(tokens.parsedAccessToken?.exp) * 1000 - Date.now()

        console.log(timeBeforeExpires)

        setTimeout(refresh, timeBeforeExpires)
    }, [tokens])

    async function refresh(){
        authenticate(() => API.refreshToken(tokens.refreshToken), dispatch)
    }
}

export function useInitAuth(){
    const isInitialized = useRef(false)
    useJWTRefresh()
    const dispatch = useDispatch()

    function setStoreFromLocalStorage(){
        const localStorageValue = localStorage.getItem(localStorageTokenKey)
        console.log(localStorageValue)
        if(localStorageValue){
            try{
                dispatch(authActions.setTokens(JSON.parse(localStorageValue)))
            }
            catch(e){
                console.log("Failed to parse JWT: ", e)
            }
        }
    }

    if(!isInitialized.current){
        console.log("Init")
        isInitialized.current = true
        setStoreFromLocalStorage()
    }
}