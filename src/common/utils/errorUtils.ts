import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, SetAppErrorActionType, setAppStatusAC} from "../../app/AppReducer";
import axios, {AxiosError} from "axios";


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}


type ErrorType = Error | AxiosError<{ error: string }>

export const errorUtils = (e: ErrorType, dispatch: Dispatch<SetAppErrorActionType>) => {
    const err = e as ErrorType
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`${err.name}: ${err.message}`))
    }
}