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
import { PaginationComponent } from '../Packs/components/pagination/PaginationComponent'
import { selectCardPacks } from '../Packs/selectors'
import { AddCardRequestType } from '../table-api'

import {
  setCardsPageAC,
  setCardsPageCountAC,
  setCardsSearchByQuestionAC,
  setCardsSortAC,
} from './actions'
import { addCardTC, getCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsTable } from './CardsTable/CardsTable'
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

  const styleMU = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFirstLoading, setIsFirstLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getCardsTC())
    }
  }, [dispatch, page, pageCount, question, sortCards, isFirstLoading])

  useEffect(() => {
    if (isFirstLoading) {
      // dispatch(getPacksTC())
      // setSearchParams({...searchParams,sortPacks: sortPacks!})
      const params = Object.fromEntries(searchParams)

      /* dispatch(setCardsPageCountAC(+params.pageCount || 5))
            dispatch(setCardsPageAC(+params.page || 1))*/
      dispatch(setCardsSearchByQuestionAC(params.question || ''))
      dispatch(setCardsSortAC(params.sortCards || null))
      setIsFirstLoading(false)
    }
  }, [])

  //Change pagination
  /* const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        dispatch(setCardsPageAC(newPage + 1))
        setSearchParams({...Object.fromEntries(searchParams), page: (newPage + 1).toString()})
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCountAC(+event.target.value))
        dispatch(setCardsPageAC(1))
        setSearchParams({...searchParams, page: '1', pageCount: event.target.value})
    };*/
  const handleSearchQuestion = (value: string) => {
    dispatch(setCardsSearchByQuestionAC(value))
    setSearchParams({ ...searchParams, question: value })
  }

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
        <SearchQuestion handleSearchQuestion={handleSearchQuestion} />
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
      {/* <PaginationComponent totalCount={totalCount}
                                 pageNumber={pageNumber}
                                 pageCount={pageCount}
                                 handleChangePage={handlePageChange}
                                 handleChangeRowsPerPage={handlePageCountChange}/>*/}
      <ErrorSnackbar />
    </div>
  )
}
