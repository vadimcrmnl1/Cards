import {authAPI, LoginParamsType, ResponseDataType} from "../../api/api";

import {errorUtils} from "../../common/utils/errorUtils";
import {AxiosError} from "axios";
import {AuthActionsType, LoginTypes} from "./types";
import {setAppInfoAC, setAppStatusAC} from "../../app/actions";
import {  setLoggedInAC} from "./actions";
import {AllReducersActionType, AppThunk} from "../../app/types";
import {setProfileAC} from "../profile/actions";

const authInitialState = {
    isLoggedIn: 'unLoggedIn' as LoginTypes,
    isSignedUp: false,
    resetMailToken: null as null | string
}
export type AuthInitialStateType = typeof authInitialState

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}


// thunks
export const loginTC = (data: LoginParamsType): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLoggedInAC('loggedIn'))
                setProfileAC(res.data)
                console.log(res)
            } else {

            }
        })
        .catch((err: AxiosError<{ error: string | null }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message

            console.log('Error', error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const logoutTC = (): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res) {
                console.log(res)
                setProfileAC({} as ResponseDataType)
                dispatch(setLoggedInAC('unLoggedIn'))
            }
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

export const signUpTC = (email: string, password: string): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)
            dispatch(setLoggedInAC('registered'))
            console.log(res)
        })
        .catch(err => {
            errorUtils(err, dispatch)
            console.log(err)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const forgotPassTC = (email: string): AppThunk<AllReducersActionType> => (dispatch) => {

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = `<div style="background-color: #98a498; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/Cards#/set-new-password/$token$'>
                    link</a>
                    </div>`

    authAPI.forgotPass(email, from, message)
        .then(res => {
            if (res) {
                console.log(res)
                dispatch(setAppInfoAC(`${res.data.info}, Check your email: ${email}`))
            }
        })
}
export const resetPasswordTC = (newPassword: string, token: string): AppThunk<AllReducersActionType> => (dispatch) => {
    authAPI.resetPass(newPassword, token)
        .then(res => {
            if (res) {
                console.log(res)

                dispatch(setLoggedInAC('unLoggedIn'))
            }
        })
        .catch(err => {
            console.log(err)
        })
}




