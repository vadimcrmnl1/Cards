import {Dispatch} from "redux";
import {profileAPI} from "./profileAPI";

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
    //dispatch(setAppStatusAC('loading'))
    try {
        const result = await profileAPI.logout()
        console.log(result)
                dispatch(LogoutAC(false))

    } catch (e:any) {
        /*handleServerNetworkError(e, dispatch)*/
    }
}

export const ChangeNameTC = (newName:string) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const result = await profileAPI.changeName(newName)
        console.log(result)
            // dispatch(ChangeNameAC())

    } catch (e:any) {
        /*handleServerNetworkError(e, dispatch)*/
    }
}
// thunks

// types
type LogoutType=ReturnType<typeof LogoutAC>
type ChangeNameType=ReturnType<typeof ChangeNameAC>
type ActionsType = LogoutType | ChangeNameType