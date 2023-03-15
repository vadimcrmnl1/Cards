import React from "react";
import s from "../Profile.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {changeNameTC} from "../profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useStyles} from "../../styleMU/styleMU";
import {selectName} from "../selectors";
import {selectError} from "../../../app/selectors";

type ProfileEditNameBlockType = {
    setEditMode: (editMode: boolean) => void
}
export type FormikErrorType = {
    nickName?: string
}
export const ProfileEditNameBlock = (props: ProfileEditNameBlockType) => {
    const dispatch = useAppDispatch()
    const styleMU = useStyles();
    const error = useAppSelector(selectError)
    const name = useAppSelector(selectName)
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
      const handleOnBlurName = () => {
        setTimeout(()=>{
            props.setEditMode(false)
        }, 140)
      }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.changeName}>
                <div className={s.nickNameField} >
                    <TextField label="nickName"
                               autoFocus={true}
                               variant="standard"
                               className={styleMU.textField}
                               {...formik.getFieldProps('nickName')}
                               onBlur={handleOnBlurName}
                               />
                    <Button type={'submit'}
                            variant={'contained'}
                            className={styleMU.buttonSave}
                            >
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