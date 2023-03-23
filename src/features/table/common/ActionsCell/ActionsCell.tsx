import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import {
  isActiveModalAC,
  modalEditPackIsOpenAC,
} from '../../../../common/components/modals/Modal/actions'
import { AddEditCardModal } from '../../../../common/components/modals/Modal/components/AddEditCard/AddEditCardModal'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { selectUserId } from '../../../profile/selectors'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  packs?: boolean
  type: 'packs' | 'cards'
  packName?: string
  packId?: string
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  packs,
  packName,
  type,
  packId,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const handleOpenEditPack = () => {
    dispatch(isActiveModalAC(true))
    dispatch(modalEditPackIsOpenAC(true))
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
