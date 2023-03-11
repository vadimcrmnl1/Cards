import {ProfileActionsType, ProfileInitialStateType} from "./types";
import {authAPI} from "../../api/api";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import {changeNameAC, setProfileAC} from "./actions";
import {AllReducersActionType, AppThunk} from "../../app/types";
import {setAppInfoAC} from "../../app/actions";

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
//Получение данных
export const setProfileTC = (): AppThunk<AllReducersActionType> => (dispatch) => {
    authAPI.getData()
        .then((res) => {
            console.log(res)
            dispatch(setProfileAC(res.data))
        })
        .catch((e: any) => {
            console.log(e)
            handleServerNetworkError(e.response, dispatch)
        })
        .finally(/*dispatch(setAppStatusAC('succeeded'))*/)
}

//Изменение nickName
export const changeNameTC = (name: string): AppThunk<AllReducersActionType> => (dispatch) => {
    authAPI.changeName(name).then((res) => {

        dispatch(changeNameAC(res.data.updatedUser.name))
        dispatch(setAppInfoAC(`Name changed to ${res.data.updatedUser.name}`))
    }).catch((e: any) => {
        debugger
        console.log(e.response.data.error)
        handleServerNetworkError(e.response.data.error, dispatch)
    })
}