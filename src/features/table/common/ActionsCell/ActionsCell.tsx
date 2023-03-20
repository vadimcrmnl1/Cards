import * as React from 'react'
import { useState } from 'react'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { AddEditCardModal } from '../../../../common/components/modals/Modal/components/AddEditCard/AddEditCard'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { selectUserId } from '../../../profile/selectors'
import { deleteCardTC } from '../../Cards/cards-reducer'
import { deletePackTC } from '../../Packs/packs-reducer'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  packs?: boolean
  itemId: string
  type: 'packs' | 'cards'
  cardsPackId?: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  itemId,
  type,
  cardsPackId,
}) => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

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

  return (
    <div className={s.cell}>
      {packs && (
        <button>
          <TeacherIcon />
        </button>
      )}
      {type === 'packs' && packOwnerId === userId && (
        <div>
          <AddEditPackModal
            packId={itemId}
            titleButton={'Edit'}
            title={'Edit pack'}
            type={'edit'}
          />
          <DeletePackAndCard handleDelete={handleDeleteCard} type={'pack'} />
        </div>
      )}
      {type === 'cards' && packOwnerId === userId && (
        <div>
          <AddEditCardModal
            cardsPackId={cardsPackId}
            itemId={itemId}
            type={'editCard'}
            titleButton={'EditCard'}
            title={'Edit card'}
          />
          <DeletePackAndCard type={'card'} handleDelete={handleDeleteCard} />
        </div>
      )}
    </div>
  )
}
