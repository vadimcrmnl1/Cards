import {ResponseDataType} from "../../api/api";

export const setProfileAC = (data: ResponseDataType) => ({type: 'profile/SET_PROFILE', data} as const)
export const changeNameAC = (name: string) => ({type: "profile/CHANGE_NAME", name} as const)