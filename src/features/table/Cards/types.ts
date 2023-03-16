import * as actions from "./actions";
import {InferValueTypes} from "../../../app/types";

export type CardsActionsType = ReturnType<InferValueTypes<typeof actions>>

export type CardsParamsType = {
    page: number
    pageCount: number
    cardsPack_id:string
    sortCards?: string
    cardAnswer?: string
}

