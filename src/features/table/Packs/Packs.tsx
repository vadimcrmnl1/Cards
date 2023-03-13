import * as React from 'react';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getPacksTC} from "./packs-reducer";
import {PacksTable} from "./PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import s from "./Packs.module.css"
import SuperPagination from "../../../common/components/SuperPagination/SuperPagination";
import {PaginationComponent} from "./components/PaginationComponent";

export const Packs = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const styleMU = useStyles();
    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h3>Packs list</h3>
                <Button className={styleMU.button} variant={'contained'}>Add new pack</Button>
            </div>
            <div className={s.packsBlock}>
            {/*<SearchComponent/>
            <SortComponent/>
            <FilterComponent/>*/}
            </div>
            <div>
                <PacksTable/>
            </div>
           <PaginationComponent/>
        </div>


    );
};


