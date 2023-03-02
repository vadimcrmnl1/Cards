import React from "react";
import s from './Register.module.css'
import {Field, Form, Formik, FormikHelpers} from 'formik';
import {Title} from "../../../../n1-main/m1-ui/common/u1-title/Title/Title";


interface Values {
    name: string
    login: string
    email: string;
    password: string;
    confirmPassword: string

}

export const Register = () => {
    return (
        <div>
            <Title title={'register'}/>
            <Formik
                initialValues={{
                    name: '',
                    login: '',
                    email: '',
                    password: '',
                    confirmPassword: ''

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
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="name" name="name" placeholder="Name"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="login" name="login" placeholder="Login"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="email" name="email" placeholder="Email"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="password" type='password' name="password" placeholder="Password"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="confirmPassword" type='password' name="confirmPassword" placeholder="Confirm Password"/>

                    <button style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} type="submit">Sign up</button>
                </Form>
            </Formik>
        </div>
    )
}