import * as React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { PATH } from '../../../../common/utils/routes/Routes'
import { selectUserId } from '../../../profile/selectors'
import { setCardsPackIdAC, setCardsPackNameAC } from '../../Cards/actions'
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
  cardsCount?: number
  packName?: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  itemId,
  packName,
  cardsCount,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

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
  const handleLinkToCards = () => {
    dispatch(setCardsPackIdAC(itemId))
    dispatch(setCardsPackNameAC(packName as string))
    navigate(PATH.packs + `learn/${itemId}`)
  }
  const btnLearnClassName = cardsCount === 0 ? s.buttonLearn : ''

  return (
    <div className={s.cell}>
      {packs && (
        <button
          className={btnLearnClassName}
          onClick={handleLinkToCards}
          disabled={isAppMakeRequest || cardsCount === 0}
        >
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
