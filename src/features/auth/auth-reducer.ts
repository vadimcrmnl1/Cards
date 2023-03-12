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

export const signUpTC = (email: string, password: string): AppThunk<AllReducersActionType> => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.signUp(email, password)
        dispatch(setAppInfoAC(res.data.addedUser.email + ' has registered'))
        dispatch(setIsSignedUpAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        errorUtils(e, dispatch)
    }
}
export const forgotPassTC = (email: string): AppThunk<AllReducersActionType> => async (dispatch) => {

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = `<div style="background-color: #98a498; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/Cards#/set-new-password/$token$'>
                    link</a>
                    </div>`
    const data = {email, from, message}

    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.forgotPass(data)
        dispatch(setAppInfoAC(`${res.data.info}, Check your email: ${email}`))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setMailWasSentAC(true))
    } catch (e: any) {
        errorUtils(e, dispatch)
    }
}
export const resetPasswordTC = (password: string, resetPasswordToken: string): AppThunk<AllReducersActionType> => {
    return async (dispatch) => {
        const data = {password, resetPasswordToken}

        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.resetPass(data)
            dispatch(setIsPasswordChangedAC(true))
            dispatch(setAppInfoAC(res.data.info))
            dispatch(setAppStatusAC('succeeded'))
        } catch (e: any) {
            errorUtils(e, dispatch)
        }
    }
}




