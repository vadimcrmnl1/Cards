import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {PacksTable} from "./PacksTable/PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate, useSearchParams} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import {PaginationComponent} from "./components/pagination/PaginationComponent";
import {SearchTitleCards} from './components/searchTitleCards/SearchTitleCards';
import {SortComponent} from "./components/sortingByUser/SortingByUser";
import {FilterCountCards} from "./components/filterCountCards/FilterCountCards";
import {NoFilters} from "./components/noFilters/NoFilters";
import {useEffect} from "react";
import {selectCardPacks, selectPacksLoadingStatus, selectPacksUserId} from "./selectors";
import {addPackTC, deletePackTC, updatePackTC} from "./packs-reducer";
import {AddPackRequestDataType, UpdatePackRequestDataType} from '../table-api';
import {
    selectCardPacksTotalCount,
    selectMaxCardsCount,
    selectMinCardsCount, selectPacksMaxCards, selectPacksMinCards, selectPacksName,
    selectPacksPage,
    selectPacksPageCount, selectPacksSort
} from "./selectors";
import {
    setMinMaxCardsAC, setPackNameAC,
    setPacksPageAC,
    setPacksPageCountAC
} from "./actions";
import {getPacksTC} from "./packs-reducer";


export const Packs = () => {
    const dispatch = useAppDispatch()
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
    const packsLoadingStatus = useAppSelector(selectPacksLoadingStatus)

    const [searchParams, setSearchParams] = useSearchParams()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const cardPacks = useAppSelector(selectCardPacks)
    // const [isFirstLoading, setIsFirstLoading] = useState(true)


    useEffect(() => {
        if (isLoggedIn){
            dispatch(getPacksTC())
        }
    }, [dispatch, page, pageCount, packName, sortPacks, userId, minCards, maxCards])

    useEffect(() => {
        // if (isFirstLoading) {
        // dispatch(getPacksTC())
        // setSearchParams({...searchParams,sortPacks: sortPacks!})
        const params = Object.fromEntries(searchParams)
        dispatch(setPacksPageCountAC(+params.pageCount || 5))
        dispatch(setPacksPageAC(+params.page || 1))
        dispatch(setMinMaxCardsAC(+params.min || minCards, +params.max || maxCards))
        dispatch(setPackNameAC(params.packName || ''))
        // }
        /*dispatch(setPacksMaxCardsCountAC(+params.max || maxCardsCount))
        dispatch(setPacksMinCardsCountAC(+params.min || minCardsCount))*/
    }, [])

    console.log('Packs',typeof page,typeof pageCount, 'packName:',typeof packName, 'sortPacks:',typeof sortPacks,typeof userId,typeof minCards,typeof maxCards)


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
    const handleDeletePack = () => {

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
    }
    const styleMU = useStyles();


    const handleChangePage = (e: any, newPage: number) => {
        console.log('searchParams=', searchParams)
        dispatch(setPacksPageAC(newPage + 1))
        setSearchParams({...searchParams, page: (newPage + 1).toString()})
    };

    const handleChangeRowsPerPage = (e: any) => {
        console.log('searchParams=', searchParams)
        dispatch(setPacksPageCountAC(+e.target.value));
        dispatch(setPacksPageAC(1))
        setSearchParams({page: 1, pageCount: +e.target.value}.toString)
    };

    const handleChangeCountCards = (event: any, newValue: number | number[]) => {
        const counts = newValue as number []
        dispatch(setMinMaxCardsAC(counts[0], counts[1]))
        setSearchParams({...searchParams, min:counts[0].toString(),max:counts[1].toString()})
    };
    const handleSearchTitleCards = (value: string) => {
        dispatch(setPackNameAC(value))
        setSearchParams({...searchParams, packName: value})
        console.log(searchParams)
    }


    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddPack}
                        variant={'contained'}
                        disabled={packsLoadingStatus}>Add new pack</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleDeletePack}
                        disabled={packsLoadingStatus}
                >Delete pack</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleUpdatePack}
                        disabled={packsLoadingStatus}
                >Update pack</Button>
            </div>
            <div className={s.packsBlock}>
                <SearchTitleCards handleSendQuery={handleSearchTitleCards}/>
                <SortComponent/>
                <FilterCountCards handleChange={handleChangeCountCards}/>
                <NoFilters/>
            </div>
            <div>
                <PacksTable/>
            </div>
            <PaginationComponent totalCount={totalCount}
                                 pageNumber={pageNumber}
                                 pageCount={pageCount}
                                 handleChangePage={handleChangePage}
                                 handleChangeRowsPerPage={handleChangeRowsPerPage}/>

        </div>
    )
}
