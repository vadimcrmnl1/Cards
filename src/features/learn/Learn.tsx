import React, { memo, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { useStyles } from '../styleMU/styleMU'
import { selectPackName } from '../table/Cards/selectors'
import { CardsType } from '../table/table-api'

import { setCardsPackIdForLearnAC } from './actions'
import { updateGradeTC } from './learn-reducer'
import s from './Learn.module.css'
import { selectCardsForLearn, selectCardsPackIdForLearn } from './selectors'

import { useAppDispatch, useAppSelector } from 'app/store'
import { LinkToBack } from 'common/components/LinkToBack/LinkToBack'
import { PATH } from 'common/utils/routes/Routes'

const grades = [
  "I didn't know",
  'I forgot',
  "I've been thinking for a long time",
  'I got mixed up',
  'I answered correctly',
]

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const Learn = memo(() => {
  const packName = useAppSelector(selectPackName)
  const id = useAppSelector(selectCardsPackIdForLearn)
  const styleMU = useStyles()
  const cards = useAppSelector(selectCardsForLearn)
  const [showNext, setShowNext] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)

  let newGrade = 0

  const [card, setCard] = useState<CardsType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    answerImg: '',
    question: '',
    questionImg: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch(setCardsPackIdForLearnAC(id))
      setFirst(false)
    }

    if (cards[0] !== undefined && !showNext) {
      if (cards[0].cardsPack_id === id && cards.length > 0) {
        setCard(getCard(cards))
      }
    }
  }, [dispatch, id, cards, first])

  const handleShowAnswer = () => {
    setIsChecked(true)
    setShowNext(false)
  }
  const handleCheckAnswer = (grade: number) => {
    newGrade = grade
  }
  const handleShowNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      dispatch(updateGradeTC({ card_id: card._id, grade: newGrade }))
      setShowNext(true)
    }
  }

  useEffect(() => {
    if (cards[0] !== undefined && showNext) {
      if (cards[0].cardsPack_id === id && cards.length > 0) {
        setCard(getCard(cards))
      }
    }
  }, [showNext])

  console.log('card.question=', card.question)

  return (
    <div className={s.wrapper}>
      <div className={s.link}>
        <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      </div>
      <div className={s.learnBlock}>
        <div className={s.learnTitle}>Learn {packName}</div>
        <div className={s.learnQuestionBlock}>
          <div>
            <b>QUESTION</b>: {card.question}
          </div>
          <div className={s.learnShots}>
            Number of attempts to answer the question: {card.shots}
          </div>
          <Button onClick={handleShowAnswer} variant={'contained'} className={styleMU.button}>
            Show answer
          </Button>
          {isChecked && (
            <>
              <div>
                <b>ANSWER</b>: {card.answer}
              </div>
              <div className={s.learnCheckboxBlock}>
                {grades.map((el, index) => {
                  return (
                    <label key={index}>
                      <input
                        type={'radio'}
                        name={'check'}
                        onClick={() => handleCheckAnswer(index + 1)}
                      />
                      {el}
                    </label>
                  )
                })}
              </div>
              <Button onClick={handleShowNext} variant={'contained'} className={styleMU.button}>
                {' '}
                Show next question
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
})
