import { setAppIsLoadingAC } from '../../app/actions'
import { AllReducersActionType, AppThunk } from '../../app/types'
import { errorUtils } from '../../common/utils/errorUtils'

import * as appActions from './../../app/actions'
import * as profileActions from './actions'
import { profileAPI } from './profileApi'
import { ProfileActionsType, ProfileInitialStateType } from './types'

export const profileInitialState: ProfileInitialStateType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: null,
  created: 0,
  updated: 0,
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
}

export const profileReducer = (
  state: ProfileInitialStateType = profileInitialState,
  action: ProfileActionsType
): ProfileInitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET_PROFILE':
      return { ...state, ...action.payload.data }
    case 'PROFILE/CHANGE_NAME':
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}

//thunks

//Изменение nickName
export const changeNameTC =
  (name: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      const res = await profileAPI.changeName(name)

      dispatch(profileActions.changeNameAC(res.data.updatedUser.name))
      dispatch(appActions.setAppInfoAC(`Name changed to ${res.data.updatedUser.name}`))
      dispatch(setAppIsLoadingAC(false))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
