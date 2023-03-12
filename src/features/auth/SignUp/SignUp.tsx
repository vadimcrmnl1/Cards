import React from "react";
import s from './SignUp.module.css'
import {FormikHelpers, useFormik} from 'formik';
import {NavLink, Navigate} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectIsSignedUp} from "../selectors";
import {signUpTC} from "../auth-reducer";
import SuperInputText from "../../../common/components/SuperInputText/SuperInputText";
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

