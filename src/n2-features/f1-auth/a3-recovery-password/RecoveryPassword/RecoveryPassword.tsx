import React from "react";
import {Title} from "../../../../n1-main/m1-ui/common/u1-title/Title/Title";
import {Field, Form, Formik, FormikHelpers} from "formik";
import s from "../../a2-register/Register/Register.module.css";

interface Values {
    email: string;
}

export const RecoveryPassword = () => {
    return (
        <div>
            <Title title={'recovery password'}/>
            <Formik
                initialValues={{
                    email: ''
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

                    <button style={{marginTop: '10px', width: '300px', height: '30px', fontSize: '18px'}} type="submit">Recovery password</button>
                </Form>
            </Formik>
        </div>
    )
}