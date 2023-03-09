import * as actions from './actions'
import {InferValueTypes} from "../../app/types";

export type AuthActionsType = ReturnType<InferValueTypes<typeof actions>>