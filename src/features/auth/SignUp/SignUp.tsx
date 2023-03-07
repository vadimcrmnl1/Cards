import React from "react";
import s from './SignUp.module.css'
import {useFormik} from 'formik';
import {Title} from "../../../common/components/Title/Title";
import * as yup from "yup";
import {TextField} from "@mui/material";
import {Button} from "@material-ui/core";


interface Values {
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
    console.log('process.env: ', process.env)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        },
        validationSchema,
    })

    return (
        <div>
            <Title title={'register'}/>
            <form onSubmit={formik.handleSubmit} className={s.form}>
              {/*  не использовал formik.getFieldProps для наглядности*/}
                <TextField onChange={formik.handleChange}
                           value={formik.values.email}
                           id={'email'}
                           name={'email'}
                           label={'email'}
                           fullWidth
                           variant={'standard'}
                           type={'email'}
                           onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}

                <TextField id={'password'}
                           label={'password'}
                           fullWidth
                           variant={'standard'}
                           type={'password'}
                           {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}

                <TextField id={'confirmPassword'}
                           label={'Confirm password'}
                           fullWidth
                           variant={'standard'}
                           type={'password'}
                           {...formik.getFieldProps('confirmPassword')}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <span>{formik.errors.confirmPassword}</span>}

                <Button color={'primary'}
                        fullWidth
                        style={{marginTop: '20px', borderRadius: '20px'}}
                        variant={'contained'}
                        type={"submit"}
                >Sign up </Button>

            </form>
        </div>
    )
}