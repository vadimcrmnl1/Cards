import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../app/AppReducer";


export const handleServerNetworkError = (error: { statusText: string }, dispatch: Dispatch<AppActionsType>) => {
    console.log(error.statusText)
    dispatch(setAppErrorAC(error.statusText ? error.statusText : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}