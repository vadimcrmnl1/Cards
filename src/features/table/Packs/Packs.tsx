import * as React from 'react'
import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { Navigate, useSearchParams } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { EmptySearch } from '../../../common/components/EmptySearch/EmptySearch'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'
import { useStyles } from '../../styleMU/styleMU'
import { AddPackRequestDataType } from '../table-api'

import {
  setMyPacksAC,
  setMinMaxCardsAC,
  setPackNameAC,
  setPacksPageAC,
  setPacksPageCountAC,
  setPacksSortAC,
} from './actions'
import { FilterCountCards } from './components/filterCountCards/FilterCountCards'
import { NoFilters } from './components/noFilters/NoFilters'
import { PaginationComponent } from './components/pagination/PaginationComponent'
import { SearchTitleCards } from './components/searchTitleCards/SearchTitleCards'
import { SortingByUser } from './components/sortingByUser/SortingByUser'
import { addPackTC, getPacksTC } from './packs-reducer'
import s from './Packs.module.css'
import { PacksTable } from './PacksTable/PacksTable'
import {
  selectCardPacks,
  selectPacksUserId,
  selectPacksMaxCards,
  selectPacksMinCards,
  selectPacksName,
  selectPacksPage,
  selectPacksPageCount,
  selectPacksSort,
} from './selectors'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const pageCount = useAppSelector(selectPacksPageCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const sortPacks = useAppSelector(selectPacksSort)
  const page = useAppSelector(selectPacksPage)
  const packName = useAppSelector(selectPacksName)
  const packsUser_id = useAppSelector(selectPacksUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const cardPacks = useAppSelector(selectCardPacks)
  const styleMU = useStyles()
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getPacksTC())
    }
  }, [
    isFirstLoading,
    dispatch,
    page,
    pageCount,
    packName,
    sortPacks,
    packsUser_id,
    minCards,
    maxCards,
  ])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setPacksPageCountAC(+params.pageCount || 5))
      dispatch(setPacksPageAC(+params.page || 1))
      dispatch(setMinMaxCardsAC(+params.min || 0, +params.max || 0))
      dispatch(setPackNameAC(params.packName || ''))
      dispatch(setMyPacksAC(params.user_id || null))
      dispatch(setPacksSortAC(params.sortPacks || null))
      setIsFirstLoading(false)
    }
  }, [])

  const handleAddPack = () => {
    const cardPack: AddPackRequestDataType = {
      cardsPack: {
        name: 'Pack Name',
        deckCover: '',
        private: false,
      },
    }

    dispatch(addPackTC(cardPack))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <div className={s.packsHeader}>
        <h3>Packs list</h3>
        <Button
          className={styleMU.button}
          onClick={handleAddPack}
          variant={'contained'}
          disabled={isAppMakeRequest}
        >
          Add new pack
        </Button>
      </div>
      <div className={s.packsBlock}>
        <SearchTitleCards />
        <SortingByUser />
        <FilterCountCards />
        <NoFilters />
      </div>
      {cardPacks.length !== 0 ? (
        <div>
          <PacksTable />
          <PaginationComponent />
        </div>
      ) : (
        <EmptySearch />
      )}

      <ErrorSnackbar />
    </div>
  )
}
