import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {PacksTable} from "./PacksTable/PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate, useSearchParams} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {AddPackRequestDataType} from "../table-api";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import {PaginationComponent} from "./components/pagination/PaginationComponent";
import { SearchTitleCards } from './components/searchTitleCards/SearchTitleCards';
import {SortComponent} from "./components/sortingByUser/SortingByUser";
import {FilterCountCards} from "./components/filterCountCards/FilterCountCards";
import {NoFilters} from "./components/noFilters/NoFilters";
import {useEffect, useState} from "react";
import {setPacksSortAC} from "./actions";
import {getPacksTC} from "./packs-reducer";
import {selectPacksMaxCards, selectPacksMinCards, selectPacksSort} from "./selectors";


export const Packs = () => {
    const dispatch = useAppDispatch()
    const packName= localStorage.getItem('packName') || ''
    const userId = localStorage.getItem('userId') || ''
    const min = localStorage.getItem('min') || 0
    const max = localStorage.getItem('max') || 100
    const [searchParams, setSearchParams] = useSearchParams()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const minCards = useAppSelector(selectPacksMinCards)
    const maxCards = useAppSelector(selectPacksMaxCards)
    const sortPacks = useAppSelector(selectPacksSort)
    // const packId = useAppSelector(selectCardPacks)

    const [isFirstLoading, setIsFirstLoading] = useState(true)


    useEffect(() => {
        if (isFirstLoading) {
            const sort = searchParams.get('sortPacks')
            if (sort) {
                dispatch(setPacksSortAC(sort))
            }
            // navigate(`?sortPacks=${sort}`)
            dispatch(getPacksTC())
            setIsFirstLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isFirstLoading) {
            dispatch(getPacksTC())
        }
    }, [dispatch, packName,sortPacks, userId, minCards, maxCards])





    const handleAddPack = () => {
        const cardPack: AddPackRequestDataType = {
            cardsPack: {
                name: 'Pack Name',
                deckCover: '',
                private: false
            }
        }
       // dispatch(addPackTC(cardPack))
    }
    const handleDeletePack = () => {
        const id = '640f6d55dc68f718b46b2501'
    }
    const handleUpdatePack = () => {
    }
    const styleMU = useStyles();

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddPack}
                        variant={'contained'}>Add new pack</Button>
                <Button color={'primary'}
                        style={{borderRadius: '20px', margin: '5px'}}
                        variant={'contained'}
                        onClick={handleDeletePack}
                >Delete pack</Button>
                <Button color={'primary'}
                        style={{borderRadius: '20px', margin: '5px'}}
                        variant={'contained'}
                        onClick={handleUpdatePack}
                >Update pack</Button>
            </div>
            <div className={s.packsBlock}>
                <SearchTitleCards/>
                <SortComponent/>
                <FilterCountCards/>
                <NoFilters/>
            </div>
            <div>
                <PacksTable/>
            </div>
            <PaginationComponent/>

        </div>
    )
}
