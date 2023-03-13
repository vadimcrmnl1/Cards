import React from 'react'
import s from "../Profile.module.css";
import editIcon from "../../../common/components/SuperEditableSpan/editIcon.svg";
import {useAppSelector} from "../../../app/store";
import {selectorName} from "../selectors";

type ProfileNameBlockType = {
    setEditMode: (editMode: boolean) => void
}

export const ProfileNameBlock = (props: ProfileNameBlockType) => {
    const name = useAppSelector(selectorName)
    const handleEditName = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        props.setEditMode(true)
    }
    return (
        <div className={s.spanBlock}>
            <div>{name}</div>
            <img onClick={handleEditName}
                src={editIcon}
                className={s.pen}
                alt={'edit'}
            />
        </div>
    )
}