import {ResponseDataType} from "../../api/api";

export const setProfileAC = (data: ResponseDataType) => ({type: 'profile/SET_PROFILE', payload:{data}} as const)
export const changeNameAC = (name: string) => ({type: "profile/CHANGE_NAME", payload:{name}} as const)