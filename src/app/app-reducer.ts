import {authAPI} from "../api/api";
import {AllReducersActionType, AppActionsType, AppInitialStateType, AppThunk} from "./types";
import * as appActions from './actions'
import * as authAction from './../features/auth/actions'
import * as profileActions from './../features/profile/actions'

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
    dispatch(appActions.setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            dispatch(authAction.setLoggedInAC(true))
            dispatch(profileActions.setProfileAC(res.data))
            dispatch(appActions.setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            if (error.response.status !== 401) {
                dispatch(appActions.setAppErrorAC(error.response.data.error))
                dispatch(appActions.setAppStatusAC('failed'))
            }
        })
        .finally(() => {
        dispatch(appActions.setAppStatusAC('succeeded'))
        })
}


