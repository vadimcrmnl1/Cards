import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import arrow from "../images/Group 240.svg"
import s from "./Profile.module.css"
import {useFormik} from "formik";
import {ChangeNameTC, LogoutTC} from "./profileReducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import editIcon from "../../common/components/SuperEditableSpan/editIcon.svg";
import {Button, TextField} from "@mui/material";

export type FormikErrorType = {
    nickName?: string
}

export const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            nickName: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.nickName) {
                errors.nickName = 'Required'
            }
        },

        onSubmit: values => {
            dispatch(ChangeNameTC(values.nickName))
            formik.resetForm()
        },

    })
    const logoutHandler = () => {
        dispatch(LogoutTC())
    }
    const onClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
    }


    return (
        <div className={s.profile}>
            <div className={s.container}>
                <div className={s.link}>
                    <NavLink to={'/login'} className={s.navLink}>
                        <img src={arrow} alt={'arrow'}/>
                        <span>Back to Packs List</span>
                    </NavLink>
                </div>
                <div className={s.informBlock}>
                    <h3>Personal Information</h3>
                    <div className={s.avatar}>
                        {/* <img src={'*'} alt={'avatar'}/>*/}
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        {editMode ? (
                            <div className={s.changeName}>
                                <div className={s.nickNameField}>
                                    <TextField label="nickName"
                                               id="standard-basic"
                                               variant="standard"
                                               margin="dense"
                                               style={{
                                                   width: '200px',
                                                   height: '30px',
                                                   marginRight: '10px',
                                                   fontSize: '18px',
                                                   marginBottom: '17px',
                                                   color: '#282c34'
                                               }}
                                               {...formik.getFieldProps('nickName')}/>
                                    <Button type={'submit'} variant={'contained'}
                                            style={{
                                                width: 'max-content',
                                                height: '30px',
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                fontFamily: '"Montserrat Thin", sans-serif',
                                                borderRadius: '5px',
                                                background: '#00bbc0',
                                                color: 'white'
                                            }}>
                                        Save
                                    </Button>
                                </div>
                                <div className={s.profileError}>
                                    {formik.touched.nickName && formik.errors.nickName &&
                                        <div>{formik.errors.nickName}</div>}
                                    {error && <div>{error}</div>}
                                </div>
                            </div>
                        ) : (
                            <div className={s.spanBlock}>
                                <img
                                    onClick={onClickCallBack}
                                    src={editIcon}
                                    className={s.pen}
                                    alt={'edit'}
                                />
                            </div>
                        )}
                    </form>
                    <span>j&johnson@gmail.com</span>
                    <button onClick={logoutHandler}
                            className={s.buttonLogout}>
                        {/*<div className={s.logoutImg}><img src={logOut} alt={'logout'}/></div>*/}
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}