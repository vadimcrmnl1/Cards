import React from "react";
import s from './SignUp.module.css'
import {FormikHelpers, useField, useFormik} from 'formik';
import * as yup from "yup";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Button} from "@material-ui/core";
import {FieldInputProps, FormikConfig, FormikErrors, FormikTouched} from "formik/dist/types";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from '@mui/icons-material/Visibility';
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectIsLoggedIn} from "../selectors";
import {signUpTC} from "../auth-reducer";


export interface Values {
    email: string;
    password: string;
    confirmPassword: string

}

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password should be of minimum 3 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        /* .oneOf([yup.ref('password'), null], 'Passwords must match'),
       * тут я не разобрался в логике. Это проверка подтверждения пароля*/
        .oneOf([yup.ref('password')], 'Вы неправильно подтвердили пароль'),

});

export const SignUp = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }
    const onSubmit = (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
        dispatch(signUpTC(values.email, values.password))
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const inputProps = {
        endAdornment:
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            </InputAdornment>
    }

    return (
        <div className={s.container}>
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <TextField id={'email'}
                           label={'Email'}
                           fullWidth
                           variant={'standard'}
                           type={'email'}
                           {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}

                <TextField id={'password'}
                           label={'Password'}
                           fullWidth
                           variant={'standard'}
                           type={showPassword ? 'text' : 'password'}
                           InputProps={inputProps}
                           {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}

                <TextField id={'confirmPassword'}
                           label={'Confirm password'}
                           fullWidth
                           variant={'standard'}
                           type={showPassword ? 'text' : 'password'}
                           InputProps={inputProps}
                           {...formik.getFieldProps('confirmPassword')}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <span>{formik.errors.confirmPassword}</span>}

                <Button color={'primary'}
                        fullWidth
                        variant={'contained'}
                        type={"submit"}
                >Sign up </Button>

            </form>
            <div className={s.questionBlock}>
                Don't have an account yet?
            </div>
            <div className={s.link}>
                <NavLink to={PATH.login}

                >Sign in</NavLink>
            </div>
        </div>
    )
}




