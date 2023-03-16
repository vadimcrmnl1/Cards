import React from "react";
import {FormikHelpers, useFormik} from "formik";
import s from './RecoveryPassword.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/utils/routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {forgotPassTC} from "../auth-reducer";
import {CheckEmail} from "../CheckEmail/CheckEmail";
import {selectMailWasSent} from "../selectors";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import * as yup from "yup";

type FormikValuesType = {
    email: string;
}

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
});

const initialValues: FormikValuesType = {
    email: '',
}
export const RecoveryPassword = () => {

    const dispatch = useAppDispatch()

    const mailWasSent = useAppSelector(selectMailWasSent)

    const onSubmit = (values: FormikValuesType, {setSubmitting}: FormikHelpers<FormikValuesType>) => {
        dispatch(forgotPassTC(values.email))
        setSubmitting(false)
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
                    <TextField
                        fullWidth
                        variant={'standard'}
                        id={'email'}
                        label={'Email'}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />

                    <div className={s.questionBlock}>
                        Enter your email address and we will send you further instructions
                    </div>
                    <Button color={'primary'}
                            fullWidth
                            style={{borderRadius: '20px'}}
                            variant={'contained'}
                            type={"submit"}
                            disabled={formik.isSubmitting}
                    >
                        Send instruction
                    </Button>

                </form>

                <div className={s.questionBlock}>
                    Did you remember your password?
                </div>
                <div className={s.link}>
                    <NavLink to={PATH.login}>Try logging in</NavLink>
                </div>
            </div>
        )
}