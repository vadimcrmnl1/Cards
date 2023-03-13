import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import s from "./Profile.module.css"
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logoutTC} from "../auth/auth-reducer";
import {PATH} from "../../common/utils/routes/Routes";
import {ProfileEditNameBlock} from "./components/ProfileEditNameBlock";
import {ProfileNameBlock} from "./components/ProfileNameBlock";
import {ProfileLinkToBack} from "./components/ProfileLinkToBack";
import avatar from "./../images/avatar.webp"
import {useStyles} from "./components/ProfileStileMU";
import {Button} from "@mui/material";

export const Profile = () => {

    const [editMode, setEditMode] = useState(false)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const styleMU = useStyles();
    const dispatch = useAppDispatch()

    const handleLogout = () => {dispatch(logoutTC())}

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    /*const handleOnBlurName = () => {
        setEditMode(false)
    }*/
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
                    <Button variant={'contained'}
                            onClick={handleLogout}
                            className={styleMU.button}>
                         Log out
                    </Button>
                </div>
            </div>
        </div>
    )
}