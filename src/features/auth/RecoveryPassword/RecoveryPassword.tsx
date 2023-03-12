import React from "react";
import {useFormik} from "formik";
import s from './RecoveryPassword.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {forgotPassTC} from "../auth-reducer";
import {CheckEmail} from "../CheckEmail/CheckEmail";
import {selectMailWasSent} from "../selectors";
import SuperInputText from "../../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {initialValues, validationSchema, FormikValuesType} from "../common";


export const RecoveryPassword = () => {

    const dispatch = useAppDispatch()

    const mailWasSent = useAppSelector(selectMailWasSent)

    const onSubmit = (values: Omit<FormikValuesType, 'password'>) => {
        dispatch(forgotPassTC(values.email))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return mailWasSent
        ? <CheckEmail/>
        : (<div className={s.container}>
                <h1>Forgot your password?</h1>
                <form onSubmit={formik.handleSubmit} className={s.form}>

                    <SuperInputText
                        id={'email'}
                        placeholder={'foo@bar.com'}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}

                    <div className={s.questionBlock}>
                        Enter your email address and we will send you further instructions
                    </div>

                    <SuperButton type={"submit"}>Send instruction</SuperButton>

                </form>

                <div className={s.questionBlock}>
                    Did you remember your password?
                </div>
                <div className={s.link}>
                    <NavLink to={PATH.login}
                    >Try logging in</NavLink>
                </div>
            </div>
        )
}