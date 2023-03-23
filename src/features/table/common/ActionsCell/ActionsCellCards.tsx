import * as React from 'react'

import { useAppSelector } from '../../../../app/store'
import { AddEditCardModal } from '../../../../common/components/modals/Modal/components/AddEditCard/AddEditCardModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { selectUserId } from '../../../profile/selectors'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  type: 'packs' | 'cards'
  cardsPackId: string
  packOwnerId: string
  cardId: string
  cardAnswer: string
  cardQuestion: string
}
export const ActionsCellCards: React.FC<ActionsCellPropsType> = ({
  type,
  cardsPackId,
  packOwnerId,
  cardId,
  cardQuestion,
  cardAnswer,
}) => {
  const userId = useAppSelector(selectUserId)

  return (
    <div className={s.cell}>
      {type === 'cards' && packOwnerId === userId && (
        <div>
          <AddEditCardModal
            cardAnswer={cardAnswer}
            cardQuestion={cardQuestion}
            cardsPackId={cardsPackId}
            cardId={cardId}
            type={'editCard'}
            titleButton={'EditCard'}
            title={'Edit card'}
          />
          <DeletePackAndCard cardQuestion={cardQuestion} type={'deleteCard'} cardId={cardId} />
        </div>
      )}
    </div>
  )
}
