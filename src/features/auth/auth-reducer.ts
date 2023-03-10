import {authAPI, LoginParamsType, ResponseDataType} from "../../api/api";

import {AllReducersActionType, AppThunk} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/errorUtils";
import {AuthActionsType} from "./types";
import {setAppInfoAC, setAppStatusAC} from "../../app/actions";
import {changeNameAC, setAuthAC, setLoginAC, setProfileAC, setSignedUpAC} from "./actions";

const initialState = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '' as string | null,
        publicCardPacksCount: null as null | number,
        created: 1 as Date | number,
        updated: 1 as Date | number,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '' as string | undefined
    },
    isLoggedIn: false,
    isSignedUp: false,
    resetMailToken: null as null | string
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}
        case "SET_PROFILE":
            return {...state, data: {...state.data, ...action.data}}
        case "CHANGE-NAME":
            return {...state, data: {...state.data, name: action.name}}
        case 'login/SET-IS-SIGNED-UP':
            return {...state, isSignedUp: action.isSignedUp}
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

                dispatch(setAuthAC(true))
                dispatch(setLoginAC(res.data))
                console.log(res)
            } else {
                debugger
                handleServerAppError(res.statusText, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.response.data.error, dispatch)
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
                dispatch(setLoginAC({} as ResponseDataType))
                dispatch(setAuthAC(false))
                dispatch(setSignedUpAC(false))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error LogoutTC', {...e})
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })

}

//если промис резолвится, то приходит <AxiosResponse<T>>res.<T>data... . Если rejected то приходит <AxiosError<T>>err
//.<AxiosResponse<T>>response.<T>data
export const signUpTC = (email: string, password: string): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)
            dispatch(setSignedUpAC(true))
            console.log(res)
        })
        .catch(err => {
            handleServerNetworkError(err.response.data.error, dispatch)
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
                dispatch(setSignedUpAC(false))
                dispatch(setAppInfoAC(`${res.data.info}, Check your email: ${email}`))
            }
        })
}
export const resetPasswordTC = (newPassword: string, token: string): AppThunk<AllReducersActionType> => (dispatch) => {
    authAPI.resetPass(newPassword, token)
        .then(res => {
            if (res) {
                console.log(res)
                dispatch(setSignedUpAC(true))
            }
        })
        .catch(err => {
            console.log(err)
        })
}
//Получение данных
export const getDataTC = (): AppThunk<AllReducersActionType> => (dispatch) => {

    authAPI.getData().then((res) => {
        console.log(res)
        dispatch(setProfileAC(res.data))
    }).catch((e: any) => {
        console.log(e)
        handleServerNetworkError(e.response, dispatch)
    }).finally(/*dispatch(setAppStatusAC('succeeded'))*/)
}

//Изменение nickName
export const changeNameTC = (name: string): AppThunk<AllReducersActionType> => (dispatch) => {

    authAPI.changeName(name).then((res) => {
        console.log(res.data.updatedUser.name)
        dispatch(changeNameAC(res.data.updatedUser.name))

    }).catch((e: any) => {
        console.log(e.response.data.error)
        handleServerNetworkError(e.response, dispatch)
    })
}

// types


export type ResponseErrorDataType = {
    error: string | undefined
    in: string | undefined
    password: string | undefined
}
export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}