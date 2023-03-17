import {Dispatch} from "redux";

import axios, {AxiosError} from "axios";
import {AppActionsType} from "../../app/types";
import {setAppErrorAC, setAppIsLoadingAC} from "../../app/actions";

type ErrorType = Error | AxiosError<{ error: string }>

export const errorUtils = (e: ErrorType, dispatch: Dispatch<AppActionsType>) => {
    const err = e as ErrorType
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppIsLoadingAC(false))
}
