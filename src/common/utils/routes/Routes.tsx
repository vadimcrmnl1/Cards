import {createHashRouter} from "react-router-dom";
import App from "../../../app/App";
import {ErrorPage} from "../../components/ErrorPage/ErrorPage";
import {Profile} from "../../../features/profile/Profile";
import {Login} from "../../../features/auth/Login/Login";
import {Register} from "../../../features/auth/Register/Register";
import {RecoveryPassword} from "../../../features/auth/RecoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../features/auth/NewPassword/NewPassword";
import {Test} from "../../components/Test/Test";


export const PATH = {
    login: '/login',
    register: '/register',
    profile: '/profile',
    pageNotFound: '/404',
    passwordRecovery: '/password-recovery',
    newPassword: '/set-new-password',
    test: '/test'
}


const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {index: true, element: <Login/>},

                    {
                        path: PATH.login,
                        element: <Login/>,

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
                ]
            }
        ]
    },


]);

export default router