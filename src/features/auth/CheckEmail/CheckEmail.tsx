import React from "react";
import s from "./CheckEmail.module.css";
import {PATH} from "../../../common/utils/routes/Routes";
import {NavLink} from 'react-router-dom'
import mail from './chackEailImage.png'
import Button from "@material-ui/core/Button";


export const CheckEmail = () => {


    return (
        <div className={s.container}>
            <h1>Check Email</h1>
            <img src={mail} alt={'mail'}/>
            <div className={s.questionBlock}>We’ve sent an Email with instructions to example@mail.com
            </div>
            <div className={s.link}>


                <Button color={'primary'}
                        style={{borderRadius: '20px'}}
                        variant={'contained'}

                >
                    <NavLink to={PATH.login}>
                        Back to login
                    </NavLink>
                </Button>

            </div>
        </div>
    )
}