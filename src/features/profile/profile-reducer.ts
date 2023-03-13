import {ProfileActionsType, ProfileInitialStateType} from "./types";
import {authAPI} from "../../api/api";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import * as profileActions from "./actions";
import {AllReducersActionType, AppThunk} from "../../app/types";
import * as appActions from './../../app/actions'

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
    error: ''
}

export const profileReducer = (state: ProfileInitialStateType = profileInitialState, action: ProfileActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case "profile/SET_PROFILE":
            return {...state, ...action.data};
        case "profile/CHANGE-NAME":
            return {...state, name: action.name}
        default:
            return state
    }
}

//thunks

//Изменение nickName
export const changeNameTC = (name: string): AppThunk<AllReducersActionType> => (dispatch) => {
    authAPI.changeName(name).then((res) => {

        dispatch(profileActions.changeNameAC(res.data.updatedUser.name))
        dispatch(appActions.setAppInfoAC(`Name changed to ${res.data.updatedUser.name}`))
    }).catch((e: any) => {
        debugger
        console.log(e.response.data.error)
        handleServerNetworkError(e.response.data.error, dispatch)
    })
}