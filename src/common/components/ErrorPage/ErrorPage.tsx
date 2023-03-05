import React from "react";
import s from './ErrorPage.module.css'
import {Title} from "../Title/Title";

export const ErrorPage = () => {
    return (
        <div>
            <Title title={'Error 404. page not found'}/>
            <div className={s.container}>

            </div>
        </div>
    )
}