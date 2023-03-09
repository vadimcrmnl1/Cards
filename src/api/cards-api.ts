import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:7542/2.0/'
        : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseDataType>('auth/login', data)
    },
    logout() {
        return instance.delete<object>('auth/me')
    },
    signUp(email: string, password: string) {
        return instance.post<{ error?: string }>('auth/register', {email, password})
        return instance.post('auth/register', {email, password})
    },
    getData() {
        return instance.post<ResponseDataType>('auth/me')
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
    avatar?: string |null;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}