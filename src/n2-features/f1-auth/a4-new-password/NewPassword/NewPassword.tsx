import React from "react";
import {Title} from "../../../../n1-main/m1-ui/common/u1-title/Title/Title";
import {Field, Form, Formik, FormikHelpers} from "formik";
import s from "../../a2-register/Register/Register.module.css";

interface Values {
    password: string;
    confirmPassword: string
}

export const NewPassword = () => {
    return (
        <div>
            <Title title={'new password'}/>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        if (values.password !== values.confirmPassword) {
                            alert('Password and Confirm password !==')
                        } else {
                            alert(JSON.stringify(values));
                            setSubmitting(false);
                        }

                    }, 500);
                }}
            >
                <Form className={s.form}>

                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="password"
                           name="password" type='password' placeholder="Password"/>
                    <Field style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} id="confirmPassword"
                           name="confirmPassword" type='password' placeholder="Confirm Password"/>

                    <button style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}}
                            type="submit">Change password
                    </button>
                </Form>
            </Formik>
        </div>
    )
}