import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {selectUserId} from "../../../../profile/selectors";
import {TeacherIcon} from "../../../icons/TeacherIcon";
import {EditIcon} from "../../../icons/EditIcon";
import {TrashIcon} from "../../../icons/TrashIcon";
import s from './ActionsCell.module.css'
import {useState} from "react";

type ActionsCellPropsType = {
    packOwnerId: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({packOwnerId}) => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(selectUserId)

    const [editModalOpen,setEditModalOpen] = useState(false)
    const [deleteModalOpen,setDeleteModalOpen] = useState(false)

    return (
        <div className={s.cell}>
            <button>
                <TeacherIcon/>
            </button>
            {packOwnerId === userId &&
                <div>
                    <button>
                        <EditIcon/>
                    </button>
                    <button>
                        <TrashIcon/>
                    </button>
                </div>}
        </div>
    )
}