import React from "react";
import s from "./CheckEmail.module.css";
import {PATH} from "../../../common/utils/routes/Routes";
import {NavLink} from 'react-router-dom'
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import mail from './chackEailImage.png'


export const CheckEmail = () => {


    return (
        <div className={s.container}>
            <h1>Check Email</h1>
            <img src={mail} alt={'mail'}/>
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