import {Dispatch} from "redux";

import axios, {AxiosError} from "axios";
import {AppActionsType} from "../../app/types";
import {setAppErrorAC, setAppStatusAC} from "../../app/actions";


export const handleServerNetworkError = (error: string, dispatch: Dispatch<AppActionsType>) => {
    debugger
    dispatch(setAppErrorAC(error ? error : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerAppError = (error: string, dispatch: Dispatch<AppActionsType>) => {

    if (error.length) {
        dispatch(setAppErrorAC(error[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
    console.log('App:', error)
}


type ErrorType = Error | AxiosError<{ error: string }>

export const errorUtils = (e: ErrorType, dispatch: Dispatch<AppActionsType>) => {
    const err = e as ErrorType
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppStatusAC('failed'))
}
// export const errorUtils = (e: ErrorType, dispatch: Dispatch<AppActionsType>) => {
//     const err = e as ErrorType
//     if (axios.isAxiosError(err)) {
//         const error = err.response?.data ? err.response.data : err.message
//         if (!error.isEmailValid) {
//             dispatch(setAppErrorAC('Email wrong'))
//         } else if (!error.isPassValid) {
//             dispatch(setAppErrorAC('Password wrong'))
//         }
//     } else {
//         dispatch(setAppErrorAC(`${err.name}: ${err.message}`))
//     }
//     dispatch(setAppStatusAC('failed'))
// }
