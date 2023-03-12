import React from "react";
import s from './SignUp.module.css'
import {FormikHelpers, useFormik} from 'formik';
import * as yup from "yup";
import {NavLink, Navigate} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectIsSignedUp} from "../selectors";
import {signUpTC} from "../auth-reducer";
import SuperInputText from "../../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../../common/components/SuperButton/SuperButton";


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
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        /* тут я не разобрался в логике. Это проверка подтверждения пароля*/
        .oneOf([yup.ref('password',/*null*/)], 'Passwords must match'),

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
        // formik.resetForm()
        setSubmitting(false);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    if (isSignedUp) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit} className={s.form}>

                <SuperInputText
                    id={'email'}
                    placeholder={'foo@bar.com'}
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}

                <SuperInputText
                    id={'password'}
                    placeholder={'12345'}
                    {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}

                <SuperInputText
                    id={'confirmPassword'}
                    placeholder={'12345'}
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <span>{formik.errors.confirmPassword}</span>}

                <SuperButton type={"submit"}>
                    Sign up
                </SuperButton>

            </form>
            <div className={s.questionBlock}>
                Don't have an account yet?
            </div>
            <div className={s.link}>
                <NavLink to={PATH.login}>Sign in</NavLink>
            </div>
        </div>
    )
}

