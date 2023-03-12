import {authAPI} from "../api/api";

import {AllReducersActionType, AppActionsType, AppInitialStateType, AppThunk} from "./types";
import {setAppErrorAC, setAppStatusAC} from "./actions";
import {setLoggedInAC} from "../features/auth/actions";
import {setProfileAC} from "../features/profile/actions";

const appInitialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    appInfo: null,
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/STATUS':
            return {...state, status: action.status}
        case 'APP/ERROR':
            return {...state, error: action.error}
        case 'APP/INFO':
            return {...state, appInfo: action.appInfo}
        default:
            return state
    }
}


//thunks
export const initializeAppTC = (): AppThunk<AllReducersActionType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            dispatch(setLoggedInAC(true))
            dispatch(setProfileAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            if (error.response.status !== 401) {
                dispatch(setAppErrorAC(error.response.data.error))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
        })
}


