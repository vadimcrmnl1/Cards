import React, {useEffect, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import arrow from "../images/Group 240.svg"
import s from "./Profile.module.css"
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import editIcon from "../../common/components/SuperEditableSpan/editIcon.svg";
import {Button, TextField} from "@mui/material";
import {changeNameTC, getDataTC, logoutTC} from "../auth/auth-reducer";
import {PATH} from "../../common/utils/routes/Routes";
import {ProfileEditNameBlock} from "./components/ProfileEditNameBlock";
import {ProfileNameBlock} from "./components/ProfileNameBlock";
import {selectLoginStatus} from "../auth/selectors";

export type FormikErrorType = {
    nickName?: string
}

export const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const error = useAppSelector(state => state.app.error)
    const userData = useAppSelector(state => state.auth.data)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()

    const handleLogout = () => {dispatch(logoutTC())}

    if (!loginStatus) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.profile}>
            <div className={s.container}>
                <div className={s.link}>
                    <NavLink to={'/login'} className={s.navLink}>
                        <img src={arrow} alt={'arrow'}/>
                        <span>Back to Packs List</span>
                    </NavLink>
                </div>
                <div className={s.informBlock}>
                    <h3>Personal Information</h3>
                    <div className={s.avatar}>
                        {/* <img src={'*'} alt={'avatar'}/>*/}
                    </div>
                    {editMode
                        ?
                        <ProfileEditNameBlock setEditMode={setEditMode}/>
                        :
                        <ProfileNameBlock setEditMode={setEditMode}/>
                    }
                    <span>{userData.email}</span>
                    <button onClick={handleLogout}
                            className={s.buttonLogout}>
                        {/*<div className={s.logoutImg}><img src={logOut} alt={'logout'}/></div>*/}
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}