import * as React from 'react';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getPacksTC} from "./packs-reducer";
import {PacksTable} from "./PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            <PacksTable/>
        </div>
    );
};


