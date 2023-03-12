import * as actions from './actions'
import {InferValueTypes} from "../../app/types";

export type AuthActionsType = ReturnType<InferValueTypes<typeof actions>>

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