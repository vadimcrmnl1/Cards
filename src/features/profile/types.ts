import * as actions from "./actions";
import {InferValueTypes} from "../../app/types";

export type ProfileInitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | null;
    publicCardPacksCount: number | null;
    created: Date | number;
    updated: Date | number;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type ProfileActionsType = ReturnType<InferValueTypes<typeof actions>>