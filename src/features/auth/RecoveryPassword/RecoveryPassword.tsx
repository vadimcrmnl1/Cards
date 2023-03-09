import React from "react";
import {useFormik} from "formik";
import s from "./../Login/Login.module.css";
import st from './RecoveryPassword.module.css'
import {Box, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import * as yup from "yup";
import {forgotPassTC} from "../auth-reducer";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
});

export const RecoveryPassword = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values => {
            dispatch(forgotPassTC(values.email))
            console.log(values.email)
            formik.resetForm()
        })
    })


    const activeStyle = {
        textDecoration: 'none'
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 413,
                    height: 552,
                },
            }}
        >

            <Paper>
                <div>
                    <Paper/>
                    <h1>Forgot your password?</h1>
                    <div className={s.loginWrapper}>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <TextField
                                fullWidth
                                variant={'standard'}
                                id={'email'}
                                name={'email'}
                                label={'Email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <div className={st.descriptionBlock}>
                                Enter your email address and we will send you further instructions
                            </div>
                            <Button color={'primary'}
                                    fullWidth
                                    style={{marginTop: '57px', borderRadius: '20px'}}
                                    variant={'contained'}
                                    type={"submit"}
                            >Send instruction</Button>
                        </form>

                        <div className={s.questionBlock}>
                            Did you remember your password?
                        </div>
                        <div className={s.link}>
                            <NavLink to={PATH.login}

                            >Try logging in</NavLink>
                        </div>
                    </div>

                </div>
            </Paper>

        </Box>
    )
}