import React, {useEffect} from "react";
import s from './Login.module.css'
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, Checkbox, FormControlLabel} from "@material-ui/core";
import {Box, IconButton, InputAdornment, Paper,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import TextField from '@mui/material/TextField'
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {loginTC} from "../auth-reducer";
import {selectIsLoggedIn} from "../selectors";
import {setIsPasswordChangedAC, setIsSignedUpAC, setMailWasSentAC} from "../actions";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    rememberMe: yup
        .string()

});

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

//сброс isSignedUp чтобы можно было перейти на сигнап, восстановление пароля или на снова можно было вводить новый пароль
    useEffect(() => {
        dispatch(setIsSignedUpAC(false))
        dispatch(setMailWasSentAC(false))
        dispatch(setIsPasswordChangedAC(false))
    }, [dispatch])


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: (values => {
            dispatch(loginTC(values))
            formik.resetForm()
        })
    })

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const activeStyle = {
        textDecoration: 'none'
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.packs}/>
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
                    <h1>Sign in</h1>
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
                            <TextField
                                fullWidth
                                style={{marginTop: '15px'}}
                                variant={'standard'}
                                id={'password'}
                                type={showPassword ? 'text' : 'password'}
                                name={'password'}
                                label={'Password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <div className={s.rememberBlock}>
                                <FormControlLabel
                                    style={{marginTop: '10px'}}
                                    control={<Checkbox
                                        id={'rememberMe'}
                                        name={'rememberMe'}
                                        onChange={formik.handleChange}
                                        color={'primary'}
                                    />} label={'Remember me'}/>
                            </div>
                            <Button color={'primary'}
                                    fullWidth
                                    style={{marginTop: '20px', borderRadius: '20px'}}
                                    variant={'contained'}
                                    type={"submit"}
                            >Sign in</Button>
                        </form>
                        <div className={s.forgotPassBlock}>
                            <span><NavLink to={PATH.passwordRecovery}
                                           style={({isActive}) =>
                                               isActive ? activeStyle : activeStyle
                                           }
                            >Forgot password?</NavLink></span>
                        </div>
                        <div className={s.questionBlock}>
                            Don't have an account yet?
                        </div>
                        <div className={s.link}>
                            <NavLink to={PATH.signUp}

                            >Sign up</NavLink>
                        </div>
                    </div>
                </div>
            </Paper>
        </Box>
    )
}