import React, {useEffect} from 'react';
import s from './App.module.css';
import {Header} from "../common/components/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./store";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./appReducer";

function App() {
    const appStatus = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (appStatus === 'loading') {
        return <CircularProgress sx={{position: 'fixed', top: '30%', right: '50%',}}/>
    }

    return (
        <div className={s.App}>
            <ErrorSnackbar/>
            <Header/>
            <div className={s.appWrapper}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
