import { AllReducersActionType, AppThunk } from '../../../app/types'
import { dateUtils } from '../../../common/utils/dateUtils'
import { errorUtils } from '../../../common/utils/errorUtils'
import {
  AddCardRequestType,
  cardsAPI,
  CardsType,
  UpdateCardRequestDataType,
  UpdateGradeDataType,
} from '../table-api'

import * as appActions from './../../../app/actions'
import { setAppIsLoadingAC } from './../../../app/actions'
import * as cardsActions from './actions'
import { setCardsUpdateGradeAC } from './actions'
import { CardsActionsType, CardsParamsType } from './types'

export const cardsInitialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 1,
  maxGrade: 1,
  minGrade: 1,
  page: 1,
  pageCount: 100,
  pack_id: '',
  packUser_id: '',
  sortCards: null as null | string,
  cardQuestion: '',
  name: '',
}

export type CardsInitialStateType = typeof cardsInitialState

export const cardsReducer = (
  state: CardsInitialStateType = cardsInitialState,
  action: CardsActionsType
): CardsInitialStateType => {
  switch (action.type) {
    case 'TABLE/SET_CARDS':
      return {
        ...state,
        cards: action.payload.cards.map(cards => {
          return {
            ...cards,
            updated: dateUtils(cards.updated),
            created: dateUtils(cards.created),
          }
        }),
      }
    case 'TABLE/SET_CARDS_TOTAL_COUNT':
      return { ...state, cardsTotalCount: action.payload.cardsTotalCount }
    case 'TABLE/SET_CARDS_MAX_GRADE':
      return { ...state, maxGrade: action.payload.maxGrade }
    case 'TABLE/SET_CARDS_MIN_GRADE':
      return { ...state, minGrade: action.payload.minGrade }
    case 'TABLE/SET_CARDS_PAGE':
      return { ...state, page: action.payload.page }
    case 'TABLE/SET_CARDS_PAGE_COUNT':
      return { ...state, pageCount: action.payload.pageCount }
    case 'TABLE/SET_CARDS_PACK_ID':
      return { ...state, pack_id: action.payload.pack_id }
    case 'TABLE/SET_CARDS_PACK_USER_ID':
      return { ...state, packUser_id: action.payload.packUser_id }
    case 'TABLE/SET_CARDS_SORT':
      return { ...state, sortCards: action.payload.sortCards }
    case 'TABLE/SET_CARDS_SEARCH_BY_QUESTION':
      return { ...state, cardQuestion: action.payload.question }
    case 'TABLE/SET_CARDS_PACK_NAME':
      return { ...state, name: action.payload.name }
    case 'TABLE/SET_CARDS_UPDATE_GRADE':
      return {
        ...state,
        cards: [
          ...state.cards.map(el => {
            return el._id === action.payload.id ? { ...el, grade: action.payload.grade } : el
          }),
        ],
      }

    default:
      return state
  }
}

export const getCardsTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
  dispatch(setAppIsLoadingAC(true))
  const { page, pageCount, pack_id, sortCards, cardQuestion } = getState().cards
  const params: CardsParamsType = {
    page,
    pageCount,
    cardsPack_id: pack_id.toString(),
    cardQuestion,
  }

  if (sortCards !== null) {
    params.sortCards = sortCards
  }
  if (cardQuestion !== null) {
    params.cardQuestion = cardQuestion
  }
  try {
    const res = await cardsAPI.getCards(params)

    dispatch(cardsActions.setCardsAC(res.data.cards))
    dispatch(cardsActions.setCardsTotalCountAC(res.data.cardsTotalCount))
    dispatch(cardsActions.setCardsMaxGradeAC(res.data.maxGrade))
    dispatch(cardsActions.setCardsMinGradeAC(res.data.minGrade))
    dispatch(cardsActions.setCardsSearchByQuestionAC(params.cardQuestion as string))
    // dispatch(cardsActions.setPageAC(res.data.page))
    // dispatch(cardsActions.setPageCountAC(res.data.pageCount))
    // dispatch(appActions.setAppStatusAC('succeeded'))
  } catch (err: any) {
    errorUtils(err, dispatch)
  } finally {
    dispatch(setAppIsLoadingAC(false))
  }
}
export const addCardTC =
  (data: AddCardRequestType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      await cardsAPI.addCard(data)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC(`Your card has been added`))
      // dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }
export const deleteCardTC =
  (id: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      await cardsAPI.deleteCard(id)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC('Your card has been deleted'))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }
export const updateCardTC =
  (data: UpdateCardRequestDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      await cardsAPI.updateCard(data)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC(`Your card has been updated`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }

/*export const getCardsForLearnTC =
    (packId:string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
        dispatch(setAppIsLoadingAC(true));
       /!* const { page, pageCount, pack_id, sortCards, cardQuestion } =
            getState().cards;
        const params: CardsParamsType = {
            page,
            pageCount,
            cardsPack_id: pack_id.toString(),
            cardQuestion,
        };
        if (sortCards !== null) {
            params.sortCards = sortCards;
        }
        if (cardQuestion !== null) {
            params.cardQuestion = cardQuestion;
        }*!/
        try {
            const res = await cardsAPI.getCardsForLearn(packId);
            dispatch(cardsActions.setCardsAC(res.data.cards));
           /!* dispatch(cardsActions.setCardsTotalCountAC(res.data.cardsTotalCount));
            dispatch(cardsActions.setCardsMaxGradeAC(res.data.maxGrade));
            dispatch(cardsActions.setCardsMinGradeAC(res.data.minGrade));
            dispatch(
                cardsActions.setCardsSearchByQuestionAC(params.cardQuestion as string)
            );*!/
            // dispatch(cardsActions.setPageAC(res.data.page))
            // dispatch(cardsActions.setPageCountAC(res.data.pageCount))
            // dispatch(appActions.setAppStatusAC('succeeded'))
        } catch (err: any) {
            errorUtils(err, dispatch);
        } finally {
            dispatch(setAppIsLoadingAC(false));
        }
    };*/

export const updateGradeTC =
  (data: UpdateGradeDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      const res = await cardsAPI.updateGrade(data)
      const a = dispatch(setCardsUpdateGradeAC(res.data.card_id, res.data.grade))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }
