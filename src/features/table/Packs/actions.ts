import {AddPackRequestDataType, CardPacksType, UpdatePackRequestDataType} from "../table-api";

// cardPacks: CardPacksType[]
// cardPacksTotalCount: number
// maxCardsCount: number
// minCardsCount: number
// page: number
// pageCount: number


export const setPacksAC = (cardPacks: CardPacksType[]) => ({
    type: 'TABLE/SET_PACKS',
    payload: {cardPacks}
} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'TABLE/SET_CARDS_PACK_TOTAL_COUNT',
    payload: {cardPacksTotalCount},
} as const)
export const setMaxCardsCountAC = (maxCardsCount: number) => ({
    type: 'TABLE/SET_MAX_CARDS_COUNT',
    payload: {maxCardsCount},
} as const)
export const setMinCardsCountAC = (minCardsCount: number) => ({
    type: 'TABLE/SET_MIN_CARDS_COUNT',
    payload: {minCardsCount},
} as const)
export const setPacksPageAC = (page: number) => ({
    type: 'TABLE/SET_PACKS_PAGE',
    payload: {page},
} as const)
export const setPacksPageCountAC = (pageCount: number) => ({
    type: 'TABLE/SET_PACKS_PAGE_COUNT',
    payload: {pageCount},
} as const)
export const addPackAC = (cardPack: AddPackRequestDataType) => ({type: 'TABLE/ADD_PACK', payload: {cardPack}} as const)
export const deletePackAC = (id: string) => ({type: 'TABLE/DELETE_PACK', payload: {id}} as const)
export const updatePackAC = (cardPack: UpdatePackRequestDataType) => ({type: 'TABLE/UPDATE_PACK', payload: {cardPack}} as const)