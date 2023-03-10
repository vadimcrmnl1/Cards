import {RequestStatusType} from "./types"

export const setAppErrorAC = (error: string | null) => ({type: 'app/ERROR', error} as const)
export const setAppInfoAC = (appInfo: string | null) => ({type: 'app/INFO', appInfo} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'app/STATUS', status} as const)