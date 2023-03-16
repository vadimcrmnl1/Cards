import {PacksActionsType, PacksParamsType} from "./types";
import {AllReducersActionType, AppThunk} from "../../../app/types";
import * as appActions from "../../../app/actions";
import * as tableActions from "./actions";
import {errorUtils} from "../../../common/utils/errorUtils";
import {AddPackRequestDataType, CardPacksType, packsAPI, UpdatePackRequestDataType} from "../table-api";
import {dateUtils} from "../../../common/utils/dateUtils";
import {setAppErrorAC} from "../../../app/actions";
import {setMinMaxCardsAC, setPackNameAC} from "./actions";

export const packsInitialState = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 1,
    maxCardsCount: 1,
    minCardsCount: 1,
    page: 1,
    pageCount: 5,
    cardsPackId: '',
    sortPacks: null as string | null,
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
            return {...state, max: action.payload.maxCardsCount};
        case 'TABLE/SET_MIN_CARDS_COUNT':
            return {...state, min: action.payload.minCardsCount};
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
        /*  case 'TABLE/SET_MIN_CARDS': {
              return {...state, cardPacks:action.payload.cardPacks.filter((packs)=>{
              return packs.cardsCount>=}
              }*/
        // }
        default:
            return state;
    }
}


//thunks

export const getPacksTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    // dispatch(appActions.setAppStatusAC('loading'))

    const {page, pageCount, cardPacksTotalCount, sortPacks, packName, user_id, min, max} = getState().packs

    const params: PacksParamsType = {
        page,
        pageCount,
    }


    if (sortPacks !== null) {
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
    console.log(page)
    /*if (min !== null && max!==null) {
        params.user_id = user_id
    }*/
    try {
        const res = await packsAPI.getPacks(params)
        console.log(res.data.cardPacks)
        dispatch(tableActions.setPacksAC(res.data.cardPacks))
        // dispatch(tableActions.setPacksTotalCountAC(res.data.cardPacksTotalCount))
        // dispatch(tableActions.setPacksMaxCardsCountAC(res.data.maxCardsCount))
        // dispatch(tableActions.setPacksMinCardsCountAC(res.data.minCardsCount))
        // dispatch(tableActions.setPacksPageAC(res.data.page))
        // dispatch(tableActions.setPacksPageCountAC(res.data.pageCount))
        // dispatch(tableActions.setPackNameAC(params.packName as string))
        // dispatch(tableActions.setMinMaxCardsAC([params.min, params.max]))
        /* dispatch(tableActions.setPacksMaxCardsAC(res.data.cardPacks))
         dispatch(tableActions.setPacksMinCardsAC(res.data.cardPacks))*/
        //dispatch(tableActions.setMinMaxCardsAC(res.data.cardPacks))

        if (packName !== '' && res.data.cardPacks.length === 0) {
            dispatch(appActions.setAppErrorAC(`Packs with name ${packName} no search!!!`))
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
