import {authAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";

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
    isLoggedIn: false
}
export type ResponseDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number | null
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginAC = (data: ResponseDataType) => ({type: 'login/SET-LOGIN-DATA', data} as const)
// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            if (res) {
                dispatch(setAuthAC(true))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error', {...e})
        })

}
// types
type ActionsType = ReturnType<typeof setAuthAC> | ReturnType<typeof setLoginAC>
