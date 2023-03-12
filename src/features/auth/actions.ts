import {LoginTypes} from "./types";

export const setLoggedInAC = (isLoggedIn: LoginTypes) => ({type: 'AUTH/SET_IS_LOGGED_IN', isLoggedIn} as const)

