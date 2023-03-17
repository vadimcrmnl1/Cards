export const setAppErrorAC = (error: string | null) => ({type: 'APP/ERROR', error} as const)
export const setAppInfoAC = (appInfo: string | null) => ({type: 'APP/INFO', appInfo} as const)
export const setAppIsInitializedAC = (isAppInitialized: boolean) => ({type: 'APP/SET_APP_IS_INITIALIZED', isAppInitialized} as const)
export const setAppIsLoadingAC = (isLoading: boolean) => ({type: 'APP/SET_IS_LOADING', isLoading} as const)