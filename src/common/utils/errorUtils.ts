import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../app/AppReducer";


export const handleServerNetworkError = (error: { statusText: string }, dispatch: Dispatch<AppActionsType>) => {


    dispatch(setAppErrorAC(error.statusText ? error.statusText : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
    console.log('Network:', error)
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

