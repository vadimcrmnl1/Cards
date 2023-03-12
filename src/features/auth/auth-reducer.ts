import {authAPI, LoginParamsType, ResponseDataType} from "../../api/api";

import {errorUtils} from "../../common/utils/errorUtils";
import {AuthActionsType} from "./types";
import {setAppInfoAC, setAppStatusAC} from "../../app/actions";
import {setIsPasswordChangedAC, setIsSignedUpAC, setLoggedInAC, setMailWasSentAC} from "./actions";
import {AllReducersActionType, AppThunk} from "../../app/types";
import {setProfileAC} from "../profile/actions";

const authInitialState = {
    isLoggedIn: false,
    isSignedUp: false,
    mailWasSent: false,
    isPasswordChanged: false,
    resetMailToken: null as null | string
}
export type AuthInitialStateType = typeof authInitialState

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'auth/SET-IS-SIGNED-UP':
            return {...state, isSignedUp: action.isSignedUp}
        case 'auth/SET-MAIL-WAS-SENT':
            return {...state, mailWasSent: action.mailWasSent}
        case 'auth/SET-IS-PASSWORD-CHANGED':
            return {...state, isPasswordChanged: action.isPasswordChanged}
        default:
            return state
    }
}


// thunks
export const loginTC = (data: LoginParamsType): AppThunk<AllReducersActionType> => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(setLoggedInAC(true))
        dispatch(setProfileAC(res.data))
        dispatch(setAppInfoAC(`Welcome, ${res.data.name}`))
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const logoutTC = (): AppThunk<AllReducersActionType> => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        setProfileAC({} as ResponseDataType)
        dispatch(setLoggedInAC(false))
        dispatch(setAppInfoAC(res.data.info))
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const signUpTC = (email: string, password: string): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)
            dispatch(setLoggedInAC('registered'))
            dispatch(setAppStatusAC('succeeded'))
            console.log(res)
        })
        .catch(err => {
            errorUtils(err, dispatch)
            console.log(err)
        })
}
export const forgotPassTC = (email: string): AppThunk<AllReducersActionType> => (dispatch) => {

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = `<div style="background-color: #98a498; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/Cards#/set-new-password/$token$'>
                    link</a>
                    </div>`

    dispatch(setAppStatusAC('loading'))
    authAPI.forgotPass(email, from, message)
        .then(res => {
            dispatch(setAppInfoAC(`${res.data.info}, Check your email: ${email}`))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            console.log(err)
            handleServerNetworkError(err.response, dispatch)
        })
}
export const resetPasswordTC = (newPassword: string, token: string): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.resetPass(newPassword, token)
        .then(res => {
            if (res) {
                dispatch(setLoggedInAC('registered'))
                dispatch(setAppInfoAC('Password changed successful'))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch(err => {
            handleServerNetworkError(err.response, dispatch)
        })
}




