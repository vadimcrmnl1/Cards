import {AppRootStateType} from "../../../app/store";
import {createSelector} from "reselect";


export const selectCardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPacksPage = (state: AppRootStateType) => state.packs.page
export const selectPacksPageCount = (state: AppRootStateType) => state.packs.pageCount


export const selectPacksCountOfPages = createSelector([selectCardPacksTotalCount, selectPacksPageCount],
    (cardPacksTotalCount, pageCount) => {
        return Math.ceil(cardPacksTotalCount / pageCount)
    })

export const selectCardPacks = createSelector([(state: AppRootStateType) => {
    return state.packs.cardPacks
}], cardPacks => cardPacks)

