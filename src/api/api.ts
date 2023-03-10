import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
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
    },
    getData() {
        return instance.post<ResponseDataType>('auth/me')
    },
    changeName(name: string) {

        return instance.put('auth/me', {name})
    },
    me() {
        return instance.post('auth/me', {})
    },
    forgotPass(email: string, from: string, message: string) {
        return instance.post<ResetPassResponseType>('auth/forgot', {
            email,
            from,
            message
        }, {withCredentials: true})
    },
    resetPass(password: string, resetPasswordToken: string) {
        return instance.post<ResetPassResponseType>('auth/set-new-password', {
            password,
            resetPasswordToken
        }, {withCredentials: true})
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
    avatar?: string | null;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type ResetPassResponseType = {
    info:string, error: string
}