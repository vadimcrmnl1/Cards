import * as React from 'react'
import { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
/*
import { AddEditCardModal } from '../../../../common/components/modals/Modal/components/AddEditCard/AddEditCardModal'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
*/
import { PATH } from '../../../../common/utils/routes/Routes'
import { selectUserId } from '../../../profile/selectors'
import {
  setCardsPackIdAC,
  setCardsPackNameAC,
  setCardsPackUserIdAC,
  setCardsPageAC,
} from '../../Cards/actions'
import { deleteCardTC, getCardsTC, updateCardTC } from '../../Cards/cards-reducer'
import { deletePackTC, updatePackTC } from '../../Packs/packs-reducer'
import { UpdateCardRequestDataType, UpdatePackRequestDataType } from '../../table-api'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  packs?: boolean
  itemId: string
  type?: 'packs' | 'cards'
  cardQuestion?: string
  packName?: string
  cardAnswer?: string
  cardsPackId?: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  itemId,
  packName,
  cardQuestion,
  cardAnswer,
  type,
  cardsPackId,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

  const handleLinkToCards = () => {
    if (type === 'cards') {
      dispatch(setCardsPackNameAC(packName as string))
      dispatch(setCardsPackIdAC(cardsPackId as string))
    } else if (type === 'packs') {
      dispatch(setCardsPackIdAC(itemId))
      dispatch(setCardsPackUserIdAC(packOwnerId))
      dispatch(setCardsPackNameAC(packName as string))
      dispatch(setCardsPageAC(1))
      dispatch(getCardsTC())
    }

    /*dispatch(setCardsPackNameAC(packName as string))*/
  }

  return (
    <div className={s.cell}>
      <NavLink to={PATH.learn} onClick={handleLinkToCards}>
        <TeacherIcon />
      </NavLink>

      {type === 'packs' && packOwnerId === userId && (
        <div>
          {/* <AddEditPackModal
            packName={packName}
            packId={itemId}
            titleButton={'Edit'}
            title={'Edit pack'}
            type={'edit'}
          />
          <DeletePackAndCard itemId={itemId} packName={packName} type={'deletePack'} />
     */}{' '}
        </div>
      )}
      {type === 'cards' && packOwnerId === userId && (
        <div>
          {/* <AddEditCardModal
            cardAnswer={cardAnswer}
            cardQuestion={cardQuestion}
            cardsPackId={cardsPackId}
            itemId={itemId}
            type={'editCard'}
            titleButton={'EditCard'}
            title={'Edit card'}
          />
          <DeletePackAndCard cardQuestion={cardQuestion} type={'deleteCard'} itemId={itemId} />
       */}{' '}
        </div>
      )}
    </div>
  )
}
