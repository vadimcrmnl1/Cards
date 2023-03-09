import {ResponseDataType} from "../../api/api";

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginAC = (data: ResponseDataType) => ({type: 'login/SET-LOGIN-DATA', data} as const)
export const setSignedUpAC = (isSignedUp: boolean) => ({type: 'login/SET-IS-SIGNED-UP', isSignedUp} as const)

export const setProfileAC = (data: ResponseDataType) => ({type: 'SET_PROFILE', data} as const)
export const changeNameAC = (name: string) => ({type: "CHANGE-NAME", name} as const)