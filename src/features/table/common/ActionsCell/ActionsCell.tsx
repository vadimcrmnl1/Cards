import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {selectUserId} from "../../../profile/selectors";
import {TeacherIcon} from "../icons/TeacherIcon";
import {EditIcon} from "../icons/EditIcon";
import {TrashIcon} from "../icons/TrashIcon";
import s from './ActionsCell.module.css'
import {useState} from "react";

type ActionsCellPropsType = {
    packOwnerId: string
    packs?: boolean
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({packOwnerId,packs}) => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(selectUserId)

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const handleEdit = () => {
        setEditModalOpen(editModalOpen => !editModalOpen)
    }
    const handleDelete = () => {
        setDeleteModalOpen(deleteModalOpen => !deleteModalOpen)
    }

    return (
        <div className={s.cell}>
            {packs&&<button>
                <TeacherIcon/>
            </button>}
            {packOwnerId === userId &&
                <div>
                    <button onClick={handleEdit}>
                        <EditIcon/>
                    </button>
                    <button onClick={handleDelete}>
                        <TrashIcon/>
                    </button>
                </div>}
        </div>
    )
}