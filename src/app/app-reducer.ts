import { authAPI } from '../api/api'
import { errorUtils } from '../common/utils/errorUtils'

import * as authAction from './../features/auth/actions'
import * as profileActions from './../features/profile/actions'
import * as appActions from './actions'
import { AllReducersActionType, AppActionsType, AppInitialStateType, AppThunk } from './types'

const appInitialState: AppInitialStateType = {
  isAppInitialized: false,
  isLoading: false,
  error: null,
  appInfo: null,
}

export const appReducer = (
  state: AppInitialStateType = appInitialState,
  action: AppActionsType
): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET_APP_IS_INITIALIZED':
      return { ...state, isAppInitialized: action.isAppInitialized }
    case 'APP/SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'APP/ERROR':
      return { ...state, error: action.error }
    case 'APP/INFO':
      return { ...state, appInfo: action.appInfo }
    default:
      return state
  }
}

//thunks
export const initializeAppTC = (): AppThunk<AllReducersActionType> => dispatch => {
  dispatch(appActions.setAppIsLoadingAC(true))
  authAPI
    .me()
    .then(res => {
      dispatch(authAction.setLoggedInAC(true))
      dispatch(profileActions.setProfileAC(res.data))
    })
    .catch((error: any) => {
      //не удалять, избавляет от первой ошибки неаторизованного
      if (error.response.status !== 401) {
        // ошибка неавторизованного пользователя
        errorUtils(error, dispatch)
      }
    })
    .finally(() => {
      dispatch(appActions.setAppIsInitializedAC(true))
      dispatch(appActions.setAppIsLoadingAC(false))
    })
}
