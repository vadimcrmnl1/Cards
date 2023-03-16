import React from "react";
import s from "./CheckEmail.module.css";
import {PATH} from "../../../common/utils/routes/Routes";
import { useNavigate} from 'react-router-dom'
import mail from './chackEailImage.png'
import Button from "@material-ui/core/Button";


export const CheckEmail = () => {

    const navigate = useNavigate()

    const handleOnClock = () => {
        navigate(PATH.login)
    }
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
                        onClick={handleOnClock}
                        fullWidth
                >
                        Back to login
                </Button>

            </div>
        </div>
    )
}