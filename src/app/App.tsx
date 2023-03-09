import React, {useEffect} from 'react';
import s from './App.module.css';
import {Header} from "../common/components/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {InitializeAppTC} from "./AppReducer";
import {useAppDispatch, useAppSelector} from "./store";
import {CircularProgress} from "@mui/material";

function App() {
    const isInitialize = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(InitializeAppTC())
    }, [])
    // if (!isInitialize) {
    //     return <div
    //         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
    //         <CircularProgress/>
    //     </div>
    // }

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
