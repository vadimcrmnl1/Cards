import {RequestStatusType} from "./types"

export const setAppErrorAC = (error: string | null) => ({type: 'APP/ERROR', error} as const)
export const setAppInfoAC = (appInfo: string | null) => ({type: 'APP/INFO', appInfo} as const)
export const setAppStatusAC = (status: boolean) => ({type: 'APP/STATUS', status} as const)