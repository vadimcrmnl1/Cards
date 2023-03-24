import * as React from 'react'

import { NavLink } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import {
  isActiveModalAC,
  modalEditPackIsOpenAC,
} from '../../../../common/components/modals/Modal/actions'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { PATH } from '../../../../common/utils/routes/Routes'
import { selectUserId } from '../../../profile/selectors'
import { setCardsPackIdAC, setCardsPackNameAC, setCardsPageAC } from '../../Cards/actions'
import { deleteCardTC, getCardsTC, updateCardTC } from '../../Cards/cards-reducer'
import { deletePackTC, updatePackTC } from '../../Packs/packs-reducer'
import { UpdateCardRequestDataType, UpdatePackRequestDataType } from '../../table-api'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  packs?: boolean
  type: 'packs' | 'cards'
  itemId: string
  packName?: string
  packId?: string
  cardsPackId?: string
  cardsCount?: number
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  itemId,
  packName,
  type,
  packId,
  cardsPackId,
}) => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const handleOpenEditPack = () => {
    dispatch(isActiveModalAC(true))
    dispatch(modalEditPackIsOpenAC(true))
  }
  const handleLinkToCards = () => {
    if (type === 'cards') {
      dispatch(setCardsPackNameAC(packName as string))
      dispatch(setCardsPackIdAC(cardsPackId as string))
    } else if (type === 'packs') {
      dispatch(setCardsPackIdAC(itemId))
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
          <AddEditPackModal
            packName={packName}
            // packId={packId}
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
