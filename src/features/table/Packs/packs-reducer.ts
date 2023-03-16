import {PacksActionsType, PacksParamsType} from "./types";
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
    cardsPackId: '',
    sortPacks: 'off',
    packName: null as string | null,
    user_id: null as string | null,
    min: 0,
    max: 0,
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
        case 'TABLE/SET_PACK_NAME': {
            return {...state, packName: action.payload.packName}
        }
        case 'TABLE/SET_MY_PACKS': {
            return {...state, user_id: action.payload.id}
        }
        case 'TABLE/SET_MIN_MAX_CARDS': {
            return {...state, min: action.payload.counts[0], max: action.payload.counts[1]}
        }
        case 'TABLE/SET_PACKS_SORT':
            return {...state, sortPacks: action.payload.sortPacks}
        default:
            return state;
    }
}


//thunks

export const getPacksTC = (newPage?: number, newPageCount?: number, newSortPacks?: string, newPackName?: string, newUser_id?: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    // dispatch(appActions.setAppStatusAC('loading'))
    const {page, pageCount, cardPacksTotalCount, sortPacks, packName, user_id, min, max} = getState().packs

    const params: PacksParamsType = {
        page: newPage ? newPage : page,
        pageCount: newPageCount ? newPageCount : pageCount,
        // sortPacks: newSortPacks ? newSortPacks : sortPacks
    }
    if (newSortPacks && newSortPacks !== 'off') {
        params.sortPacks = newSortPacks
    } else if (newSortPacks === 'off') {
        params.sortPacks = undefined
    } else if (sortPacks !== 'off') {
        params.sortPacks = sortPacks
    }


    if (packName !== null) {
        params.packName = packName
    }
    if (user_id !== null) {
        params.user_id = user_id
    }
    params.min = min
    params.max = max
    /*if (min !== null && max!==null) {
        params.user_id = user_id
    }*/
    try {
        const res = await packsAPI.getPacks(params)
        dispatch(tableActions.setPacksAC(res.data.cardPacks))
        //проверки чтобы не было бессмысленный экшенов.
        if (page !== res.data.page) {
            dispatch(tableActions.setPacksPageAC(res.data.page))
        }
        if (pageCount !== res.data.pageCount) {
            dispatch(tableActions.setPacksPageCountAC(res.data.pageCount))
        }
        if (cardPacksTotalCount !== res.data.cardPacksTotalCount) {
            dispatch(tableActions.setPacksTotalCountAC(res.data.cardPacksTotalCount))
        }
        dispatch(tableActions.setPacksMaxCardsCountAC(res.data.maxCardsCount))
        dispatch(tableActions.setPacksMinCardsCountAC(res.data.minCardsCount))

        if (params.sortPacks) {
            dispatch(tableActions.setPacksSortAC(params.sortPacks))
        } else {
            dispatch(tableActions.setPacksSortAC('off'))
        }

        // dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const addPackTC = (data: AddPackRequestDataType): AppThunk<AllReducersActionType> => async dispatch => {
    // dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.addPack(data)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack -=${data.cardsPack.name}=- has been successfully added`))
        // dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const deletePackTC = (id: string): AppThunk<AllReducersActionType> => async dispatch => {
    // dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.deletePack(id)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack has been deleted`))
        // dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export const updatePackTC = (data: UpdatePackRequestDataType): AppThunk<AllReducersActionType> => async dispatch => {
    // dispatch(appActions.setAppStatusAC('loading'))
    try {
        await packsAPI.updatePack(data)
        dispatch(getPacksTC())
        dispatch(appActions.setAppInfoAC(`Your pack -= ${data.cardsPack.name} =- has been updated`))
        // dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}

/*export const setMyPacksTC = (id:string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks({userId: id})
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}*/

/*export const setPacksTitleTC = (title: string): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks({packName: title})
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}*/
/*
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
*/

/*export const setFiltersTC = (param:ParamsType): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(appActions.setAppStatusAC('loading'))

    console.log(param)
    try {
        const res = await packsAPI.getPacksFilter({packName:param.packName,
            userId:param.userId, min:param.min, max:param.max})
        //console.log(res.data)
        dispatch(tableActions.setPacksFilterAC(res.data.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (err: any) {
        errorUtils(err, dispatch)
    }
}
export type ParamsType={
    packName?: string
    userId?: string
    min?: number
    max?: number
}*/
/*const initialState={
    packName: '',
    userId: '',
    min: 0,
    max: 100
}*/
