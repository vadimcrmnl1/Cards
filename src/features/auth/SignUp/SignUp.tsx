import React from "react";
import s from './SignUp.module.css'
import {FormikHelpers, useFormik} from 'formik';
import {NavLink, Navigate} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectIsSignedUp} from "../selectors";
import {signUpTC} from "../auth-reducer";
import SuperInput from "../../../common/components/SuperInput/SuperInput";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {initialValues, validationSchema, FormikValuesType} from "../common";


export const SignUp = () => {

    const dispatch = useAppDispatch()
    const isSignedUp = useAppSelector(selectIsSignedUp)

    const onSubmit = (values: Omit<FormikValuesType, 'confirmPassword'>, {setSubmitting}: FormikHelpers<FormikValuesType>) => {
        dispatch(signUpTC(values.email, values.password))
        // formik.resetForm()
        setSubmitting(false);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })
    const error = (value: 'email' | 'password' | 'confirmPassword') => {
        return Boolean(formik.errors[value]) && formik.touched[value]
            ? formik.errors[value]
            : ''
    }

    if (isSignedUp) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit} className={s.form}>

                <SuperInput
                    id={'email'}
                    placeholder={'Email'}
                    error={error('email')}
                    {...formik.getFieldProps('email')}
                />

                <SuperInput
                    id={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                    error={error('password')}
                    withEye
                />

                <SuperInput
                    id={'confirmPassword'}
                    placeholder={'Confirm password'}
                    {...formik.getFieldProps('confirmPassword')}
                    error={error('confirmPassword')}
                    withEye
                />

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


