import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { Navigate, useSearchParams } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import { LinkToBack } from '../../../common/components/LinkToBack/LinkToBack'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'
import { useStyles } from '../../styleMU/styleMU'
import { selectCardPacks } from '../Packs/selectors'
import { AddCardRequestType } from '../table-api'

import {
  setCardsPackIdAC,
  setCardsPageAC,
  setCardsPageCountAC,
  setCardsSearchByQuestionAC,
  setCardsSortAC,
} from './actions'
import { addCardTC, getCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsTable } from './CardsTable/CardsTable'
import { PaginationCards } from './components/pagination/PaginationCards'
import { SearchQuestion } from './components/SearchQuestion'
import {
  selectCardsPackId,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsQuestion,
  selectCardsSort,
  selectCardsTotalCount,
  selectPackName,
} from './selectors'

export const Cards = () => {
  const pageCount = useAppSelector(selectCardsPageCount)
  const cardsPack = useAppSelector(selectCardPacks)
  const packName = useAppSelector(selectPackName)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const page = useAppSelector(selectCardsPage)
  const question = useAppSelector(selectCardsQuestion)
  const sortCards = useAppSelector(selectCardsSort)
  const pack_id = useAppSelector(selectCardsPackId)

  const styleMU = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getCardsTC())
    }
  }, [dispatch, page, pageCount, question, sortCards, isFirstLoading, pack_id])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setCardsPackIdAC(params.cardsPack_id))
      dispatch(setCardsPageCountAC(+params.pageCount || 5))
      dispatch(setCardsPageAC(+params.page || 1))
      dispatch(setCardsSearchByQuestionAC(params.question || ''))
      dispatch(setCardsSortAC(params.sortCards || null))
      setIsFirstLoading(false)
    }
  }, [])

  const handleAddCard = () => {
    const data: AddCardRequestType = {
      card: {
        cardsPack_id: cardsPack[0]._id,
        question: 'How I meet your mother?',
        answer: 'No way',
      },
    }

    dispatch(addCardTC(data))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      <h2>{packName}</h2>
      <div className={s.cardsSearchBlock}>
        <div className={s.cardsSearchTitle}>Search for questions</div>
        <SearchQuestion />
      </div>

      <div className={s.cardsHeader}>
        <h3>Cards list</h3>
        <Button
          className={styleMU.button}
          onClick={handleAddCard}
          variant={'contained'}
          disabled={isAppMakeRequest}
        >
          Add new card
        </Button>
      </div>

      <CardsTable />
      <PaginationCards />
      <ErrorSnackbar />
    </div>
  )
}
