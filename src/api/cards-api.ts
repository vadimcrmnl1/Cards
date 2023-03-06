import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseDataType>('auth/login', data)
    },
    logout(){
        return instance.delete<object>('auth/me')
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}