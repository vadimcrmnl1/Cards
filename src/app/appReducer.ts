import {authAPI} from "../api/api";

import {handleServerAppError, handleServerNetworkError} from "../common/utils/errorUtils";
import {AllReducersActionType, AppActionsType, AppInitialStateType, AppThunk} from "./types";
import {setAppStatusAC} from "./actions";
import {setLoggedInAC} from "../features/auth/actions";

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
            if (res.status === 200) {
                dispatch(setLoggedInAC('loggedIn'))

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


