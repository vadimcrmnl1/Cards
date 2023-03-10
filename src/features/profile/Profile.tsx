import React, {ChangeEvent, useEffect, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import arrow from "../images/Group 240.svg"
import s from "./profile.module.css"
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import editIcon from "../../common/components/SuperEditableSpan/editIcon.svg";
import {Button, TextField} from "@mui/material";
import {changeNameTC, getDataTC, logoutTC} from "../auth/auth-reducer";
import {PATH} from "../../common/utils/routes/Routes";

export type FormikErrorType = {
    nickName?: string
}

export const Profile = () => {

    const [editMode, setEditMode] = useState(false)
    const [nickName, setNickName] = useState('')
    const error = useAppSelector(state => state.app.error)
    const name = useAppSelector(state => state.auth.data.name)
    const email = useAppSelector(state => state.auth.data.email)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()
    //
    useEffect(() => {

        if (isLoggedIn) {
            dispatch(getDataTC())
            setNickName(name)
        }

    }, [])
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
            dispatch(changeNameTC(values.nickName))
            //formik.resetForm()
            setEditMode(false)
        },

    })
    const handlerLogout = () => {
        dispatch(logoutTC())

    }
    const handlerOnClick= (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
    }
    const handlerChangeName = (event:any)=>{
          setNickName(event.target.value)
    }
    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
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
                    {editMode ? (
                        <form onSubmit={formik.handleSubmit}>
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

                                      {...formik.getFieldProps('nickName')}

                                    />


                                    <button type={'submit'} className={s.buttonSave}>
                                        Save
                                    </button>
                                </div>
                                <div className={s.profileError}>
                                    {formik.touched.nickName && formik.errors.nickName &&
                                        <div>{formik.errors.nickName}</div>}
                                    {error && <div>{error}</div>}
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className={s.spanBlock}>
                            <div>{name}</div>
                            <img
                                onClick={handlerOnClick}
                                src={editIcon}
                                className={s.pen}
                                alt={'edit'}
                            />
                        </div>
                    )}
                    <span>{email}</span>
                    <button onClick={handlerLogout}>
                        {/*<div className={s.logoutImg}><img src={logOut} alt={'logout'}/></div>*/}
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}