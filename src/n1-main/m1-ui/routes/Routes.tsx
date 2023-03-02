import {createHashRouter} from "react-router-dom";
import App from "../App";
import {ErrorPage} from "../../../n2-features/f2-error/ErrorPage/ErrorPage";
import {Profile} from "../../../n2-features/f3-profile/Profile/Profile";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login/Login";
import {Register} from "../../../n2-features/f1-auth/a2-register/Register/Register";
import {RecoveryPassword} from "../../../n2-features/f1-auth/a3-recovery-password/RecoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../n2-features/f1-auth/a4-new-password/NewPassword/NewPassword";
import {Test} from "../../../n2-features/f0-test/Test/Test";


export const PATH = {
    login: '/login',
    register: '/register',
    profile: '/profile',
    pageNotFound: '/404',
    passwordRecovery: '/password-recovery',
    newPassword: '/new-password',
    test: '/test'
}


const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {
        path: PATH.login,
        element: <Login/>
    },
    {
        path: PATH.register,
        element: <Register/>
    },
    {
        path: PATH.profile,
        element: <Profile/>
    },
    {
        path: PATH.passwordRecovery,
        element: <RecoveryPassword/>
    },
    {
        path: PATH.newPassword,
        element: <NewPassword/>
    },
    {
        path: PATH.test,
        element: <Test/>
    }

]);

export default router