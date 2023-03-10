import * as actions from './actions'
import {InferValueTypes} from "../../app/types";

export type AuthActionsType = ReturnType<InferValueTypes<typeof actions>>
export type LoginTypes = 'unLoggedIn' | 'registered' | 'loggedIn'

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