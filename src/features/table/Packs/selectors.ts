import {AppRootStateType} from "../../../app/store";
import {createSelector} from "reselect";



export const selectCardPacksTotalCount = (state:AppRootStateType)=> state.packs.cardPacksTotalCount
export const selectPage = (state:AppRootStateType)=> state.packs.page-1
export const selectPageCount = (state:AppRootStateType)=> state.packs.pageCount
// export const selectPackId = (state: AppRootStateType) => state.packs.cardPacks[1]._id


export const selectCardPacks = createSelector([(state: AppRootStateType) => {
    return state.packs.cardPacks
}], cardPacks => cardPacks)


