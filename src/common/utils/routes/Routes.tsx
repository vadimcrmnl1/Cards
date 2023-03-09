import {createHashRouter} from "react-router-dom";
import App from "../../../app/App";
import {ErrorPage} from "../../components/ErrorPage/ErrorPage";
import {Profile} from "../../../features/profile/Profile";
import {Login} from "../../../features/auth/Login/Login";
import {RecoveryPassword} from "../../../features/auth/RecoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../features/auth/NewPassword/NewPassword";
import {Test} from "../../components/Test/Test";
import {SignUp} from "../../../features/auth/SignUp/SignUp";


export const PATH = {
    login: '/login',
    signUp:'/sign-up',
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
                        path:PATH.signUp,
                        element:<SignUp/>
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
                        path: PATH.newPassword+'/*',
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