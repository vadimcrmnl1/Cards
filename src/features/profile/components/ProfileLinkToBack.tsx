import {NavLink} from "react-router-dom";
import s from "../Profile.module.css";
import arrow from "../../images/Group 240.svg";
import React from "react";

type ProfileLinkToBackPropsType={
    title:string
}

export const ProfileLinkToBack = (props:ProfileLinkToBackPropsType)=>{
    return(
        <NavLink to={'/packs'} className={s.navLink}>
            <img src={arrow} alt={'arrow'}/>
            <span>{props.title}</span>
        </NavLink>
    )
}