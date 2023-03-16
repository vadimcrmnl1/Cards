import {authAPI} from "../api/api";
import {AllReducersActionType, AppActionsType, AppInitialStateType, AppThunk} from "./types";
import * as appActions from './actions'
import * as authAction from './../features/auth/actions'
import * as profileActions from './../features/profile/actions'
import {errorUtils} from "../common/utils/errorUtils";

const appInitialState: AppInitialStateType = {
    status: false,
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
    dispatch(appActions.setAppStatusAC(true))
    authAPI.me()
        .then(res => {
            dispatch(authAction.setLoggedInAC(true))
            dispatch(profileActions.setProfileAC(res.data))
        })
        .catch((error: any) => {
            //не удалять, избавляет от первой ошибки неаторизованного
            if (error.response.status !== 401) { // ошибка неавторизованного пользователя
                errorUtils(error, dispatch)
            }
        })
        .finally(() => {
            dispatch(appActions.setAppStatusAC(false))
        })
}


