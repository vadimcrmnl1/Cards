import {AppRootStateType} from "../../../app/store";
import {createSelector} from "reselect";


export const selectCardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPage = (state: AppRootStateType) => state.packs.page
export const selectPageCount = (state: AppRootStateType) => state.packs.pageCount
export const selectMyID = (state:AppRootStateType) => state.profile._id
export const selectMinCardsCount = (state: AppRootStateType) => state.packs.minCardsCount
export const selectMaxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount

export const selectPacksCountOfPages = createSelector([selectCardPacksTotalCount, selectPacksPageCount],
    (cardPacksTotalCount, pageCount) => {
        return Math.ceil(cardPacksTotalCount / pageCount)
    })

export const selectCardPacks = createSelector([(state: AppRootStateType) => {
    return state.packs.cardPacks
}], cardPacks => cardPacks)

