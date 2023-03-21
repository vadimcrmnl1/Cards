import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { useStyles } from '../styleMU/styleMU'
import { getCardsTC, updateGradeTC } from '../table/Cards/cards-reducer'
import { selectCards, selectCardsPackId, selectPackName } from '../table/Cards/selectors'
import { CardsType } from '../table/table-api'

import s from './Learn.module.css'

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

export const Learn = () => {
  const packName = useAppSelector(selectPackName)
  const id = useAppSelector(selectCardsPackId)
  const cards = useAppSelector(selectCards)
  const styleMU = useStyles()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)

  const [card, setCard] = useState<CardsType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC())
      setFirst(false)
    }
    if (cards.length > 0) setCard(getCard(cards))

    /* return () => {
      console.log("LearnContainer useEffect off");
    };*/
  }, [dispatch, id, cards, first])

  const handleShowAnswer = () => {
    setIsChecked(true)
  }
  const handleCheckAnswer = (grade: number) => {
    dispatch(updateGradeTC({ card_id: card._id, grade: grade }))
  }
  const handleShowNext = () => {
    setIsChecked(false)
    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }

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
                      <input type={'checkbox'} onClick={() => handleCheckAnswer(index + 1)} />
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
}
