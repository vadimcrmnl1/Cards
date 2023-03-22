import React, { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import { LinkToBack } from '../../../common/components/LinkToBack/LinkToBack'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'
import { useStyles } from '../../styleMU/styleMU'
import { PaginationComponent } from '../Packs/components/pagination/PaginationComponent'
import { selectCardPacks } from '../Packs/selectors'

import s from './../Packs/Packs.module.css'
import {
  setCardsPackIdAC,
  setCardsPageAC,
  setCardsPageCountAC,
  setCardsSearchByQuestionAC,
  setCardsSortAC,
} from './actions'
import { getCardsTC } from './cards-reducer'
import { CardsTable } from './CardsTable/CardsTable'
import { SearchQuestion } from './components/SearchQuestion'
import {
  selectCardsPage,
  selectCardsPageCount,
  selectCardsQuestion,
  selectCardsSort,
  selectCardsTotalCount,
  selectPackName,
} from './selectors'

import { AddEditCardModal } from 'common/components/modals/Modal/components/AddEditCard/AddEditCardModal'

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

  const styleMU = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)
  const { cardPackId } = useParams() as { cardPackId: string }

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getCardsTC())
    }
  }, [dispatch, page, pageCount, question, sortCards, isFirstLoading])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setCardsPackIdAC(cardPackId))
      dispatch(setCardsPageCountAC(+params.pageCount || 5))
      dispatch(setCardsPageAC(+params.page || 1))
      dispatch(setCardsSearchByQuestionAC(params.question || ''))
      dispatch(setCardsSortAC(params.sortCards || null))
      setIsFirstLoading(false)
    }
  }, [])

  //Change pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(setCardsPageAC(newPage + 1))
    setSearchParams({ ...params, page: (newPage + 1).toString() })
  }
  const handlePageCountChange = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
    dispatch(setCardsPageAC(1))
    setSearchParams({ ...params, page: '1', pageCount: event.target.value })
  }
  const handleSearchQuestion = (value: string) => {
    if (value !== '') {
      setSearchParams({ ...params, question: value })
    } else if (value === '') {
      searchParams.delete('question')
      setSearchParams({ ...Object.fromEntries(searchParams) })
    }
    dispatch(setCardsSearchByQuestionAC(value))
  }

  // const handleAddCard = () => {
  //   const data: AddCardRequestType = {
  //     card: {
  //       cardsPack_id: cardsPack_id[0]._id,
  //       question: 'How I meet your mother?',
  //       answer: 'No way',
  //     },
  //   }
  //
  //   dispatch(addCardTC(data))
  // }

  return (
    <div className={s.container}>
      <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      <h2>{packName}</h2>
      <SearchQuestion handleSearchQuestion={handleSearchQuestion} />

      <div className={s.packsHeader}>
        <h3>Cards list</h3>
        <AddEditCardModal type={'createCard'} title={'Add new card'} titleButton={'Add'} />
      </div>

      <CardsTable />
      <PaginationComponent
        totalCount={totalCount}
        pageNumber={pageNumber}
        pageCount={pageCount}
        handleChangePage={handlePageChange}
        handleChangeRowsPerPage={handlePageCountChange}
      />
      <ErrorSnackbar />
    </div>
  )
}
