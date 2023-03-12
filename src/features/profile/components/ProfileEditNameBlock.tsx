import React from "react";
import s from "../Profile.module.css";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {changeNameTC} from "../profile-reducer";
import {FormikErrorType} from "../Profile";
import {useAppDispatch, useAppSelector} from "../../../app/store";

type ProfileEditNameBlockType = {
    setEditMode: (editMode: boolean) => void
}

export const ProfileEditNameBlock = (props: ProfileEditNameBlockType) => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const userData = useAppSelector(state => state.profile)
    const formik = useFormik({
        initialValues: {
            nickName: userData.name
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.nickName) {
                errors.nickName = 'Required'
            }
            if (values.nickName === userData.name) {
                errors.nickName = 'Your name is not changed'
            }
        },

        onSubmit: values => {
            if (values.nickName !== userData.name) {
                dispatch(changeNameTC(values.nickName))
                props.setEditMode(false)
            }
        },

    })
    const handleOnBlurName = () => {
        props.setEditMode(false)
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.changeName} onBlur={handleOnBlurName}>
                <div className={s.nickNameField}>
                    <TextField label="nickName"
                               autoFocus={true}
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
        </form>
    )
}