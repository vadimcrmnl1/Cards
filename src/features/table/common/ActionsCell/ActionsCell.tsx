import * as React from 'react'

import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { PATH } from '../../../../common/utils/routes/Routes'
import { selectUserId } from '../../../profile/selectors'
import { setCardsPackIdAC, setCardsPackNameAC, setCardsPageAC } from '../../Cards/actions'
import { getCardsTC } from '../../Cards/cards-reducer'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  itemId: string
  type?: 'packs' | 'cards'
  cardQuestion?: string
  packName?: string
  packId?: string
  cardsPackId?: string
  cardsCount?: number
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  itemId,
  packName,
  type,
  packId,
  cardsPackId,
}) => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectUserId)

  const handleLinkToCards = () => {
    dispatch(setCardsPackNameAC(packName as string))
    if (type === 'cards') {
      dispatch(setCardsPackIdAC(cardsPackId as string))
    } else if (type === 'packs') {
      dispatch(setCardsPackIdAC(itemId))
      dispatch(setCardsPageAC(1))
      dispatch(getCardsTC())
    }
  }

  return (
    <div className={s.cell}>
      <NavLink to={PATH.learn} onClick={handleLinkToCards}>
        <TeacherIcon />
      </NavLink>
      {type === 'packs' && packOwnerId === userId && (
        <div>
          <AddEditPackModal
            packName={packName}
            packId={itemId}
            titleButton={'Edit'}
            title={'Edit pack'}
            type={'edit'}
          />
          <DeletePackAndCard packId={itemId} packName={packName} type={'deletePack'} />
        </div>
      )}
    </div>
  )
}
