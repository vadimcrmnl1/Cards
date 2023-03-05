import React from "react";
import s from './Login.module.css'
import {Field, Form, Formik, FormikHelpers} from 'formik';
import {Title} from "../../../common/components/Title/Title";


interface Values {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {
    return (
        <div>
            <Title title={'login'}/>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className={s.form}>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="email" name="email" placeholder="Email"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="password" type='password' name="password" placeholder="Password"/>
                    <div className={s.rememberBlock}>
                        <label style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} htmlFor={'rememberMe'}>Remember me</label>
                        <Field style={{marginTop: '10px', width: '20px', height: '20px'}} id="rememberMe" name="rememberMe" type='checkbox'/>
                    </div>



                    <button style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} type="submit">Sign in</button>
                </Form>
            </Formik>
        </div>
    )
}