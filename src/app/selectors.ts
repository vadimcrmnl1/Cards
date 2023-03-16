import {AppRootStateType} from "./store";

export const selectError = (state:AppRootStateType) => state.app.error
export const selectAppStatus = (state:AppRootStateType) => state.app.status