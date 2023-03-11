import React from 'react'
import s from "../Profile.module.css";
import editIcon from "../../../common/components/SuperEditableSpan/editIcon.svg";
import {useAppSelector} from "../../../app/store";

type ProfileNameBlockType = {
    setEditMode: (editMode: boolean) => void
}

export const ProfileNameBlock = (props: ProfileNameBlockType) => {
    const userData = useAppSelector(state => state.profile)
    const handleEditName = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        props.setEditMode(true)
    }
    return (
        <div className={s.spanBlock}>
            <div>{userData.name}</div>
            <img
                onClick={handleEditName}
                src={editIcon}
                className={s.pen}
                alt={'edit'}
            />
        </div>
    )
}