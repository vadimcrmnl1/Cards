import * as actions from "./actions";
import {InferValueTypes} from "../../../app/types";

export type CardsActionsType = ReturnType<InferValueTypes<typeof actions>>