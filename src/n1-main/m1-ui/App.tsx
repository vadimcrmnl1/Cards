import React from 'react';
import './App.css';
import {Header} from "./header/Header/Header";
import {createBrowserRouter, Link, Route, Routes} from "react-router-dom";
import {PATH} from "./routes/Routes";
import {Login} from "../../n2-features/f1-auth/a1-login/Login/Login";
import {Test} from "../../n2-features/f0-test/Test/Test";
import {ErrorPage} from "../../n2-features/f2-error/ErrorPage/ErrorPage";
import {Register} from "../../n2-features/f1-auth/a2-register/Register/Register";
import {RecoveryPassword} from "../../n2-features/f1-auth/a3-recovery-password/RecoveryPassword/RecoveryPassword";
import {NewPassword} from "../../n2-features/f1-auth/a4-new-password/NewPassword/NewPassword";
import {Profile} from "../../n2-features/f3-profile/Profile/Profile";

function App() {
    return (
        <div className="App">
            <Header/>
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
