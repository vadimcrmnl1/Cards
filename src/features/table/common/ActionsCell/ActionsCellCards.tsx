import * as React from 'react'

import { useAppSelector } from '../../../../app/store'
import { AddEditCardModal } from '../../../modals/Modal/components/AddEditCard/AddEditCardModal'
import { DeletePackAndCard } from '../../../modals/Modal/components/DeleteModal/DeletePackAndCard'
import { selectUserId } from '../../../profile/selectors'
import { SpeedDialBasic } from '../../Cards/components/speedDial/SpeedDialBasic'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  type: 'packs' | 'cards'
  cardsPackId: string
  packOwnerId: string
  cardId: string
  cardAnswer: string
  cardQuestion: string
  cardAnswerImg: string
  cardQuestionImg: string
}
export const ActionsCellCards: React.FC<ActionsCellPropsType> = ({
  type,
  cardsPackId,
  packOwnerId,
  cardId,
  cardQuestion,
  cardAnswer,
  cardAnswerImg,
  cardQuestionImg,
}) => {
  const userId = useAppSelector(selectUserId)

  return (
    <div className={s.cell}>
      {type === 'cards' && packOwnerId === userId && (
        <div>
          <AddEditCardModal
            cardAnswer={cardAnswer}
            cardAnswerImg={cardAnswerImg}
            cardQuestionImg={cardQuestionImg}
            cardQuestion={cardQuestion}
            cardsPackId={cardsPackId}
            cardId={cardId}
            type={'editCard'}
            titleButton={'EditCard'}
            title={'Edit card'}
          />
          <DeletePackAndCard
            cardQuestion={cardQuestion}
            type={'deleteCard'}
            cardId={cardId}
            cardQuestionImg={cardQuestionImg}
          />
        </div>
      )}
    </div>
  )
}
