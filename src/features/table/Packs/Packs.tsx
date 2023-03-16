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
import {selectCardPacks} from "./selectors";
import {addPackTC, deletePackTC, updatePackTC} from "./packs-reducer";
import {AddPackRequestDataType, UpdatePackRequestDataType} from '../table-api';
import {
    selectCardPacksTotalCount,
    selectMaxCardsCount,
    selectMinCardsCount, selectPacksMaxCards, selectPacksMinCards,
    selectPacksPage,
    selectPacksPageCount
} from "./selectors";
import {
    setMinMaxCardsAC, setPackNameAC,
    setPacksMaxCardsCountAC,
    setPacksMinCardsCountAC,
    setPacksPageAC,
    setPacksPageCountAC
} from "./actions";
import {useEffect} from "react";

type ParamsType={

}

export const Packs = () => {
    const dispatch = useAppDispatch()
    const packName= localStorage.getItem('packName') || ''
    const userId = localStorage.getItem('userId') || ''
    const min = localStorage.getItem('min') || 0
    const max = localStorage.getItem('max') || 100
    const totalCount=useAppSelector(selectCardPacksTotalCount)
    const pageNumber= useAppSelector(selectPacksPage)
    const pageCount= useAppSelector(selectPacksPageCount)
    const minCardsCount= useAppSelector(selectMinCardsCount)
    const maxCardsCount= useAppSelector(selectMaxCardsCount)
    const minCards=useAppSelector(selectPacksMinCards)
    const maxCards=useAppSelector(selectPacksMaxCards)
    const [searchParams, setSearchParams] = useSearchParams()
    // const packId = useAppSelector(selectPackId)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const packId = useAppSelector(selectCardPacks)
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

       dispatch(deletePackTC(packId[0]._id))
    }
    const handleUpdatePack = () => {
        const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id: packId[0]._id,
                name: 'First Pack'
            }
        }
        dispatch(updatePackTC(cardPack))
    }
    const styleMU = useStyles();

    useEffect(()=>{

       const params = Object.fromEntries(searchParams)
       console.log('params=', params)
       dispatch(setPacksPageCountAC(+params.pageCount || 5))
       dispatch(setPacksPageAC(+params.page || 1))
       dispatch(setMinMaxCardsAC([+params.min || minCards, +params.max || maxCards]))
        dispatch(setPackNameAC(params.packName || ''))

        /*dispatch(setPacksMaxCardsCountAC(+params.max || maxCardsCount))
        dispatch(setPacksMinCardsCountAC(+params.min || minCardsCount))*/
    },[])
    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    const handleChangePage = (e:any, newPage:number) => {
        console.log('searchParams=', searchParams)
        dispatch(setPacksPageAC(newPage+1))
        setSearchParams({...searchParams, page:(newPage+1).toString()})
    };

    const handleChangeRowsPerPage = (e:any) => {
        console.log('searchParams=', searchParams)
        dispatch(setPacksPageCountAC(+e.target.value));
        dispatch(setPacksPageAC(1))
        setSearchParams({page:1, pageCount:+e.target.value}.toString)
    };

    const handleChangeCountCards = (event:any, newValue:number | number[]) => {
        dispatch(setMinMaxCardsAC(newValue as number[]))
       const counts = newValue as number []
        setSearchParams({...searchParams, min:counts[0].toString(),max:counts[1].toString()})
    };
    const handleSearchTitleCards = (value: string) => {
        dispatch(setPackNameAC(value))
        setSearchParams({...searchParams, packName:value})
        console.log(searchParams)
    }
    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddPack}
                        variant={'contained'}>Add new pack</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleDeletePack}
                >Delete pack</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleUpdatePack}
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
