import React from "react";
import {useFormik} from "formik";
import s from "./../Login/Login.module.css";
import {Box, IconButton, InputAdornment, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Button} from "@material-ui/core";
import * as yup from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import st from "../RecoveryPassword/RecoveryPassword.module.css";
import {PATH} from "../../../common/utils/routes/Routes";
import {Navigate, useLocation} from 'react-router-dom'
import {resetPasswordTC} from "../auth-reducer";
import {selectIsPasswordChanged} from "../selectors";

const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const NewPassword = () => {

    const dispatch = useAppDispatch()
    const location = useLocation()
    const token = location.pathname.slice(18)
    const isPasswordChanged = useAppSelector(selectIsPasswordChanged)
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values => {
            dispatch(resetPasswordTC(values.password, token))
        })
    })

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    if (isPasswordChanged) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 413,
                    height: 420,
                },
            }}
        >
            <Paper>
                <div>
                    <Paper/>
                    <h1>Create new password</h1>
                    <div className={s.loginWrapper}>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <TextField
                                fullWidth
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
                            <div className={st.descriptionBlock}>
                                Create new password and we will send you further instructions to email
                            </div>
                            <Button color={'primary'}
                                    fullWidth
                                    style={{marginTop: '57px', borderRadius: '20px'}}
                                    variant={'contained'}
                                    type={"submit"}
                            >Create new password</Button>
                        </form>
                    </div>
                </div>
            </Paper>

        </Box>
    )
}