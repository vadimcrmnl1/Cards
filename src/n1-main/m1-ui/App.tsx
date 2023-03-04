import React from 'react';
import './App.css';
import {Header} from "./header/Header/Header";
import {Outlet} from "react-router-dom";

function App() {
    console.log('app')
    return (
        <div className="App">

            <Header/>
            <Outlet/>
            {/*<Routes>*/}
            {/*<Route path={PATH.login} element={<Login/>}/>*/}
            {/*<Route path={PATH.register} element={<Register/>}/>*/}
            {/*<Route path={PATH.profile} element={<Profile/>}/>*/}
            {/*<Route path={PATH.passwordRecovery} element={<RecoveryPassword/>}/>*/}
            {/*<Route path={PATH.newPassword} element={<NewPassword/>}/>*/}
            {/*<Route path={PATH.test} element={<Test/>}/>*/}
            {/*<Route path={PATH.pageNotFound} element={<ErrorPage/>}/>*/}
            {/*</Routes>*/}

        </div>
    );
}

export default App;
