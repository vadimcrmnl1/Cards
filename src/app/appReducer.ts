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
        case 'app/STATUS':
            return {...state, status: action.status}
        case 'app/ERROR':
            return {...state, error: action.error}
        case 'app/INFO':
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
            dispatch(setLoggedInAC('loggedIn'))
            dispatch(setProfileAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
            dispatch(setAppStatusAC('failed'))

        })
        .finally(() => {

        })
}


