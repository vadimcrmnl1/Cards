import {LoginTypes} from "./types";

export const setLoggedInAC = (isLoggedIn: LoginTypes) => ({type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const)

