import {AppRootStateType} from "../../../app/store";
import {createSelector} from "reselect";


export const selectCardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPage = (state: AppRootStateType) => state.packs.page
export const selectPageCount = (state: AppRootStateType) => state.packs.pageCount


export const selectCountOfPages = createSelector([selectCardPacksTotalCount, selectPageCount],
    (cardPacksTotalCount, pageCount) => {
        return Math.ceil(cardPacksTotalCount / pageCount)
    })

export const selectCardPacks = createSelector([(state: AppRootStateType) => {
    return state.packs.cardPacks
}], cardPacks => cardPacks)

// export const selectCardPacks = (state: AppRootStateType) => state.packs.cardPacks
