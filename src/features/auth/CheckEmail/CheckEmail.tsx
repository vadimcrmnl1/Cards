import React from "react";
import s from "./../Login/Login.module.css";
import {PATH} from "../../../common/utils/routes/Routes";
import { NavLink} from 'react-router-dom'
import SuperButton from "../../../common/components/SuperButton/SuperButton";


export const CheckEmail = () => {


    return (
        <div className={s.container}>
            <h1>Check Email</h1>

            <div className={s.questionBlock}>We’ve sent an Email with instructions to example@mail.com
            </div>
            <div className={s.link}>

                <NavLink to={PATH.login}> <SuperButton>
                    Back to login
                </SuperButton></NavLink>
            </div>
        </div>
    )
}