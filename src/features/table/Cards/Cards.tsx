import React, { useEffect, useState } from 'react'

import { IconButton } from '@material-ui/core'
import { SelectChangeEvent, SpeedDialAction } from '@mui/material'
import Button from '@mui/material/Button'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'

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
import { addCardTC, getCardsForLearnTC, getCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsTable } from './CardsTable/CardsTable'
import { PaginationCards } from './components/pagination/PaginationCards'
import { SearchQuestion } from './components/SearchQuestion'
import { SpeedDialBasic } from './components/speedDial/SpeedDialBasic'
import {
  selectCards,
  selectCardsPackId,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsQuestion,
  selectCardsSort,
  selectCardsTotalCount,
  selectPackName,
} from './selectors'

export const Cards = () => {
  const totalCount = useAppSelector(selectCardsTotalCount)
  const pageNumber = useAppSelector(selectCardsPage)
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
  const cards = useAppSelector(selectCards)
  const styleMU = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)
  const { cardPackId } = useParams() as { cardPackId: string }

  /*useEffect(() => {
    dispatch(getCardsForLearnTC(pack_id, 100))
  }, [])*/
  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getCardsTC())
      /* dispatch(getCardsForLearnTC(pack_id, 100))*/
    }
  }, [dispatch, page, pageCount, pack_id, question, sortCards, isFirstLoading, packName])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setCardsPackIdAC(params.cardsPack_id))
      /*dispatch(setCardsPageCountAC(pageCount))*/
      dispatch(setCardsPageCountAC(100))
      dispatch(setCardsPageAC(+params.page || 1))
      dispatch(setCardsSearchByQuestionAC(params.question || ''))
      dispatch(setCardsSortAC(params.sortCards || null))
      setIsFirstLoading(false)
    }
  }, [])



  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      <div className={s.packName}>
        <h2>{packName}</h2>
      </div>

      <div className={s.cardsSearchBlock}>
        <div className={s.cardsSearchTitle}>Search for questions</div>
        <SearchQuestion />
      </div>

      <div className={s.cardsHeader}>
        <h3>Cards list</h3>
        <AddEditCardModal type={'createCard'} title={'Add new card'} titleButton={'Add'} />
      </div>

      <CardsTable />
      {/*<PaginationCards />*/}
      <ErrorSnackbar />
    </div>
  )
}
