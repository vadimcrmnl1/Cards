import React from "react";
import s from './ErrorPage.module.css'
import {Title} from "../../../n1-main/m1-ui/common/u1-title/Title/Title";

export const ErrorPage = () => {
    return (
        <div>
            <Title title={'Error 404. page not found'}/>
            <div className={s.container}>

            </div>
        </div>
    )
}