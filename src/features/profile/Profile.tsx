import React from "react";
import {NavLink} from "react-router-dom";
import arrow from "../images/Group 240.svg"
import logOut from "../images/logout.jpg"
import s from "./Profile.module.css"
import {useFormik} from "formik";
import SuperEditableSpan from "../../common/components/SuperEditableSpan/SuperEditableSpan";
import {useDispatch} from "react-redux";
import {LogoutTC} from "./profileReducer";
import {useAppDispatch} from "../../app/store";

export type FormikErrorType = {
    nickName?: string
}

export const Profile = () => {
    const dispatch = useAppDispatch()
    const formik=useFormik({
        initialValues:{
            nickName:''
             },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.nickName) {
                errors.nickName = 'Required'
            } /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }*/
        },

        onSubmit:values=>{
          //  dispatch(nickNameTC(values))
            formik.resetForm()
        },

    })
    const logoutHandler=()=>{
        dispatch(LogoutTC())
    }
    return (
        <div className={s.profile}>
            <div className={s.container}>
                <NavLink to={'/login'}>
                    <img src={arrow} alt={'arrow'}/>
                    Back to Packs List
                </NavLink>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Personal Information</h3>
                    <div>
                        <img src={'*'} alt={'avatar'}/>
                    </div>
                    <SuperEditableSpan>
                        {}
                    </SuperEditableSpan>
                    <span>j&johnson@gmail.com</span>
                    <button type={"submit"}
                            onClick={logoutHandler}  >
                        <img src={logOut} alt={'logout'}/>
                        Log out
                    </button>
                </form>
            </div>
        </div>
    )
}