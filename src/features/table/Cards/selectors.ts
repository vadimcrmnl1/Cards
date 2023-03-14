import {createSelector} from "reselect";
import {AppRootStateType} from "../../../app/store";

export const selectCard = createSelector([(state: AppRootStateType) => {
    return state.cards.cards
}], cards => cards)