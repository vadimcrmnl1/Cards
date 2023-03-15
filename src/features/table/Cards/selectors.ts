import {AppRootStateType} from "../../../app/store";
import {createSelector} from "reselect";

export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardsPage = (state: AppRootStateType) => state.cards.page
export const selectCardsPageCount = (state: AppRootStateType) => state.cards.pageCount


export const selectCardsCountOfPages = createSelector([selectCardsTotalCount, selectCardsPageCount],
    (cardsTotalCount, pageCount) => {
        return Math.ceil(cardsTotalCount / pageCount)
    })

export const selectCards = createSelector([(state: AppRootStateType) => {
    return state.cards.cards
}], cards => cards)