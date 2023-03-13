import {ProfileActionsType, ProfileInitialStateType} from "./types";
import {errorUtils} from "../../common/utils/errorUtils";
import * as profileActions from "./actions";
import {AllReducersActionType, AppThunk} from "../../app/types";
import * as appActions from './../../app/actions'
import {profileAPI} from "./profileApi";

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
            return {...state, ...action.payload.data};
        case "profile/CHANGE_NAME":
            return {...state, name: action.payload.name}
        default:
            return state
    }
}

//thunks
//Change nickName
export const changeNameTC = (name: string): AppThunk<AllReducersActionType> => async (dispatch) => {
       try{
           const res = await profileAPI.changeName(name)
           dispatch(profileActions.changeNameAC(res.data.updatedUser.name))
           dispatch(appActions.setAppInfoAC(`Name changed to ${res.data.updatedUser.name}`))
       }
       catch(e: any){
           errorUtils(e, dispatch)
       }
}