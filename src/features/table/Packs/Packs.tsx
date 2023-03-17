import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PacksTable} from "./PacksTable/PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate, useSearchParams} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {AddPackRequestDataType} from "../table-api";
import {Button, SelectChangeEvent} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import {PaginationComponent} from "./components/pagination/PaginationComponent";
import {SearchTitleCards} from './components/searchTitleCards/SearchTitleCards';
import {SortComponent} from "./components/sortingByUser/SortingByUser";
import {FilterCountCards} from "./components/filterCountCards/FilterCountCards";
import {NoFilters} from "./components/noFilters/NoFilters";
import {useEffect} from "react";
import {selectCardPacks, selectMaxCardsCount, selectMinCardsCount, selectPacksUserId} from "./selectors";
import {addPackTC, deletePackTC, getPacksTC, updatePackTC} from "./packs-reducer";
import {UpdatePackRequestDataType} from '../table-api';
import {
    selectCardPacksTotalCount,
    selectPacksMaxCards, selectPacksMinCards, selectPacksName,
    selectPacksPage,
    selectPacksPageCount, selectPacksSort
} from "./selectors";
import {
    setMyPacksAC,
    setMinMaxCardsAC, setPackNameAC,
    setPacksPageAC,
    setPacksPageCountAC
} from "./actions";
import {ErrorSnackbar} from "../../../common/components/ErrorSnackbar/ErrorSnackbar";
import {selectIsAppMakeRequest} from "../../../app/selectors";
import {selectUserId} from "../../profile/selectors";



export const Packs = () => {
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectUserId)
    const totalCount = useAppSelector(selectCardPacksTotalCount)
    const pageNumber = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const minCardsCount = useAppSelector(selectMinCardsCount)
    const maxCardsCount = useAppSelector(selectMaxCardsCount)
    const minCards = useAppSelector(selectPacksMinCards)
    const maxCards = useAppSelector(selectPacksMaxCards)
    const sortPacks = useAppSelector(selectPacksSort)
    const page = useAppSelector(selectPacksPage)
    const packName = useAppSelector(selectPacksName)
    const userId = useAppSelector(selectPacksUserId)
    const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

    //const packsLoadingStatus = useAppSelector(selectPacksLoadingStatus)
    const [searchParams, setSearchParams] = useSearchParams()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const cardPacks = useAppSelector(selectCardPacks)
    const styleMU = useStyles();

    useEffect(() => {
        if (isLoggedIn){
            dispatch(getPacksTC())
        }
    }, [dispatch, page, pageCount, packName, sortPacks, userId, minCards, maxCards])
    useEffect(()=>{
        const params = Object.fromEntries(searchParams)
        dispatch(setPacksPageCountAC(+params.pageCount || 5))
        dispatch(setPacksPageAC(+params.page || 1))
        dispatch(setMinMaxCardsAC(+params.min || 0, +params.max || 0))
        dispatch(setPackNameAC(params.packName || null))
        dispatch(setMyPacksAC(params.user_id || ''))
    },[])

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

   const handleAddPack = () => {
        const cardPack: AddPackRequestDataType = {
            cardsPack: {
                name: 'Pack Name',
                deckCover: '',
                private: false
            }
        }
        dispatch(addPackTC(cardPack))
    }
    /*const handleDeletePack = () => {
        dispatch(deletePackTC(cardPacks[0]._id))
    }
    const handleUpdatePack = () => {
        const identifier = Math.random().toFixed(2)
        const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id: cardPacks[0]._id,
                name: 'Name updated'+identifier
            }
        }
        dispatch(updatePackTC(cardPack))
    }*/

//Change pagination
    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage:number) => {
        dispatch(setPacksPageAC(newPage+1))
        setSearchParams({...searchParams, page:(newPage+1).toString()})
    };
    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        dispatch(setPacksPageCountAC(+event.target.value));
        dispatch(setPacksPageAC(1))
        setSearchParams({...searchParams, page: '1', pageCount: event.target.value})
    };
//Sort by slider
    const handleChangeCountCards = (event:any, newValue:number | number[]) => {
        const counts = newValue as number []
        dispatch(setMinMaxCardsAC(counts[0], counts[1]))
        setSearchParams({...searchParams, min: counts[0].toString(), max: counts[1].toString()})
    };
//Search by title Packs
    const handleSearchTitleCards = (value: string) => {
        dispatch(setPackNameAC(value))
        setSearchParams({...searchParams, packName:value})
    }
//Delete Filters
    const handleDeleteAllFilters=()=>{
        dispatch(setPackNameAC(''))
        dispatch(setMyPacksAC(''))
        dispatch(setMinMaxCardsAC(0, maxCardsCount))
        setSearchParams({page:'1',
                                 pageCount: '5',
                                min: minCardsCount.toString(),
                                max: maxCardsCount.toString(),
                                packName:'' as string,
                                user_id:'' as string})
    }
//Sort by my packs
    const handleSortByMyPacks = () => {
        dispatch(setMyPacksAC(myID))
        setSearchParams({...searchParams, user_id:myID as string})
    }
    const handleSortByAllPacks = () => {
        dispatch(setMyPacksAC(''))
        setSearchParams({...searchParams, user_id: ''})
    }
    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddPack}
                        variant={'contained'}
                        disabled={isAppMakeRequest}
                >
                    Add new pack
                </Button>
            </div>
            <div className={s.packsBlock}>
                <SearchTitleCards handleSendQuery={handleSearchTitleCards}/>
                <SortComponent handleSortByAllPacks={handleSortByAllPacks}
                               handleSortByMyPacks={handleSortByMyPacks}/>
                <FilterCountCards handleChange={handleChangeCountCards}/>
                <NoFilters handleDeleteAllFilters={handleDeleteAllFilters}/>
            </div>
            <div>
                <PacksTable/>
            </div>
            <PaginationComponent totalCount={totalCount}
                                 pageNumber={pageNumber}
                                 pageCount={pageCount}
                                 handleChangePage={handleChangePage}
                                 handleChangeRowsPerPage={handleChangeRowsPerPage}/>
            <ErrorSnackbar/>
        </div>
    )
}
