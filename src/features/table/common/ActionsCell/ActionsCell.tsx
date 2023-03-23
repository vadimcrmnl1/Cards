import * as React from 'react'

import { NavLink } from 'react-router-dom'

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
  type: 'packs' | 'cards'
  itemId: string
  packName?: string
  packId?: string
  cardsPackId?: string
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
    dispatch(setCardsPackIdAC(cardsPackId as string))
    dispatch(setCardsPackNameAC(packName as string))
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
            packId={packId}
            titleButton={'Edit'}
            title={'Edit pack'}
            type={'edit'}
          />
          <DeletePackAndCard packId={packId} packName={packName} type={'deletePack'} />
        </div>
      )}
    </div>
  )
}
