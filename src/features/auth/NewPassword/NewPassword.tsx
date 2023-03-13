import React from "react";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import s from './NewPassword.module.css'
import {PATH} from "../../../common/utils/routes/Routes";
import {Navigate, NavLink, useLocation} from 'react-router-dom'
import {resetPasswordTC} from "../auth-reducer";
import {selectIsPasswordChanged} from "../selectors";
import SuperInput from "../../../common/components/SuperInput/SuperInput";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {initialValues, validationSchema, FormikValuesType} from "../common";


export const NewPassword = () => {

    const dispatch = useAppDispatch()
    const location = useLocation()
    const token = location.pathname.slice(18)
    const isPasswordChanged = useAppSelector(selectIsPasswordChanged)

    const onSubmit = (values:FormikValuesType) => {
        dispatch(resetPasswordTC(values.password, token))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    if (isPasswordChanged) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={s.container}>
            <h1>Create new password</h1>
            <form onSubmit={formik.handleSubmit} className={s.form}>

                <SuperInput
                    id={'password'}
                    placeholder={'Password'}
                    error={formik.errors.password && formik.touched.password
                        ? formik.errors.password : ''}
                    {...formik.getFieldProps('password')}
                />


                <SuperButton type={"submit"}>Create new password</SuperButton>

            </form>
            <div className={s.questionBlock}>
                Create new password and we will send you further instructions to email
            </div>
            <div className={s.link}>
                <NavLink to={PATH.login}>Sign in</NavLink>
            </div>
        </div>
    )
}