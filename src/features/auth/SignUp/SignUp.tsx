import React from "react";
import s from './SignUp.module.css'
import {FormikHelpers, useFormik} from 'formik';
import * as yup from "yup";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Button} from "@material-ui/core";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from '@mui/icons-material/Visibility';
import {NavLink, Navigate} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectIsSignedUp} from "../selectors";
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
    const isSignedUp = useAppSelector(selectIsSignedUp)

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }
    const onSubmit = (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
        dispatch(signUpTC(values.email, values.password))
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
    if (isSignedUp) {
        return <Navigate to={PATH.login}/>
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
                           placeholder={'foo@bar.com'}
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
                <p>test1@test1.com</p>
                <p>test1test1</p>
            </div>
            <div className={s.link}>
                <NavLink to={PATH.login}>Sign in</NavLink>
            </div>
        </div>
    )
}

//
// let notValidEmail = {
//     emailRegExp: {},
//     error: "not valid email/password /ᐠ-ꞈ-ᐟ\\",
//     in: "createUser",
//     isEmailValid: false,
//     isPassValid: true,
//     passwordRegExp: "Password must be more than 7 characters..."
// }
// let notValidPasword = {
//     emailRegExp: {},
//     error: "not valid email/password /ᐠ-ꞈ-ᐟ\\",
//     in: "createUser",
//     isEmailValid: true,
//     isPassValid: false,
//     passwordRegExp: "Password must be more than 7 characters..."
// }
// let a = {
//     email: "94timoha@gmail.com",
//     error: "email already exists /ᐠ｡ꞈ｡ᐟ\\",
//     in: "createUser"
// }
//
// //res.data =>
// let addedUser = {
//     created: "2023-03-08T19:24:10.062Z",
//     email: "98timoha@gmail.com",
//     isAdmin: false,
//     name: "98timoha@gmail.com",
//     publicCardPacksCount: 0,
//     rememberMe: false,
//     updated: "2023-03-08T19:24:10.062Z",
//     verified: false,
//     __v: 0,
//     _id: "6408e0da827dd518fc9b224d"
// }

