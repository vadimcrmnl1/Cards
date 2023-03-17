import React, {useEffect} from 'react';
import s from './App.module.css';
import {Header} from "../common/components/Header/Header";
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from "./app-reducer";
import {selectIsAppInitialized} from "./selectors";
import {Spinner} from "../common/components/Spinner";


function App() {
    const isAppInitialized = useAppSelector(selectIsAppInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isAppInitialized) {
        return <Spinner/>
    }

    return (
        <div className={s.App}>
            <Header/>
            <div className={s.appWrapper}>
                <Outlet/>
            </div>
        </div>
    )
}

export default App;
