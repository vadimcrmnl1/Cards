import {CardPacksType} from "../table-api";

export const setCardsAC = (cards: CardPacksType[]) => ({type: 'TABLE/SET_CARDS',  cards} as const)