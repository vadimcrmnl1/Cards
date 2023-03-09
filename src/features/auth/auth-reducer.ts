import {authAPI, LoginParamsType, ResponseDataType} from "../../api/api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

const initialState = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: null,
        created: Date,
        updated: Date,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ''
    },
    isLoggedIn: false,
    recoveryEmail: ''
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}

        default:
            return {...state}
    }
}

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginAC = (data: ResponseDataType) => ({type: 'login/SET-LOGIN-DATA', data} as const)
// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setAuthAC(true))
                dispatch(setLoginAC(res.data))
                console.log(res)
                console.log('state', initialState.isLoggedIn)
            } else {

            }
        })
        .catch((err: AxiosError<{ error: string | null }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message

            console.log('Error', error)
        })

}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logout()
        .then(res => {
            if (res) {
                dispatch(setAuthAC(false))
            }
        })
}
export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
export const ForgotPassTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {

    const from = "test-front-admin <vadzimkaprenka@gmail.com>"
    const message = `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                    link</a>
                    </div>`
    authAPI.forgotPass(email, from, message)
        .then(res => {
            if (res) {
                console.log(res)
            }
        })
}
// types
type ActionsType = ReturnType<typeof setAuthAC> | ReturnType<typeof setLoginAC>
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