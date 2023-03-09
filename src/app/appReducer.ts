import {authAPI} from "../api/api";

import {handleServerAppError, handleServerNetworkError} from "../common/utils/errorUtils";
import {AllReducersActionType, AppThunk} from "./store";
import {AppActionsType} from "./types";
import {setAppStatusAC, setIsInitializedAC} from "./actions";
import {setAuthAC} from "../features/auth/actions";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    appInfo: null,
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-STATUS':
            return {...state, status: action.status}
        case 'APP-ERROR':
            return {...state, error: action.error}
        case 'APP-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'APP-INFO':
            return {...state, appInfo: action.appInfo}
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
    appInfo: string | null
}


export const InitializeAppTC = (): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
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
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}


