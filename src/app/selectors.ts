import {AppRootStateType} from "./store";

export const selectError = (state:AppRootStateType) => state.app.error
export const selectAppInfo = (state:AppRootStateType) => state.app.appInfo
export const selectAppStatus = (state:AppRootStateType) => state.app.status