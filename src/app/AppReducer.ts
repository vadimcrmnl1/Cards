import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setAuthAC} from "../features/auth/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../common/utils/errorUtils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-STATUS':
            return {...state, status: action.status}
        case 'APP-ERROR':
            return {...state, error: action.error}
        case 'APP-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP-IS-INITIALIZED', isInitialized} as const)

export const InitializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            dispatch(setIsInitializedAC(true))
            if (res.status === 200) {
                dispatch(setAuthAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedAT