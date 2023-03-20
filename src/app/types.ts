import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType } from '../features/auth/types'
import { ProfileActionsType } from '../features/profile/types'
import { CardsActionsType } from '../features/table/Cards/types'
import { PacksActionsType } from '../features/table/Packs/types'

import * as actions from './actions'
import { AppRootStateType } from './store'
//general application types
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllReducersActionType>

export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  A
>
export type AllReducersActionType =
  | AuthActionsType
  | AppActionsType
  | ProfileActionsType
  | PacksActionsType
  | CardsActionsType

// APP types

export type AppActionsType = ReturnType<InferValueTypes<typeof actions>>

export type AppInitialStateType = {
  isAppInitialized: boolean
  isLoading: boolean
  error: string | null
  appInfo: string | null
}
