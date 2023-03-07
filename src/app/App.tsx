import React from 'react';
import s from './App.module.css';
import {Header} from "../common/components/Header/Header";
import {Outlet} from "react-router-dom";

function App() {
    console.log('app')
    return (
        <div className={s.App}>

            <Header/>
            <div className={s.appWrapper}>

                <Outlet/>
            </div>

            {/*<Routes>*/}
            {/*<Route path={PATH.login} element={<Login/>}/>*/}
            {/*<Route path={PATH.register} element={<Register/>}/>*/}
            {/*<Route path={PATH.profile} element={<Profile/>}/>*/}
            {/*<Route path={PATH.passwordRecovery} element={<RecoveryPassword/>}/>*/}
            {/*<Route path={PATH.newPassword} element={<NewPassword/>}/>*/}
            {/*<Route path={PATH.test} element={<test/>}/>*/}
            {/*<Route path={PATH.pageNotFound} element={<ErrorPage/>}/>*/}
            {/*</Routes>*/}

        </div>
    );
}

export default App;
