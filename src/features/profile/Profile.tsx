import React, {useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import arrow from "../images/Group 240.svg"
import s from "./Profile.module.css"
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logoutTC} from "../auth/auth-reducer";
import {PATH} from "../../common/utils/routes/Routes";
import {ProfileEditNameBlock} from "./components/ProfileEditNameBlock";
import {ProfileNameBlock} from "./components/ProfileNameBlock";
import {ProfileLinkToBack} from "./components/ProfileLinkToBack";
import avatar from "./../images/avatar.webp"


/*export type FormikErrorType = {
    nickName?: string
}*/
export const Profile = () => {

    const [editMode, setEditMode] = useState(false)
    const error = useAppSelector(state => state.app.error)
    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()

    const handleLogout = () => {dispatch(logoutTC())}

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    const handleOnBlurName = () => {
        setEditMode(false)
    }
    return (
        <div className={s.profile}>
            <div className={s.container}>
                <div className={s.link}>
                    <ProfileLinkToBack title={'Back to Packs List'}/>
                 </div>
                <div className={s.informBlock}>
                    <h3>Personal Information</h3>
                    <div className={s.avatar}>
                         <img src={avatar} alt={'avatar'} className={s.avatarPic}/>
                    </div>
                    {editMode
                        ?
                        <ProfileEditNameBlock setEditMode={setEditMode}/>
                        :
                        <ProfileNameBlock setEditMode={setEditMode}/>
                    }
                    <span>{email}</span>
                    <button onClick={handleLogout}
                            className={s.buttonLogout}>
                         Log out
                    </button>
                </div>
            </div>
        </div>
    )
}