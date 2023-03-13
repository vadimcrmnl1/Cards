import {CardsActionsType} from "./types";

export const cardsInitialState = {

}

export type CardsInitialStateType = typeof cardsInitialState

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionsType): CardsInitialStateType => {
    switch (action.type) {
        case 'TABLE/SET_CARDS':
            return {...state,ards: action.cards};
        default:
            return state;
    }
}