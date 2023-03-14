import * as actions from './actions'
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AuthActionsType} from "../features/auth/types";
import {ProfileActionsType} from "../features/profile/types";
import {AppRootStateType} from "./store";
import {PacksActionsType} from "../features/table/Packs/types";
import {CardsActionsType} from "../features/table/Cards/types";
//general application types
export type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllReducersActionType>

export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, A>
export type AllReducersActionType = AuthActionsType
    | AppActionsType
    | ProfileActionsType | PacksActionsType
    | CardsActionsType
export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
    ReturnType, AppRootStateType, unknown, A>
export type AllReducersActionType = AuthActionsType | AppActionsType |ProfileActionsType|PacksActionsType | CardsActionsType








// APP types

export type AppActionsType = ReturnType<InferValueTypes<typeof actions>>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    appInfo: string | null
}