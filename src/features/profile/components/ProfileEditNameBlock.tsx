import React from "react";
import s from "../Profile.module.css";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {changeNameTC} from "../profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useStyles} from "./ProfileStileMU";

type ProfileEditNameBlockType = {
    setEditMode: (editMode: boolean) => void
}
export type FormikErrorType = {
    nickName?: string
}
export const ProfileEditNameBlock = (props: ProfileEditNameBlockType) => {
    const dispatch = useAppDispatch()
    const styleMU = useStyles();
    const error = useAppSelector(state => state.app.error)
    const name = useAppSelector(state => state.profile.name)
    const formik = useFormik({
        initialValues: {
            nickName: name
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.nickName) {
                errors.nickName = 'Required'
            }
            if (values.nickName === name) {
                errors.nickName = 'Your name is not changed'
            }
        },

        onSubmit: values => {
            if (values.nickName !== name) {
                dispatch(changeNameTC(values.nickName))
                props.setEditMode(false)
            }
        },

    })
  /*  const handleOnBlurName = () => {
        props.setEditMode(false)
    }*/
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.changeName}>
                <div className={s.nickNameField}>
                    <TextField label="nickName"
                               autoFocus={true}
                               id="standard-basic"
                               variant="standard"
                               margin="dense"
                               className={styleMU.textField}
                               {...formik.getFieldProps('nickName')}/>

                    <Button type={'submit'} variant={'contained'} className={styleMU.buttonSave}>
                        Save
                    </Button>
                </div>
                <div className={s.profileError}>
                    {formik.touched.nickName && formik.errors.nickName &&
                        <div>
                            {formik.errors.nickName}
                        </div>}
                    {error && <div>{error}</div>}
                </div>
            </div>
        </form>
    )
}