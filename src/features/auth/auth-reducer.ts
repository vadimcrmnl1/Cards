import {authAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            if (res) {
                dispatch(setAuthAC(true))
            }
        })
}
// types
type ActionsType = ReturnType<typeof setAuthAC>
