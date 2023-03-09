import {Dispatch} from "redux";
import {profileAPI} from "./profileAPI";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import {AppActionsType, setAppStatusAC} from "../../app/AppReducer";
import {setAuthAC} from "../auth/auth-reducer";
import {authAPI} from "../../api/api";


const initialState = {
    isAuth: false,
    email: '',
    name: '',
    avatar: ''

}

export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        /*case "SET_NAME":
            return {...state, name:action.data.name, email: action.data.email}*/
        /*case "CHANGE-NAME":
            return {...state, }*/
        case 'LOG-OUT':
            return {...state, isAuth: action.payload.value}
        default:
            return state
    }
}

const LogoutAC = (value: boolean) => {
    return {
        type: "LOG-OUT",
        payload: {
            value
        }
    } as const
}
/*
export const setNameAC = (data: ResponseDataType) => ({type: 'SET_NAME', data} as const)
*/
/*export const getDataTC = () => async (dispatch: Dispatch<ActionsType>) => {
    debugger

    try {

        const result = await profileAPI.getData()
        console.log(result)
        dispatch(setNameAC(result.data))

    } catch (e:any) {
        handleServerNetworkError(e.response, dispatch)
    }finally {
        /!*dispatch(setAppStatusAC('succeeded'))*!/
    }
}*/
/*const ChangeNameAC=(name:string)=> {
    return {
        type: "CHANGE-NAME",
        payload:{
            name
        }
    }as const
}*/
export const LogoutTC = () => async (dispatch: Dispatch<ActionsType|ReturnType<typeof setAuthAC>>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const result = await authAPI.logout()
        console.log(result)
        return dispatch(setAuthAC(false))

    } catch (e: any) {
        return handleServerNetworkError(e.response, dispatch)
    } finally {
        return dispatch(setAppStatusAC('succeeded'))
    }
}

/*export const ChangeNameTC = (name:string) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const result = await profileAPI.changeName(name)
        dispatch(ChangeNameAC(result.data))

    } catch (e:any) {
        handleServerNetworkError(e.response, dispatch)
    }finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}*/


// types
type LogoutType = ReturnType<typeof LogoutAC>
/*type setNameACType=ReturnType<typeof setNameAC>*/
/*type ChangeNameType=ReturnType<typeof ChangeNameAC>*/
type ActionsType = LogoutType | AppActionsType