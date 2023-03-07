import {Dispatch} from "redux";
import {profileAPI} from "./profileAPI";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import {AppActionsType, setAppStatusAC} from "../../app/AppReducer";


const initialState = {
    isAuth: false

}

export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-NAME":
            return {...state, }
        case 'LOG-OUT':
            return {...state, isAuth: action.payload.value}
        default:
            return state
    }
}

const LogoutAC=(value:boolean)=> {
    return {
        type: "LOG-OUT",
        payload:{
            value
        }
    }as const
}
const ChangeNameAC=(name:string)=> {
    return {
        type: "CHANGE-NAME",
        payload:{
            name
        }
    }as const
}
export const LogoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const result = await profileAPI.logout()

                dispatch(LogoutAC(false))

    } catch (e:any) {
        handleServerNetworkError(e.response, dispatch)
    }finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const ChangeNameTC = (newName:string) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const result = await profileAPI.changeName(newName)
        dispatch(ChangeNameAC(result.data))

    } catch (e:any) {
        handleServerNetworkError(e.response, dispatch)
    }finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
// thunks

// types
type LogoutType=ReturnType<typeof LogoutAC>
type ChangeNameType=ReturnType<typeof ChangeNameAC>
type ActionsType = LogoutType | ChangeNameType | AppActionsType