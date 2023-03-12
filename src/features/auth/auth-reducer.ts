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
        case 'auth/SET-IS-LOGGED-IN':
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
export const loginTC = (data: LoginParamsType): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            dispatch(setLoggedInAC(true))
            dispatch(setProfileAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            errorUtils(err, dispatch)
        })


}
export const logoutTC = (): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            setProfileAC({} as ResponseDataType)
            dispatch(setLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error', {...e})
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })

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



