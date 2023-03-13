import {InferValueTypes} from "../../../app/types";
import * as actions from "./actions";

export type PacksActionsType = ReturnType<InferValueTypes<typeof actions>>


