import {PacksActionsType} from "./types";
import {AllReducersActionType, AppThunk} from "../../../app/types";
import * as appActions from "../../../app/actions";
import * as tableActions from "./actions";
import {errorUtils} from "../../../common/utils/errorUtils";
import {AddPackRequestDataType, CardPacksType, packsAPI, UpdatePackRequestDataType} from "../table-api";
import {dateUtils} from "../../../common/utils/dateUtils";

export const packsInitialState = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 1,
    maxCardsCount: 1,
    minCardsCount: 1,
    page: 1,
    pageCount: 5,
    cardsPackId: ''
}

export type PacksInitialStateType = typeof packsInitialState

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionsType): PacksInitialStateType => {
    switch (action.type) {
        case 'TABLE/SET_PACKS':
            return {
                ...state, cardPacks: action.payload.cardPacks.map(pack => {
                    return {...pack, updated: dateUtils(pack.updated), created: dateUtils(pack.created)}
                })
            };
        case 'TABLE/SET_CARDS_PACK_TOTAL_COUNT':
            return {...state, cardPacksTotalCount: action.payload.cardPacksTotalCount};
        case 'TABLE/SET_MAX_CARDS_COUNT':
            return {...state, maxCardsCount: action.payload.maxCardsCount};
        case 'TABLE/SET_MIN_CARDS_COUNT':
            return {...state, minCardsCount: action.payload.minCardsCount};
        case 'TABLE/SET_PACKS_PAGE':
            return {...state, page: action.payload.page};
        case 'TABLE/SET_PACKS_PAGE_COUNT':
            return {...state, pageCount: action.payload.pageCount};
        case 'TABLE/ADD_PACK':
            return {...state}
        case 'TABLE/DELETE_PACK':
            return {...state}
        case 'TABLE/UPDATE_PACK':
            return {...state}
        case 'TABLE/SET_FILTER': {
            return {...state, cardPacks: action.payload.packs}
        }
        default:
            return state;
    }
}


//thunks

export const getPacksTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    debugger
    dispatch(appActions.setAppStatusAC('loading'))
    const {page, pageCount} = getState().packs

    // const params = {
    //     page: state.page,
    //     pageCount:state.pageCount,
    // }

    try {
        const res = await packsAPI.getPacks({page, pageCount})
        dispatch(tableActions.setPacksAC(res.data.cardPacks))
        dispatch(tableActions.setPacksTotalCountAC(res.data.cardPacksTotalCount))
        dispatch(tableActions.setPacksMaxCardsCountAC(res.data.maxCardsCount))
        dispatch(tableActions.setPacksMinCardsCountAC(res.data.minCardsCount))
        // dispatch(tableActions.setPacksPageAC(res.data.page))
        // dispatch(tableActions.setPacksPageCountAC(res.data.pageCount))

        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const addPackTC = (data: AddPackRequestDataType): AppThunk<AllReducersActionType> => async dispatch => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.addPack(data)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack -=${data.cardsPack.name}=- has been successfully added`))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const deletePackTC = (id: string): AppThunk<AllReducersActionType> => async dispatch => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.deletePack(id)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack has been deleted`))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const updatePackTC = (data: UpdatePackRequestDataType): AppThunk<AllReducersActionType> => async dispatch => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.updatePack(data)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack -= ${data.cardsPack.name} =- has been updated`))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}

export const setMyPacksTC = (id: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks({userId: id})
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}

export const setPacksTitleTC = (title: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks({packName: title})
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const setFilterCardsTC = (countCards: number[]): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks({min: countCards[0], max: countCards[1]})
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}