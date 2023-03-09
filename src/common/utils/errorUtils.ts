import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../app/AppReducer";


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}