import {CardsActionsType} from "./types";
import {AddCardRequestType, cardsAPI, CardsType, UpdateCardRequestDataType} from "../table-api";
import {dateUtils} from "../../../common/utils/dateUtils";
import {AllReducersActionType, AppThunk} from "../../../app/types";
import * as appActions from './../../../app/actions'
import * as cardsActions from './actions'
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
            return {
                ...state, cards: action.payload.cards.map(cards => {
                    return {...cards, updated: dateUtils(cards.updated), created: dateUtils(cards.created)}
                })
            }
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
export const getCardsTC = (cardsPack_id: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    const {page, pageCount} = getState().cards
    try {
        const res = await cardsAPI.getCards({page, pageCount, cardsPack_id})
        dispatch(cardsActions.setCardsAC(res.data.cards))
        dispatch(cardsActions.setCardsTotalCountAC(res.data.cardsTotalCount))
        dispatch(cardsActions.setMaxGradeAC(res.data.maxGrade))
        dispatch(cardsActions.setMinGradeAC(res.data.minGrade))
        // dispatch(cardsActions.setPageAC(res.data.page))
        // dispatch(cardsActions.setPageCountAC(res.data.pageCount))
        dispatch(cardsActions.setPackUserId(res.data.packUserId))
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
}
export const addCardTC = (data: AddCardRequestType, cardsPack_id: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.addCard(data)
        if (res.status === 201) {
            dispatch(getCardsTC(cardsPack_id))
            dispatch(appActions.setAppInfoAC(`Your card has been added`))
        }
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
}
export const deleteCardTC = (id: string, cardsPack_id: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.deleteCard(id)
        if (res.status === 200) {
            dispatch(getCardsTC(cardsPack_id))
            dispatch(appActions.setAppInfoAC('Your cart has been deleted'))
        }
    }
    catch (err: any) {
        errorUtils(err, dispatch)
    }
    finally {
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
}
export const updateCardTC = (data: UpdateCardRequestDataType, cardsPack_id: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.updateCard(data)
        if (res.status === 200) {
            dispatch(getCardsTC(cardsPack_id))
            dispatch(appActions.setAppInfoAC(`Your card has been updated`))
        }
    }
    catch (err: any) {
        errorUtils(err, dispatch)
    }
    finally {
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
}