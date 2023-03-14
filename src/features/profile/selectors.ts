import {AppRootStateType} from "../../app/store";

export const selectorEmail = (state:AppRootStateType) => state.profile.email
export const selectorIsLoggedIn = (state:AppRootStateType) => state.auth.isLoggedIn
export const selectorError = (state:AppRootStateType) => state.app.error
export const selectorName = (state:AppRootStateType) => state.profile.name