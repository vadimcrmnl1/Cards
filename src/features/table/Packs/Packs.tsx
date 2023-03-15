import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {PacksTable} from "./PacksTable/PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate, useSearchParams} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {AddPackRequestDataType, UpdatePackRequestDataType} from "../table-api";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import {PaginationComponent} from "./components/pagination/PaginationComponent";
import { SearchTitleCards } from './components/searchTitleCards/SearchTitleCards';
import {SortComponent} from "./components/sortingByUser/SortingByUser";
import {FilterCountCards} from "./components/filterCountCards/FilterCountCards";
import {NoFilters} from "./components/noFilters/NoFilters";
import {useEffect} from "react";


export const Packs = () => {
    const dispatch = useAppDispatch()
    const packName= localStorage.getItem('packName') || ''
    const userId = localStorage.getItem('userId') || ''
    const min = localStorage.getItem('min') || 0
    const max = localStorage.getItem('max') || 100
    const [searchParams, setSearchParams] = useSearchParams()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    // const packId = useAppSelector(selectCardPacks)
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
      //  dispatch(deletePackTC(id))
    }
    const handleUpdatePack = () => {
      /*  const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id: '640f6d7edc68f718b46b2502',
                name: 'First Pack'
            }
        }
        dispatch(updatePackTC(cardPack))*/
    }
    const styleMU = useStyles();
   /* useEffect(() => {
        const params = Object.fromEntries(searchParams)
        console.log(params)
        dispatch(setFiltersTC({packName: params.packName,
            userId:params.userId,
            min :+params.min,
            max :+params.max}))

    }, [])*/
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
