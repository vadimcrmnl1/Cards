import * as React from 'react'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { selectUserId } from '../../../profile/selectors'
import { deleteCardTC, updateCardTC } from '../../Cards/cards-reducer'
import { deletePackTC, updatePackTC } from '../../Packs/packs-reducer'
import { UpdateCardRequestDataType, UpdatePackRequestDataType } from '../../table-api'
import { EditIcon } from '../icons/EditIcon'
import { TeacherIcon } from '../icons/TeacherIcon'
import { TrashIcon } from '../icons/TrashIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  packs?: boolean
  itemId: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({ packOwnerId, packs, itemId }) => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

  // Это заготовка для 3 недели =======***=======
  // const [editModalOpen, setEditModalOpen] = useState(false)
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  //
  // const handleEdit = () => {
  //     setEditModalOpen(editModalOpen => !editModalOpen)
  // }
  // const handleDelete = () => {
  //     setDeleteModalOpen(deleteModalOpen => !deleteModalOpen)
  // }
  // Это заготовка для 3 недели =======***=======

  const handleDeleteCard = () => {
    const action = packs ? deletePackTC(itemId) : deleteCardTC(itemId)

    dispatch(action)
  }
  const handleUpdateCard = () => {
    const time = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date())

    const cardPack: UpdatePackRequestDataType = {
      cardsPack: {
        _id: itemId,
        name: 'Name updated ' + time,
      },
    }
    const data: UpdateCardRequestDataType = {
      card: {
        _id: itemId,
        question: 'How do i become a developer? ' + time,
      },
    }
    const action = packs ? updatePackTC(cardPack) : updateCardTC(data)

    dispatch(action)
  }

  return (
    <div className={s.cell}>
      {packs && (
        <button>
          <TeacherIcon />
        </button>
      )}
      {packOwnerId === userId && (
        <div>
          <button onClick={handleUpdateCard} disabled={isAppMakeRequest}>
            <EditIcon />
          </button>
          <button onClick={handleDeleteCard} disabled={isAppMakeRequest}>
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  )
}
