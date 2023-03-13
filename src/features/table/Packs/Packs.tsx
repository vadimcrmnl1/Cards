import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PacksTable} from "./PacksTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)



    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            <PacksTable/>

        </div>
    );
};


