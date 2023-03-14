import {CardsType} from "../table-api";

export const setCardsAC = (cards: CardsType[]) => ({
    type: 'TABLE/SET_CARDS',
    payload: {cards}
} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: 'TABLE/SET_CARDS_TOTAL_COUNT',
    payload: {cardsTotalCount}
} as const)
export const setCardsMaxGradeAC = (maxGrade: number) => ({
    type: 'TABLE/SET_CARDS_MAX_GRADE',
    payload: {maxGrade}
} as const)
export const setCardsMinGradeAC = (minGrade: number) => ({
    type: 'TABLE/SET_CARDS_MIN_GRADE',
    payload: {minGrade}
} as const)
export const setCardsPageAC = (page: number) => ({
    type: 'TABLE/SET_CARDS_PAGE',
    payload: {page}
} as const)
export const setCardsPageCountAC = (pageCount: number) => ({
    type: 'TABLE/SET_CARDS_PAGE_COUNT',
    payload: {pageCount}
} as const)
export const setPackUserIdAC = (packUserId: string) => ({
    type: 'TABLE/SET_CARDS_PACK_USER_ID',
    payload: {packUserId}
} as const)
export const setCardsPackIdAC = (cardsPack_id: string) => ({
    type: 'TABLE/CARDS/SET_CARDS_PACK_ID',
    payload: {cardsPack_id}
} as const)