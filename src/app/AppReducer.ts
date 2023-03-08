const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-STATUS':
            return {...state, status: action.status}
        case 'APP-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP-STATUS', status} as const)

type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType