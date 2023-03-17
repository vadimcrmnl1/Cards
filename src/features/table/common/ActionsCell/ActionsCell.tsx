import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {selectUserId} from "../../../profile/selectors";
import {TeacherIcon} from "../icons/TeacherIcon";
import {EditIcon} from "../icons/EditIcon";
import {TrashIcon} from "../icons/TrashIcon";
import s from './ActionsCell.module.css'
import {useState} from "react";
import {deleteCardTC, updateCardTC} from "../../Cards/cards-reducer";
import {deletePackTC, updatePackTC} from "../../Packs/packs-reducer";
import {UpdateCardRequestDataType, UpdatePackRequestDataType} from "../../table-api";

type ActionsCellPropsType = {
    packOwnerId: string
    packs?: boolean
    itemId: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({packOwnerId, packs, itemId}) => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(selectUserId)

    // Это заготовка для 3 недели =======***=======
    const [editModalOpen, setEditModalOpen] = useState(false)
    // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    //
    const handleEdit = () => {
        setEditModalOpen(editModalOpen => !editModalOpen)
    }
    // const handleDelete = () => {
    //     setDeleteModalOpen(deleteModalOpen => !deleteModalOpen)
    // }
    // Это заготовка для 3 недели =======***=======


    const handleDeleteCard = () => {
        const action = packs ? deletePackTC(itemId) : deleteCardTC(itemId)
        dispatch(action)
    }
    const handleUpdateCard = () => {
        const identifier = Math.random().toFixed(2)
        const cardPack: UpdatePackRequestDataType = {
            cardsPack: {
                _id:itemId,
                name: 'Name updated '+identifier
            }
        }
        const data: UpdateCardRequestDataType = {
            card: {
                _id: itemId,
                question: 'How do i become a developer? ' +identifier
            }
        }
        const action = packs ? updatePackTC(cardPack) : updateCardTC(data)
        dispatch(action)
    }

    return (
        <div className={s.cell}>
            {packs && <button>
                <TeacherIcon/>
            </button>}
            {packOwnerId === userId &&
                <div>
                    <button onClick={handleUpdateCard}>
                        <EditIcon/>
                    </button>
                    <button onClick={handleDeleteCard}>
                        <TrashIcon/>
                    </button>
                </div>}
        </div>
    )
}