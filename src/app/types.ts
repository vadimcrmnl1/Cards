import * as actions from './actions'

export type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

export type AppActionsType = ReturnType<InferValueTypes<typeof actions>>