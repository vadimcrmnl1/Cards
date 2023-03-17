import { CardPacksType} from "../table-api";



export const setPacksAC = (cardPacks: CardPacksType[]) => ({
    type: 'TABLE/SET_PACKS',
    payload: {cardPacks}
} as const)
export const setPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'TABLE/SET_CARDS_PACK_TOTAL_COUNT',
    payload: {cardPacksTotalCount},
} as const)
export const setPacksMaxCardsCountAC = (maxCardsCount: number) => ({
    type: 'TABLE/SET_MAX_CARDS_COUNT',
    payload: {maxCardsCount},
} as const)
export const setPacksMinCardsCountAC = (minCardsCount: number) => ({
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


///Actions for filters
export const setPackNameAC = (packName: string | null) => ({
    type: 'TABLE/SET_PACK_NAME',
    payload: {packName}
} as const)
export const setMyPacksAC = (id: string | null) => ({
    type: 'TABLE/SET_MY_PACKS',
    payload: {id}
} as const)
export const setMinMaxCardsAC = (min:number, max:number) => ({
    type: 'TABLE/SET_MIN_MAX_CARDS',
    payload: {min, max}
} as const)
export const setPacksSortAC = (sortPacks: string|null) => ({
    type: 'TABLE/SET_PACKS_SORT',
    payload: {sortPacks}
} as const)
