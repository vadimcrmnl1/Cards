import {CardsActionsType} from "./types";
import {cardsAPI, CardsType} from "../table-api";
import {dateUtils} from "../../../common/utils/dateUtils";
import {AllReducersActionType, AppThunk} from "../../../app/types";
import * as appActions from "../../../app/actions";
import * as tableActions from "../Packs/actions";
import {errorUtils} from "../../../common/utils/errorUtils";

export const cardsInitialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 1,
    maxGrade: 1,
    minGrade: 1,
    page: 1,
    pageCount: 1,
    packUserId: ''
}

export type CardsInitialStateType = typeof cardsInitialState

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionsType): CardsInitialStateType => {
    switch (action.type) {
        case 'TABLE/SET_CARDS':
            return {...state, cards: action.payload.cards.map(cards => {
                return {...cards, updated: dateUtils(cards.updated), created: dateUtils(cards.created)}
                })}
         case 'TABLE/SET_CARDS_TOTAL_COUNT':
            return {...state, cardsTotalCount: action.payload.cardsTotalCount}
        case 'TABLE/SET_CARDS_MAX_GRADE':
            return {...state, maxGrade: action.payload.maxGrade}
        case 'TABLE/SET_CARDS_MIN_GRADE':
            return {...state, minGrade: action.payload.minGrade}
        case 'TABLE/SET_CARDS_PAGE':
            return {...state, page: action.payload.page}
        case 'TABLE/SET_CARDS_PAGE_COUNT':
            return {...state, pageCount: action.payload.pageCount}
        case 'TABLE/SET_CARDS_PACK_USER_ID':
            return {...state, packUserId: action.payload.packUserId}
        default:
            return state;
    }
}

export const getCardsTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    const {page, pageCount} = getState().packs

    // const params = {
    //     page: state.page,
    //     pageCount:state.pageCount,
    // }

    try {
        const res = await cardsAPI.getCards({page, pageCount})

        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}