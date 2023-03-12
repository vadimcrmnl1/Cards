import * as actions from './actions'
import {InferValueTypes} from "../../app/types";
import {ResponseDataType} from "../../api/api";

export type AuthActionsType = ReturnType<InferValueTypes<typeof actions>>

export type ResetPassResponseType = {
    info: string, error: string
}
export type SignUpType = {
    error?: string
    addedUser: ResponseDataType
}

export type ResponseErrorDataType = {
    error: string | undefined
    in: string | undefined
    password: string | undefined
}
export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}