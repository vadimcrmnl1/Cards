import * as appActions from '../../../app/actions'
import { AllReducersActionType, AppThunk } from '../../../app/types'
import { dateUtils } from '../../../common/utils/dateUtils'
import { errorUtils } from '../../../common/utils/errorUtils'
import * as packsActions from '../Packs/actions'
import {
  AddPackRequestDataType,
  CardPacksType,
  packsAPI,
  UpdatePackRequestDataType,
} from '../table-api'

import { PacksActionsType, PacksParamsType } from './types'

export const packsInitialState = {
  packsLoadingStatus: false,
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 1,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  cardsPackId: '',
  sortPacks: null as string | null,
  packName: '',
  user_id: null as string | null,
  min: 0,
  max: 0,
}

export type PacksInitialStateType = typeof packsInitialState

export const packsReducer = (
  state: PacksInitialStateType = packsInitialState,
  action: PacksActionsType
): PacksInitialStateType => {
  switch (action.type) {
    case 'TABLE/SET_PACKS_LOADING_STATUS':
      return { ...state, packsLoadingStatus: action.payload.packsLoadingStatus }
    case 'TABLE/SET_PACKS':
      return {
        ...state,
        cardPacks: action.payload.cardPacks.map(pack => {
          return { ...pack, updated: dateUtils(pack.updated), created: dateUtils(pack.created) }
        }),
      }
    case 'TABLE/SET_CARDS_PACK_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.payload.cardPacksTotalCount }
    case 'TABLE/SET_MAX_CARDS_COUNT':
      return { ...state, maxCardsCount: action.payload.maxCardsCount }
    case 'TABLE/SET_MIN_CARDS_COUNT':
      return { ...state, minCardsCount: action.payload.minCardsCount }
    case 'TABLE/SET_PACKS_PAGE':
      return { ...state, page: action.payload.page }
    case 'TABLE/SET_PACKS_PAGE_COUNT':
      return { ...state, pageCount: action.payload.pageCount }
    case 'TABLE/SET_PACK_NAME': {
      return { ...state, packName: action.payload.packName }
    }
    case 'TABLE/SET_MY_PACKS': {
      return { ...state, user_id: action.payload.id }
    }
    case 'TABLE/SET_MIN_MAX_CARDS': {
      let newMin = action.payload.min
      let newMax = action.payload.max

      // if (newMin === 0) {
      //   newMin = null
      // }
      // if (newMax === state.maxCardsCount) {
      //   newMax = null
      // }

      return { ...state, min: newMin, max: newMax }
    }
    case 'TABLE/SET_PACKS_SORT':
      return { ...state, sortPacks: action.payload.sortPacks }
    default:
      return state
  }
}

//thunks

export const getPacksTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
  dispatch(packsActions.setPacksLoadingStatusAC(true))
  const { page, pageCount, sortPacks, packName, user_id, min, max, maxCardsCount, minCardsCount } =
    getState().packs
  const params: PacksParamsType = {
    page,
    pageCount,
  }

  if (sortPacks !== null) {
    params.sortPacks = sortPacks
  }
  if (packName !== '') {
    params.packName = packName
  }
  if (user_id !== null) {
    params.user_id = user_id
  }
  if (min) {
    params.min = min
  }
  if (max !== maxCardsCount) {
    params.max = max
  }

  try {
    const res = await packsAPI.getPacks(params)

    dispatch(packsActions.setPacksAC(res.data.cardPacks))
    dispatch(packsActions.setPacksTotalCountAC(res.data.cardPacksTotalCount))
    dispatch(packsActions.setPacksMaxCardsCountAC(res.data.maxCardsCount))
    dispatch(packsActions.setPacksMinCardsCountAC(res.data.minCardsCount))
  } catch (err: any) {
    errorUtils(err, dispatch)
  } finally {
    dispatch(packsActions.setPacksLoadingStatusAC(false))
  }
}

export const addPackTC =
  (data: AddPackRequestDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(packsActions.setPacksLoadingStatusAC(true))
    try {
      await packsAPI.addPack(data)
      dispatch(getPacksTC())
      dispatch(
        appActions.setAppInfoAC(`Your pack -=${data.cardsPack.name}=- has been successfully added`)
      )
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(packsActions.setPacksLoadingStatusAC(false))
    }
  }
export const deletePackTC =
  (id: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(packsActions.setPacksLoadingStatusAC(true))
    try {
      await packsAPI.deletePack(id)
      dispatch(getPacksTC())
      dispatch(appActions.setAppInfoAC(`Your pack has been deleted`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(packsActions.setPacksLoadingStatusAC(false))
    }
  }
export const updatePackTC =
  (data: UpdatePackRequestDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(packsActions.setPacksLoadingStatusAC(true))
    try {
      await packsAPI.updatePack(data)
      dispatch(getPacksTC())
      dispatch(appActions.setAppInfoAC(`Your pack -= ${data.cardsPack.name} =- has been updated`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(packsActions.setPacksLoadingStatusAC(false))
    }
  }
