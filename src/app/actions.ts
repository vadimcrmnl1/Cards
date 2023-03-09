import {RequestStatusType} from "./appReducer";

export const setAppErrorAC = (error: string | null) => ({type: 'APP-ERROR', error} as const)
export const setAppInfoAC = (appInfo: string | null) => ({type: 'APP-INFO', appInfo} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP-IS-INITIALIZED', isInitialized} as const)