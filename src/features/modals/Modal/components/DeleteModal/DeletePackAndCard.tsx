import React from 'react'

import { Button } from '@material-ui/core'

import { setAppIsLoadingAC } from '../../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { deleteCardTC } from '../../../../table/Cards/cards-reducer'
import { deletePackTC } from '../../../../table/Packs/packs-reducer'
import {
  modalDeleteCardIsOpenAC,
  modalDeletePackIsOpenAC,
  modalSetCardAnswerAC,
  modalSetCardIdAC,
  modalSetCardQuestionAC,
  modalSetPackIdAC,
  modalSetPackNameAC,
} from '../../actions'
import { MainModal } from '../../MainModal'
import s from '../../MainModal.module.css'
import * as modalsSelectors from '../../selectors'

type DeletePackAndCardType = {
  type: 'deletePack' | 'deleteCard'
  packName?: string
  cardQuestion?: string
  cardId?: string
  packId?: string
  itemId?: string
  cardQuestionImg?: string
}

export const DeletePackAndCard: React.FC<DeletePackAndCardType> = ({
  type,
  packName,
  cardQuestion,
  packId,
  cardId,
  cardQuestionImg,
}) => {
  const dispatch = useAppDispatch()
  const question = useAppSelector(modalsSelectors.selectCardQuestion)
  const cardIdSelector = useAppSelector(modalsSelectors.selectCardId)

  const handleDeletePackOrCard = () => {
    if (type === 'deletePack') {
      dispatch(deletePackTC(packId))
      dispatch(modalSetPackIdAC(''))
      dispatch(modalSetPackNameAC(''))
      dispatch(modalDeletePackIsOpenAC(false))
      dispatch(setAppIsLoadingAC(true))
    } else if (type === 'deleteCard') {
      dispatch(deleteCardTC(cardIdSelector as string))
      dispatch(modalSetCardQuestionAC(''))
      dispatch(modalSetCardIdAC(''))
      dispatch(modalSetCardAnswerAC(''))
      dispatch(modalDeleteCardIsOpenAC(false))
      dispatch(setAppIsLoadingAC(true))
    }
  }

  return (
    <MainModal
      title={type === 'deletePack' ? 'Delete pack' : 'Delete card'}
      type={type === 'deletePack' ? 'deletePack' : 'deleteCard'}
      cardQuestion={cardQuestion}
      packId={packId}
      cardId={cardId}
      packName={packName}
    >
      <div>
        <p>
          Do you really want to remove {/* eslint-disable-next-line no-nested-ternary */}
          {type === 'deletePack' ? (
            packName
          ) : cardQuestionImg !== '' ? (
            <img className={s.deleteCardImg} src={cardQuestionImg} alt={'question'} />
          ) : (
            question
          )}
          ?
        </p>
        <p>{type === 'deletePack' ? 'All cards will be deleted.' : 'Card will be deleted.'} </p>
        <Button
          color={'secondary'}
          fullWidth
          style={{
            marginTop: '20px',
            borderRadius: '20px',
          }}
          variant={'contained'}
          onClick={handleDeletePackOrCard}
        >
          Delete
        </Button>
      </div>
    </MainModal>
  )
}
