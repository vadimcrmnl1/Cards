import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/Routes";
import {Button} from "../Button/Button";


export const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.buttonsBlock}>
                <NavLink to={PATH.login}><Button title={'Login'}/></NavLink>
                <NavLink to={PATH.register}><Button title={'Register'}/></NavLink>
                <NavLink to={PATH.profile}><Button title={'Profile'}/></NavLink>
                <NavLink to={PATH.pageNotFound}><Button title={'Error'}/></NavLink>
                <NavLink to={PATH.passwordRecovery}><Button title={'Recovery password'}/></NavLink>
                <NavLink to={PATH.newPassword}><Button title={'New password'}/></NavLink>
                <NavLink to={PATH.test}><Button title={'Test'}/></NavLink>

            </div>
        </div>
    )
}