import {NavLink} from "react-router-dom";
import s from "../../../features/profile/Profile.module.css";
import arrow from "../../../features/images/Group 240.svg";
import React from "react";
import {useAppDispatch} from "../../../app/store";

type ProfileLinkToBackPropsType={
    title:string
    linkPage:string
}

export const LinkToBack = (props:ProfileLinkToBackPropsType)=>{
    const dispatch = useAppDispatch()

    return(
        <NavLink to={props.linkPage} className={s.navLink}>
            <img src={arrow} alt={'arrow'}/>
            <span>{props.title}</span>
        </NavLink>
    )
}